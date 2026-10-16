# Research Prompt 1: Edging-Specific Games Deep-Dive

> **Task**: Research edging/orgasm-control/timing adult games for couples specifically.
> **Deliverable**: `docs/research/edging-games-research.md`

## Objective
Map the competitive landscape of **edging-specific** games and tools. Unlike broad couple apps (Spicer, Desire), these products are built **around** edging, orgasm denial, ruined orgasms, and JOI (jerk-off instruction).

## Instructions

1. Use webfetch on these URLs:
   - https://www.google.com/search?q=edging+game+couples+app
   - https://www.google.com/search?q=orgasm+control+timer+app+couples
   - https://www.google.com/search?q=edging+metronome+app
   - https://www.google.com/search?q=JOI+edging+game+web
   - https://www.google.com/search?q=edge+me+app+orgasm+denial
   - https://www.google.com/search?q=femdom+edging+app+timer
   - https://www.google.com/search?q=itch.io+edging+game
   - https://www.google.com/search?q=edging+countdown+app

2. Then deep-dive on these specific products:
   - **edgeritual.app** — Full session state machine trace. Document the 3-phase timer (stroke/edge/rest), presets (Warm-up/Steady/Denial/Marathon/Ruin), BPM pacer, voice coach, visual modes, edge counter, denials mode with edge targets (5/10/20/∞), ruined orgasm timer, gooning timer, stamina trainer, 7/14/30-day challenges.
   - **canicum.com** — Orgasm denial timer with % cum chance, duration weighting.
   - **Faptronome** — BPM metronome + JOI programs (structured phase sequences, program library, custom creator).
   - **Heat Control** (itch.io) — Furry-themed edging trainer, E621 integration, local media support.
   - **Valery's Edging Tasks** (itch.io) — Daily edging task generator, femdom framing.
   - **JOI Station / DomJOI / Edge Fap Roulette** (itch.io) — Channel-based JOI, roulette edge/ruin outcomes.
   - **EverEdge** (itch.io) — JOI software using your own porn, tagging system.
   - **You're Gonna…** — Physical card game with EDGE/TREMBLE/LET GO archetypes, secret timer, consequences.

3. For each product, document:
   - Platform (iOS/Android/Web/PWA/Physical)
   - Core mechanics (3-phase timers, BPM pacer, denial mode, ruin mode, edge counter)
   - **Physiological model assumed**: Linear progression (Men) vs Non-linear (Basson model, variable)
   - Presets/modes available
   - Pricing model
   - Positioning (solo vs couple, kink-friendly vs mainstream)
   - What works well and what's missing (especially for **couples** and **non-linear arousal**)
   - Any PWA/app-store strategy

4. **Gap analysis**: What edging-specific couple games DON'T exist? Where's the white space?
   - Specifically: Which products assume linear arousal (male pattern)? Which support non-linear fluctuation?
   - Which products allow switching roles? Which allow non-binary anatomy?
   - Which products have adaptive post-orgasm behavior?

## Critical Research Finding
Peer-reviewed research shows:
- **66.9% of participants** report BOTH linear AND non-linear arousal patterns
- **No universal PONR exists** for women — timer can't use elapsed time as readiness proxy
- **Post-orgasmic recovery varies massively** — some continue, some need recovery, some feel aversion
- **Clitoral anatomy is 3x larger internally** than externally visible — stimulation is complex

This means: **Build a timer that responds to user-reported experience, not scheduled progression**.

## Output Format
A structured markdown report with:
- Product name, platform, core mechanics, pricing table
- Detailed mechanics catalog (timer types, pacer types, denial/ruin implementations)
- Couple-readiness assessment (pass-and-play, sync, shared sessions)
- Gap analysis: what's missing for couples specifically
- 10 concrete feature ideas for the CoupleEdger MVP (steal or improve)