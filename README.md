# Broker Tycoon 🏢👁️💰

**I made you the villain, and you were good at it.**

An idle game where you run a data brokerage. You buy data feeds, merge records into people, sell the people, weather the occasional fine (cheaper than compliance), rebrand after scandals, and win by knowing where 300 million people sleep. It takes 10–15 minutes and then it ends, on purpose.

**[Play it here](https://MetaMaaz.github.io/broker-tycoon/)** · single `index.html`, vanilla JS, no build step, no backend.

## The design is a perspective flip

Nobody lectures you. The game just makes the gross choice the optimal choice — sensitive segments pay multiples, the settlement is 2% of lifetime revenue, the rebrand keeps all your multipliers — and lets you follow the incentives. You click "acquire loyalty-card feed" because the number goes up, and fifteen minutes later you're pricing a "payday-loan eligible" segment and the game quietly asks if you remember when this felt gross.

The HUD carries the thesis without a speech: `lifetime fines ÷ lifetime revenue` stays under a few percent all game. That ratio is the argument. This is the demand side of my Privacy Receipt project — that one shows the data leaving; this one shows where it goes and why it's worth someone's money.

## Every mechanic has a REAL: tag

Tap any feed, upgrade, segment, or event for a card citing the documented practice it's modeled on. The five most damning:

1. **The FTC sued a broker over location data traceable to reproductive-health clinics — and after four years, settled with no monetary penalty.** FTC v. Kochava, filed 2022, settled May 2026 with injunctive relief only. The in-game settlement (2% of revenue) is *harsher* than reality. ([ftc.gov](https://www.ftc.gov/legal-library/browse/cases-proceedings/ftc-v-kochava-inc))
2. **"Expectant Parent," "Diabetes Interest," and "Suffering Seniors" are real, publicly listed segments.** Documented in the FTC's 2014 data-broker report and the 2013 Senate Commerce investigation, which also found lists of rape victims and "Rural and Barely Making It." ([FTC report](https://www.ftc.gov/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014))
3. **A 2023 Duke University study bought Americans' mental-health data — depression, anxiety, PTSD lists — from brokers for as little as $0.06 a record.** ([Duke Sanford](https://techpolicy.sanford.duke.edu/data-brokers-and-the-sale-of-americans-mental-health-data/))
4. **A priest was outed in 2021 using commercially purchased location data from a dating app.** Nobody hacked anything; the data was for sale. ([background](https://en.wikipedia.org/wiki/Jeffrey_Burrill))
5. **The rebrand mechanic is documented behavior.** X-Mode, banned by the FTC from selling sensitive location data in 2024, was by then operating as "Outlogic." The breached mega-broker "National Public Data" was a trade name. ([ftc.gov](https://www.ftc.gov/news-events/news/press-releases/2024/01/ftc-order-prohibits-data-broker-x-mode-social-outlogic-selling-sensitive-location-data))

Tone rule, enforced: no conspiracy framing anywhere. The industry's own marketing pages, FTC orders, Senate reports, and mainstream investigations carry the whole argument. If a claim couldn't be cited, it didn't ship.

## The finale is the point

Win the game and it proudly displays your crown jewel: one fully-resolved profile — assembled entirely from *your* session. Your timezone, the hour you played, the feeds you bought, how many times you toggled the payday-loan segment, every name your company hid behind. Then it tells you the truth: this took you 14 minutes and a browser tab; the real ones have thousands of data points per person and had years, and you are in one.

And it proves the point: **this page collects nothing.** No analytics, no cookies, no localStorage, no network calls. The dossier is built from in-memory choices plus `Date()`. Refresh and it's gone. View source.

## No retention mechanics — that's the design statement

No saves, no daily rewards, no offline earnings, no streaks. A deliberately finite game about the attention-and-data economy would rather you go outside. The real ones would not.

## Simplifications, admitted

Real brokers are B2B plumbing, not a tycoon dashboard — nobody at LiveRamp has a "buy flashlight app" button. The scrutiny meter is gamified shorthand for a legal system that moves in years, not seconds. The numbers are illustrative; the sources are not. Balance targets live in a comment block at the top of the script — argue with my weights, that's what they're there for. `US mode` is the documented baseline; `EU mode` makes two feeds unbuyable under GDPR and multiplies fines, which is roughly the real difference in kind.

## The exits are real. Use them.

The data-broker economy exists because it's profitable and legal, and the fines are a rounding error. The exits that do exist only work if people use them:

- **California DROP** — the Delete Act's one-stop deletion platform went live January 1, 2026. One request covers 600+ registered brokers; mandatory processing begins August 1, 2026, at $200/request/day in penalties. → [privacy.ca.gov/drop](https://privacy.ca.gov/drop/)
- **Global Privacy Control** — a browser signal that legally counts as an opt-out of sale/sharing in several states. Set it once. → [globalprivacycontrol.org](https://globalprivacycontrol.org)
- **People-search opt-outs** — Google's [Results about you](https://myactivity.google.com/results-about-you) and the direct-link list at [simpleoptout.com](https://simpleoptout.com)
- **State deletion rights** — 19+ US state privacy laws now include them; in the EU/UK, GDPR Art. 17 applies to every broker holding your data. → [state law tracker](https://iapp.org/resources/article/us-state-privacy-legislation-tracker/)

*Facts last verified: 2026-07-03.*

## License

MIT — see [LICENSE](LICENSE).

