---
tags: [research, physiology, female-arousal, game-design, mvp-implications]
---

# Female Arousal Research Findings & Game Design Implications

> **Source**: Peer-reviewed literature — Basson model, clitoral anatomy studies, post-orgasm refractory research (2026)
> **Key Stat**: **66.9% of participants** report experiences consistent with BOTH linear AND non-linear arousal models
> **Source**: Hayes (2011), Basson (2000/2002), Pauls (2015), Bhat et al. (2026)

---

## 📚 Research Summary

### The 5 Key Physiological Differences (vs Linear Male Model)

| Difference | Clinical Finding | Game Design Implication |
|-----------|------------------|------------------------|
| **Non-linear arousal** | 66.9% experience BOTH linear + circular patterns. Not universal either way | Timer must support **Ride the Wave** (flexible) AND **Lock and Load** (structured) modes |
| **Desire ≠ Arousal** | Subjective desire and physical arousal can occur in any order, or independently | **User feedback overrides timer** — "not ready" extends current phase |
| **Complex anatomy** | Clitoris is 3x larger internally than externally visible. Stimulation responds to varied touch | **Zone-based card design** — not just "clit" but "hood", "inner thighs", "perineum" |
| **No universal PONR** | No objectively measurable female orgasm threshold. Individual and variable | **No timer can predict readiness from elapsed time** → user feedback required |
| **Variable refractory** | Multiple orgasms possible but not universal. Post-orgasm recovery varies wildly | **Post-orgasm: user chooses continue/recover/quit** — automated behavior fails |

---

## 🎮 Game Design Requirements (from Physiology)

### Requirement 1: **Non-Linear Progression**
```
Current (male pattern):  Stroke(60s) → Edge(30s) → Rest(45s) → [repeat] → Orgasm
Proposed (inclusive):    Any phase ←→ Any other phase ←→ User-controlled extension
```

**Implementation**:
- "Ride the Wave" mode: user can **return to earlier phase**, **skip forward**, **pause indefinitely**
- "Lock and Load" mode: structured phases but user can **override at any time**

### Requirement 2: **Subjective Feedback Override**
When user reports status:

| Feedback | Timer Response |
|----------|---------------|
| Not sufficiently aroused | Continue current phase, extend time |
| Comfortable and interested | Continue or gradually increase intensity |
| Approaching peak interest | Maintain or reduce intensity |
| Too intense/uncomfortable | Reduce intensity OR pause |
| Wants to stop | End session |

**Implementation**: Simple 5-button UI overlay during session: `⏥ Continue | ⏸ Pause | 🔽 Reduce | ⏫ Increase | 🛑 Stop`

### Requirement 3: **Multiple Stimulation Modes**

| Mode | Design Objective | UI Pattern |
|------|------------------|------------|
| **Focused** | Consistent, user-selected pattern | BPM pacer + single zone targeting |
| **Variable** | Intensity/pacing changes | Random card draws per phase |
| **Relaxed** | No time pressure, pauses allowed | Breathing orb, long phases, no edge target |
| **Whole-body** | Transitions between stimulation types | Card deck with body-zone tags |
| **Personalized** | Reuse user-saved settings | Favorites from previous sessions |

### Requirement 4: **Flexible Post-Orgasm Behavior**
```
Orgasm achieved →
    [Continue session]
    [Recovery period (configurable 1-10 min)]
    [Return to lower-intensity mode]
    [Finish session + aftercare]
```

**Implementation**: Post-orgasm screen with 4 large buttons. No auto-continuation.

### Requirement 5: **Configurable Routines + Personalization**
- Save favorite BPM, visual mode, voice coach settings per user
- Save card favorites + custom decks
- Session history with tags ("multi-peak", "denial", "ruin")

---

## 📊 Card Design Implications

### Anatomy-Independent Card Tags
Instead of gendered card text, use zone-based tags:

```typescript
const STIMULATION_ZONES = [
  // Universal
  "perineum", "neck", "scalp", "ears", "inner-thighs",
  "breath", "eye-contact", "voice", "touch-variations",
  // Anatomy-dependent (but inclusive phrasing)
  "genital-external",  // clitoris/glans/cock-head
  "genital-internal",  // vaginal walls/prostate/through-clothing
  "breast-tissue",      // nipples/chest/caress
  "anal-area",          // perineum + entry
  "full-body",          // everything together
];
```

### Example Inclusive Card (instead of gendered)
```diff
- "Stroke his cock until he's edging..."
+ "Touch through their clothes — slow circles on the outer curve.
   Let them feel the heat build without knowing when you'll stop."
```

### Intensity Progression System
Based on **sensate focus** research (not just "harder"):

