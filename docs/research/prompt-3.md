# Research Prompt 3: Edging Mechanics & UX Deep-Dive

> **Task**: Research what makes a GOOD edging/teasing game mechanic and UX.  
> **Deliverable**: `docs/research/edging-mechanics-ux.md`

## Objective
Translate kink practice and sexual psychology into **actionable game mechanics** for a React/Vite edging MVP. Focus on the user experience, not just the market landscape.

## Instructions

1. Use webfetch on these URLs:
   - https://www.google.com/search?q=how+to+practice+edging+guide
   - https://www.google.com/search?q=edging+metronome+technique+bpm
   - https://www.google.com/search?q=edging+game+mechanics+design
   - https://www.google.com/search?q=Lovense+remote+edging+patterns
   - https://www.google.com/search?q=couples+long+distance+teasing+app
   - https://www.google.com/search?q=kink+edging+structure+plateau+peak

2. Research the **physiological foundation**:
   - Plateau phase, point of no return (PONR), resolution phase
   - BPM ranges and stroke patterns for extending plateau (60-80 BPM optimal)
   - Breathwork techniques for arousal control (4-7 breathing, diaphragmatic)
   - How denial vs ruin vs release differ psychologically
   - **CRITICAL**: Female non-linear arousal vs male linear models (Basson model)
   - Risk factors: limb numbness, TEO (Temporary Extinction of Orgasm), overstimulation
   - Refractory period variation across genders and multiple orgasm capacity

3. Research the **game UX patterns**:
   - Three-phase timer (stroke/edge/rest) — why it works, optimal ratios per mode
   - BPM pacer (metronome) mechanics — tap-tempo, auto-sync to content, preset ranges
   - Visual feedback: pulse ring, radial flash, breathing orb — when each is best
   - Voice coach patterns — cadence, phrasing, phase-specific cues, language options
   - Haptic feedback — tick pulses, phase change jolts, pattern significance
   - Edge counter / streak system — psychological reward, progression
   - Denial mode — edge targets, frustration as reward, "golden ticket" mechanics
   - Ruined orgasm — precision timing, build-up to PONR, clean stop cues
   - Aftercare — debrief prompts, cuddle timer, session rating, integration phase

4. Research **two-player/couple patterns**:
   - Pass-and-play (same device) vs synced session (two devices)
   - Role-based UI (giver sees secret timer, receiver sees countdown only)
   - Asymmetric information (secret duration, hidden edge count)
   - Long-distance patterns (WebRTC, WebSocket, toy sync)

5. Research **solo tools to improve upon**:
   - edgeritual.app full feature set (trace everything)
   - Faptronome program structure
   - Heat Control media integration
   - Lovense Remote toy sync patterns

6. Extract **concrete, implementable ideas**:
   - Timer state machine (phase transitions, drift correction)
   - Session flow (negotiation → warmup → cycles → resolution → aftercare)
   - Content deck mechanics (card types, intensity scaling, secret timer)
   - Difficulty settings (BPM ranges, phase ratios, cycle counts)
   - Two-player modes (pass-and-play, synced, remote)
   - Safety features (emergency stop, safeword, max session timer)

## Output Format
A structured report with:
1. Physiology primer (arousal curve, PONR, breathwork, **Basson non-linear vs linear models**)
2. Core mechanics catalog (timer phases, BPM, voice, haptics, visuals)
3. **Non-linear timer design**: "Ride the Wave" mode (flexible) vs "Lock and Load" mode (structured) vs "Adaptive Recovery" mode
4. Session flow state machine (negotiation → warmup → cycles → resolution → aftercare)
5. Content system (card types, intensity scaling, deck architecture)
6. Two-player architecture (sync patterns, role UI, asymmetric info)
7. Safety & consent system (safeword, emergency stop, max timer, aftercare)
8. 15 concrete, prioritized mechanic ideas for MVP (with implementation notes)

## Key Research Finding to Build On
A peer-reviewed study shows **66.9% of participants** report experiences consistent with BOTH linear and non-linear arousal models. This means:
- **Timer must support both "Ride the Wave" (non-linear)** and **"Lock and Load" (structured)** modes
- **No universal PONR for women** — timer should use user feedback over elapsed time
- **Multiple orgasm capacity varies** — post-orgasm behavior must be user-controlled, not automatic