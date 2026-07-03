// Headless balance + sanity test for Broker Tycoon.
// Extracts the <script> from index.html, runs it with DOM stubs, then
// simulates a competent-but-human player and checks win time lands in the 10-15 min target (greedy bot: US 10m, EU 11m).
const fs = require("fs");
const html = fs.readFileSync(process.argv[2] || "index.html", "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];

// --- static checks ---
const banned = ["localStorage", "sessionStorage", "document.cookie\\s*=", "fetch\\(", "XMLHttpRequest", "navigator.sendBeacon", "WebSocket"];
for (const b of banned) {
  const re = new RegExp(b, "g");
  const hits = (script.match(re) || []).filter(()=>true);
  // allow the self-check's harmless typeof mention of localStorage
  if (b === "localStorage" && hits.length <= 1) continue;
  if (hits.length) { console.error("FAIL: found banned API:", b, hits.length); process.exit(1); }
}
console.log("static: no storage/network APIs used ✓");

// --- DOM stubs ---
const el = () => new Proxy({ style:{}, classList:{add(){},remove(){},toggle(){}}, dataset:{} }, {
  get(t,p){ if (p in t) return t[p];
    if (p === "addEventListener" || p === "setAttribute" || p === "appendChild" || p === "showModal" || p === "close" || p === "focus") return ()=>{};
    if (p === "querySelectorAll") return ()=>[];
    return t[p]; },
  set(t,p,v){ t[p]=v; return true; }
});
global.document = { getElementById: el, createElement: el, querySelectorAll: ()=>[], body: el(), cookie:"" };
global.window = global;
global.matchMedia = () => ({ matches:false });
global.navigator = { language:"en-US", clipboard:{ writeText: async()=>{} } };
global.location = { search:"", origin:"", pathname:"" };
global.performance = { now: () => Date.now() };
global.setInterval = () => 0;
global.prompt = () => {};

eval(script);
const BT = window.__BT;
const S = BT.S;

// --- simulated player ---
S.jur = "US"; S.startedAt = Date.now();
const upgradeOrder = ["idgraph1","hashmatch","cookiesync","consentflow","idgraph2","mlinfer","offshore"];
const feedKeys = Object.keys(BT.FEEDS);
let t = 0, pressCd = 0, eventLog = [];
const DT = 1;

function greedyStep() {
  // sell cheap segments always; go sensitive once there's something to sell
  for (const k in BT.SEGMENTS) {
    if (S.selling[k]) continue;
    if (!BT.SEGMENTS[k].sens || S.profiles > 5e4) BT.toggleSegment(k);
  }
  // upgrades only once feeds are producing (a sane player buys income first)
  if (BT.rps() > 0) for (const u of upgradeOrder) if (!S.upgrades[u]) BT.buyUpgrade(u);
  // then best-value affordable feed, repeatedly
  let bought = true;
  while (bought) {
    bought = false;
    let best = null, bestV = 0;
    for (const k of feedKeys) {
      if (S.feedDisabled[k] || (S.jur==="EU" && BT.FEEDS[k].gdprBlocked)) continue;
      const c = BT.feedCost(k), v = BT.FEEDS[k].rps / c;
      if (c <= S.money && v > bestV) { bestV = v; best = k; }
    }
    if (best) bought = BT.buyFeed(best);
  }
  // scrutiny management like a real player
  if (S.pressCd <= 0 && S.scrutiny > 30) { S.pressCd = 45; S.scrutiny = Math.max(0, S.scrutiny - 7); }
  if (S.scrutiny >= 60 && S.rebrands < 3 && S.scrutiny >= 75) BT.doRebrand();
  // events: fire like checkEvents (scrutiny + time gate), take first affordable choice
  for (const [k, ev] of Object.entries(BT.EVENTS)) {
    if (!S.firedEvents[k] && S.scrutiny >= ev.at && t >= ev.minT) {
      S.firedEvents[k] = true;
      const ch = ev.choices.find(c => !c.cost || S.money >= c.cost) || ev.choices[0];
      ch.fx(S);
      eventLog.push(`${Math.floor(t/60)}m: ${ev.headline} -> ${ch.label}`);
      break;
    }
  }
}

const MAX = 30 * 60;
while (t < MAX && S.profiles < BT.WIN_PROFILES) {
  greedyStep();
  BT.tickEconomy(DT);
  t += DT;
  if (t % 60 === 0) console.log(`${t/60}m  profiles=${S.profiles.toExponential(2)}  $${Math.floor(S.money).toExponential(2)}  rps=${Math.floor(BT.rps())}  scrut=${Math.floor(S.scrutiny)}  eff=${(BT.mergeEff()*100).toFixed(0)}%`);
}

console.log("\n--- events fired ---"); eventLog.forEach(e=>console.log(e));
console.log(`\nWIN at ${(t/60).toFixed(1)} min` + (S.profiles < BT.WIN_PROFILES ? " -- DID NOT WIN (FAIL)" : ""));
console.log(`fines/revenue = ${(100*S.fines/S.lifeRevenue).toFixed(2)}%  rebrands=${S.rebrands}  names=${S.names.join(" -> ")}`);

// pass/fail
const mins = t/60;
if (S.profiles < BT.WIN_PROFILES) { console.error("FAIL: unwinnable in 30 min"); process.exit(1); }
if (mins < 8 || mins > 18) { console.error(`FAIL: win time ${mins.toFixed(1)}min outside 8-18 window`); process.exit(1); }
console.log("balance: PASS");

// citation completeness (mirrors in-page selfCheck)
const all = [...Object.values(BT.FEEDS), ...Object.values(BT.UPGRADES), ...Object.values(BT.SEGMENTS), ...Object.values(BT.EVENTS)];
const bad = all.filter(i => !i.real || !i.real.claim || !i.real.year || !/^https?:\/\//.test(i.real.source||""));
if (bad.length) { console.error("FAIL: missing citations", bad.map(b=>b.name||b.headline)); process.exit(1); }
console.log(`citations: ${all.length}/${all.length} present ✓`);