| Intensity | Focus | Example |
|-----------|-------|---------|
| 1 | Non-genital awareness | Breath sync, eye contact, light touch on arms |
| 2 | Clothing-on exploration | Hands under clothes, teasing through fabric |
| 3 | Direct but gentle | Bare skin, consistent rhythm, building tension |
| 4 | Near-edge teasing | On the brink, varying pace, denial moments |
| 5 | Peak intensity/edge | Right at the edge, voice commands, near-ruin |

---

## 🔧 Timer Mode Designs

### Mode 1: "Ride the Wave" (Non-Linear)
```typescript
const RIDE_THE_WAVE: SessionMode = {
  name: "Ride the Wave",
  description: "Flexible, user-directed timing inspired by Basson's model",
  features: {
    phases: "Any → Any (user chooses)",
    edgeTarget: "Optional (user-set or none)",
    phaseTransitions: "User-controlled + optional voice cues",
    duration: "Indefinite (user ends session)",
    bpm: "User-adjustable at any time",
    pause: "Infinite (timer counts down if desired)",
  },
  presetDefaults: {
    stroke: 120,
    edge: 60,
    rest: 90,
    cycles: Infinity, // user ends
  },
};
```

### Mode 2: "Lock and Load" (Structured)
```typescript
const LOCK_AND_LOAD: SessionMode = {
  name: "Lock and Load",
  description: "Structured routine with user-overridable transitions",
  features: {
    phases: "Fixed stroke → edge → rest → repeat",
    edgeTarget: "User-set goal (5, 10, 20, ∞)",
    phaseTransitions: "Auto + 10-second user override window",
    duration: "Configurable (10/20/30 min)",
    bpm: "Preset per phase, user-adjustable ±10%",
    pause: "30-second max (auto-resume)",
  },
  presetDefaults: {
    stroke: 60,
    edge: 30,
    rest: 45,
    cycles: 8,
  },
};
```

### Mode 3: "Adaptive Recovery" (Post-Orgasm)
```typescript
const ADAPTIVE_RECOVERY: SessionMode = {
  name: "Adaptive Recovery",
  description: "Handles post-orgasm response variation",
  triggers: ["orgasm", "session-milestone"],
  options: {
    continue: "Return to lower-intensity mode",
    recover: "Timed recovery period (1-10 min, configurable)",
    reset: "Full session restart at warmup",
    end: "Finish → aftercare",
  },
  autoBehavior: "NONE — user must choose",
};
```

---

## 🧪 Research-Backed MVP Feature Set

| Feature | Research Basis | Implementation Priority |
|--------|----------------|------------------------|
| **Ride the Wave mode** | 66.9% report non-linear patterns | 🔴 HIGH |
| **User feedback overlay** (5-button control) | Desire ≠ arousal independence | 🔴 HIGH |
| **Anatomy-neutral card zones** | Clitorus complexity, diverse anatomy | 🔴 HIGH |
| **Post-orgasm choice screen** | Variable refractory/recovery | 🔴 HIGH |
| **Intensity progression system** | Sensate focus research | 🔴 HIGH |
| **Breath pacer (separate from BPM)** | 4-7 breathing effectiveness | 🟡 MEDIUM |
| **Recovery mode timer** | Post-orgasmic variation | 🟡 MEDIUM |
| **Saved personal settings** | Personalization need | 🟡 MEDIUM |
| **Voice coach "feeling" cues** | Verbal feedback importance | 🟢 LOW |

---

## 📋 Research Sources Summary

1. **Basson, R. (2000)** — "The Female Sexual Response: A Different Model" — Non-linear, circular model
2. **Basson, R. (2002)** — "A Model of Women's Sexual Arousal" — Physiological markers don't predict subjective experience
3. **Pauls, R.N. (2015)** — "Anatomy of the clitoris" — Internal structure complexity
4. **Hayes, R.D. (2011)** — "Circular and linear modeling of female sexual desire" — 66.9% experience both models
5. **Bhat et al. (2026)** — "Post Orgasmic Refractory Period in Women: Myth or Reality?" — Variable recovery confirmed
6. **Female Sexual Arousal: Genital Anatomy and Orgasm in Intercourse** — Peer-reviewed PubMed review
7. **Determinants of female sexual orgasms** — PubMed Central review

---

## 🔗 Cross-References

- [[inclusive-edging-design]] — Design philosophy + breakthrough features
- [[research-prompts]] — Research Prompt 1 (female arousal), Prompt 6 (breathwork)
- [[edging-mechanics-ux]] — Timer state machine, session flow
- [[types-spec]] — SessionMode type definition
- [[tech-spec]] — Timer precision, Web Audio implementation

---

## 🏷️ Tags
`physiology`, `female-arousal`, `Basson-model`, `game-design`, `timer-modes`, `research-findings`, `mvp-features`