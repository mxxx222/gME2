---
tags: [design, timer, inclusive, physiology, mvp-core]
---

# Inclusive Timer Design: Combining Male & Female Research

> **Goal**: One timer engine that works for all genders, orientations, and arousal patterns
> **Based on**: [[female-arousal-findings]] + [[male-arousal-findings]] research synthesis
> **Status**: ✅ Ready for implementation

---

## 🎯 Core Design Principle

> **Timer adapts to user feedback — not elapsed time assumptions**

Research across both male and female physiology shows:
- **66.9% of people** experience BOTH linear and non-linear arousal patterns
- **No universal PONR** exists for anyone — male or female
- **Sensitivity ≠ pleasure** — reduced touch sensation doesn't mean reduced enjoyment
- **Recovery varies wildly** — both post-orgasmic and post-edge
- **Anatomy doesn't predict response** — personalize to experience

---

## 🏗️ Universal Session State Machine

```mermaid
stateDiagram-v2
    [*] --> Negotiation
    Negotiation --> Warmup
    Warmup --> Build
    Build --> Hold
    Hold --> Build
    Hold --> Recover
    Recover --> Hold
    Recover --> Build
    Build --> Resolution
    Hold --> Resolution

    state Resolution {
        [*] --> Denial
        [*] --> Release
        [*] --> Ruin
        Denial --> Aftercare
        Release --> Aftercare
        Ruin --> Aftercare
    }

    Resolution --> Aftercare
    Aftercare --> [*]

    note right of Build
        Flexible: any duration, user-controlled BPM
        Feedback: sensation, pleasure, comfort
    end

    note right of Hold
        Maintain or reduce. No auto-increase.
        "Sensitivity feels reduced? → Offer pause"
    end

    note right of Recover
        User assesses: resume, extend, or end
        2-min blocks, extendable indefinitely
    end
```

---

## 🔀 Mode Selection (What the user picks)

### Mode 1: "Ride the Wave" (Flexible / Non-Linear)
**Based on**: Basson's circular model, female arousal research
**Best for**: People whose arousal fluctuates, doesn't want rigid structure

```typescript
{
  name: "Ride the Wave",
  description: "Flexible, user-directed timing. Inspired by Basson's model of sexual response.",
  phaseTransitions: "Any → Any (user chooses at every step)",
  edgeTarget: "Optional — user sets or disables",
  bpmControl: "User-adjustable at any time, optional",
  pauseBehavior: "Indefinite — timer waits for user",
  phaseSkip: "Yes — skip Hold, jump to Recover, etc.",
  duration: "No preset end — user ends session",
}
```

### Mode 2: "Lock and Load" (Structured / Linear)
**Based on**: Traditional linear model, male arousal research
**Best for**: People who prefer predictable routines, counting edges

```typescript
{
  name: "Lock and Load",
  description: "Structured routine with user-overridable transitions.",
  phaseTransitions: "Build(2min) → Hold(1min) → Recover(2min) → repeat",
  edgeTarget: "User-set goal (5, 10, 20, or ∞ edges)",
  transitionOverride: "10-second window to change phase",
  bpmControl: "Preset per phase, adjustable ±10%",
  pauseBehavior: "Max 30 seconds (auto-resume)",
  phaseSkip: "Limited — user can end cycle early",
  duration: "Configurable (10/20/30 min sessions)",
}
```

### Mode 3: "Switch Flow" (Role-Alternating)
**Based on**: Inclusive design research, queer community patterns
**Best for**: Couples who want to switch roles, all orientations

```typescript
{
  name: "Switch Flow",
  description: "Roles alternate per cycle. Both partners experience giving and receiving.",
  phaseTransitions: "Cycle 1: Partner A gives → Cycle 2: Partner B gives",
  rolePrompt: "At cycle 3, draw 'Switch Roles' card automatically",
  edgeTarget: "Split across both partners",
  bpmControl: "Partner giving sets BPM",
  pauseBehavior: "During pause, roles can swap",
  phaseSkip: "Yes",
  duration: "No preset end — rotates until user stops",
}
```

---

## 🎛️ Universal Feedback System

Every phase ends with optional check-ins — works for all bodies, all genders:

### Single-Button Quick Check
```
[⏥ Good] [⏸ Slow Down] [🔴 Too Much] [🛑 Stop Now]
```

### Detailed Check (optional)
```
Touch Intensity: [ Gentle ←→ Firm ]
Pleasure Level:  [ Lower ←→ Higher ]
Comfort:         [ Uncomfortable ←→ Good ]
Sensation:       [ Diminished ←→ Sharp ]
Readiness:       [ Not Ready ←→ Continue ]
```

**Key insight from research**: Any of these can change independently. Don't conflate sensitivity with pleasure.

---

## ⚙️ Phase Duration Configuration

### Build Phase (Entry/Setup)
| Setting | Default | Notes |
|---------|---------|-------|
| Duration | 2-4 minutes | User can set per session |
| BPM | User-selected | Optional, can be disabled |
| Purpose | Establish comfort rhythm | "Check in after 90s" option |

### Hold Phase (Main Edging)
| Setting | Default | Notes |
|---------|---------|-------|
| Duration | 1-3 minutes | Variable per cycle |
| BPM | Maintained or reduced | Never auto-increases |
| Purpose | Edge near PONR | User feedback overrides |

### Recover Phase (Pause/Reset)
| Setting | Default | Notes |
|---------|---------|-------|
| Duration | 2 minutes | Extendable in 2-min blocks |
| BPM | Zero (or very low) | No cues = pure pause |
| Purpose | Assess sensitivity | User decides: resume or end |

### Edge Counting (Denial Mode)
| Setting | Default | Notes |
|---------|---------|-------|
| Edge target | User-set (5/10/20/∞) | Not auto-detected |
| Edge logging | Manual tap + auto-cue | "You hit the edge" prompt |
| Reset on failure | Option: Reset counter or continue | User preference |

---

## 🔬 Physiology-Informed Decision Engine

```typescript
interface UserFeedback {
  sensation: "diminished" | "normal" | "heightened";
  pleasure: "decreasing" | "stable" | "increasing";
  comfort: "good" | "discomfort" | "irritation";
  readiness: "continue" | "pause" | "stop";
}

function handleFeedback(feedback: UserFeedback): PhaseAction {
  // Irritation or pain always = stop
  if (feedback.comfort === "irritation" || feedback.comfort === "pain") {
    return { type: "finish", reason: "irritation_detected" };
  }

  // Sensitivity diminished? Offer recovery
  if (feedback.sensation === "diminished") {
    return {
      type: "auto-suggest",
      action: "recover",
      message: "Sensitivity feels reduced. Would you like to pause?"
    };
  }

  // Sensitivity heightened? Caution
  if (feedback.sensation === "heightened") {
    return {
      type: "auto-suggest",
      action: "reduce_bpm",
      message: "Heightened sensation detected. Reducing intensity?"
    };
  }

  // Normal + user wants to continue = stay in current phase
  if (feedback.comfort === "good" && feedback.readiness === "continue") {
    return { type: "extend_current" };
  }

  // Otherwise → user's choice
  return { type: "prompt_user", options: ["continue", "pause", "finish"] };
}
```

---

## 📊 Inclusive Data Model

### Universal Stimulation Zones (not gendered)

```typescript
// src/lib/types/anatomy.ts
export const STIMULATION_ZONES = [
  // Universal areas
  "scalp", "hairline", "neck", "ears", "arms", "hands",
  "inner_thighs", "perineum", "feet", "toes",

  // Genital-adjacent (inclusive phrasing)
  "genital_external",      // glans/clitoral hood — accessible
  "genital_internal",      // shaft/wall pressure — through clothing or hands
  "breast_tissue",         // nipples/chest
  "anal_area",             // rim/perineum — accessible

  // Sensation types
  "pressure", "sliding", "circling", "tapping", "brushing",
  "temperature", "breath", "voice",
] as const;
```

### Session Profile (saves user preferences)

```typescript
export interface SessionProfile {
  userId: string;                    // or "partner_a" in couple mode
  preferredMode: "wave" | "lock" | "switch";
  preferredBPM: number;              // 0 = no cues
  comfortSensitivity: "high" | "medium" | "low";
  pausePreference: "auto" | "prompt" | "never";
  sensationProfile: {
    // Saved from previous sessions
    sensationRecoveryTime: number;   // How long pauses restore sensation
    preferredEdgeIntensity: number;  // 1-10 where edge feels best
    irritationTriggers: string[];    // E.g., "rough_touch", "long_duration"
  };
  favorites: {
    cards: string[];        // Favorite card IDs
    phases: PhaseSettings[];
  };
}
```

---

## 🚀 MVP Implementation Priority

| Feature | Research Basis | Priority | Effort |
|--------|----------------|----------|--------|
| **Build-Hold-Recover state machine** | Both male + female research | 🔴 P0 | Low |
| **User feedback override (not timer-driven)** | Both papers | 🔴 P0 | Low |
| **Ride the Wave mode** (non-linear) | Female arousal: 66.9% | 🔴 P0 | Medium |
| **Lock and Load mode** (structured) | Male linear preference | 🟡 P1 | Medium |
| **5-axis feedback check** | "Sensation ≠ pleasure" finding | 🟡 P1 | Medium |
| **Pause behavior = restore sensation** | Rubber glove effect | 🟡 P1 | Low |
| **No auto-increase on reduced sensation** | Male sensitivity research | 🔴 P0 | Low |
| **Separate edging recovery vs post-orgasm** | Male research | 🟢 P2 | Medium |
| **Switch Flow mode** (role rotation) | Inclusive design | 🟢 P2 | Medium |
| **Saved user profiles** | Personalization research | 🟢 P2 | High |

---

## 🔗 Connected Documents

- [[female-arousal-findings]] — Clinical research synthesis
- [[male-arousal-findings]] — Physiological evidence base
- [[edging-mechanics-ux]] — Timer state machine + session flow
- [[types-spec]] — PhaseSpec, UserFeedback, SessionProfile types
- [[tech-spec]] — rAF timer, Web Audio implementation
- [[inclusive-edging-design]] — Card language + zone design

---
*Tag: `timer`, `inclusive-design`, `physiology`, `state-machine`, `mvp-core`*