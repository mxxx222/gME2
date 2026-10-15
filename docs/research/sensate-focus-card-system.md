---
tags: [research, sensate-focus, intimacy, card-system, mvp-content]
---

# Sensate Focus × Edging: Five-Level Intimacy Card System

> **Source**: Masters & Johnson Sensate Focus protocol + 2024 RCT evidence + International Consultation on Sexual Medicine  
> **Key Finding**: 35-couple RCT found improvements in women's orgasm outcomes — but evidence is preliminary  
> **Status**: ✅ Ready for card integration  

---

## 🎯 Core Insight for Game Design

> **Traditional Sensate Focus deliberately EXCLUDES orgasm in early stages. Edging is an OPTIONAL later extension, not the default goal.**

This perfectly aligns with the inclusive design principle: `arousal trajectory ≠ orgasm trajectory ≠ trust trajectory`.

---

## 🏗️ The Five-Level Progression

| Level | Card Name | Theme | Timer Purpose | Orgasm Goal |
|-------|-----------|-------|--------------|-------------|
| 1 | Connect | Safety before sensation | Remove pressure, establish comfort | **None** |
| 2 | Discover | Notice, don't evaluate | Explore touch/pressure/temperature | **None** |
| 3 | Communicate | Ask, listen, adjust | Build communication confidence | Optional |
| 4 | Explore | Intimacy without obligation | Explore erotic touch + pacing | Optional |
| 5 | Regulate | Explore arousal without chasing | Edging pacing, pauses, self-regulation | User-defined |

> **Critical transition**: Levels 3→4 — erotic becomes *option*, not *obligation*.

---

## 🎴 The Five Intimacy Cards

Ready-to-use content for your card deck:

### LEVEL 1 — CONNECT
```
Intensity: 1/5 | Theme: Safety before sensation
Timer: 10-15 minutes

"Create a comfortable environment where neither person needs to perform."

Card prompts:
• "What kind of touch feels comfortable today?"
• "There is nothing we need to achieve."
• "We can stop or change direction at any time."

Communication cue: Each partner chooses one word: comfortable, curious, or unsure.

Completion: Finish when both feel ready — not when timer expires.
```

### LEVEL 2 — DISCOVER
```
Intensity: 2/5 | Theme: Notice, don't evaluate
Timer: 10-20 minutes

"Explore physical sensations without immediately judging them."

Card prompts:
• "Notice the sensation before deciding what you think about it."
• "Neutral is a perfectly valid response."
• "Would you like to stay here or explore somewhere else?"

Communication cue: Hand-guiding technique — receiver guides giver's hand.

Completion: Each identifies one enjoyed, one neutral, one to change.
```

### LEVEL 3 — COMMUNICATE
```
Intensity: 3/5 | Theme: Ask, listen and adjust
Timer: 10-20 minutes

"Make communication part of intimacy rather than an interruption to it."

Card prompts:
• "Would you like me to continue, change something or pause?"
• "A little gentler would feel better."
• "Let's slow down. We don't need to get anywhere."

Communication cue: Three choices — Continue, Change, Pause.

Completion: Both can communicate one preference without pressure.
```

### LEVEL 4 — EXPLORE
```
Intensity: 4/5 | Theme: Intimacy without obligation
Timer: 10-20 minutes

"Introduce optional erotic touch while preserving trust and communication."

Card prompts:
• "Would you like to explore something more intimate?"
• "We can enjoy this without needing it to lead anywhere."
• "Would you prefer to continue, change the pace or take a break?"

Communication cue: Ask what feels comfortable (not whether they're aroused).

Completion: Both feel free to continue, change activities, or finish without disappointment.
```

### LEVEL 5 — REGULATE (Optional Edging)
```
Intensity: 5/5 | Theme: Explore arousal without chasing an outcome
Timer: 10-20 minutes (adjustable)

Phase 1 — Settle: "Arrive in the moment. Nothing needs to happen next."
Phase 2 — Explore: "Notice what feels interesting without judging how quickly your response changes."
Phase 3 — Choose: Continue | Slow down | Pause | Finish
Phase 4 — Optional edging: "Would you like to continue, pause or change the pace?"
Phase 5 — Reconnect: "What felt comfortable or enjoyable?"

Completion: Finish when either person wants to finish.

Remember: Orgasm is optional. A pause is not failure.
```

---

## 🗣️ Communication Technique Toolkit

### Permission Loop
**Ask → Listen → Adjust → Check in**

❌ Avoid: "Are you turned on yet?"  
✅ Prefer: "How does this feel for you?"

❌ Avoid: "Why aren't you responding?"  
✅ Prefer: "Would you prefer something different?"

### Nonverbal Options
- 👍 Thumbs-up: Continue
- 🖐️ Flat hand: Pause
- ✋ Hand-guiding: Adjust location/pressure
- ↩️ Moving away: Stop + check in

---

## 🏥 Evidence & Positioning

### Clinical Evidence
- **RCT (35 couples)**: Improvements in women's orgasm outcomes — but preliminary (small sample)
- **2024 International Consultation**: Sensate Focus widely used, evidence base uneven
- **Not clinically validated** as an edging protocol — edging is optional extension

### Defensible Product Positioning
> "A guided intimacy timer that helps partners explore touch, communicate preferences, and reduce pressure to achieve specific sexual outcomes."

### What NOT to Claim
❌ Clinically validated protocol  
❌ Treats sexual dysfunction  
❌ Guarantees trust or improved orgasm control  
❌ Replaces medical/psychosexual support  

---

## 🏗️ Recommended Product Architecture

### P0 — MVP (Levels 1-4)
```typescript
interface IntimacyCard {
  cardId: `LEVEL_${1|2|3|4|5}_${string}`;
  intensityLevel: 1 | 2 | 3 | 4 | 5;
  theme: "Connection" | "Discovery" | "Communication" | "Exploration" | "Regulation";
  primaryGoal: "Establish safety" | "Explore sensation" | "Build communication" | "Intimate touch" | "Arousal regulation";
  timerDurationSeconds: number;           // Adjustable
  touchScope: "user_defined";             // Partner defines what's in scope
  orgasmRequired: false;                  // Always false at Levels 1-4
  consentCheckEnabled: boolean;           // Always true
  pauseEnabled: boolean;
  stopEnabled: boolean;
  progressionRule: "mutual_readiness";     // Both must agree
  postSessionFeedback: string[];          // Comfortable, Curious, Unsure, Adjust
}
```

### P1 — Personalization
- Optional saved preferences per partner
- New couple vs established couple guidance
- User-defined activity names + body area terms
- Optional post-session reflections
- Session history (opt-in, deletable)

### P2 — Advanced Edging
- Level 5 optional edging timer
- User-configurable pacing + pauses
- Solo + partnered experiences
- Privacy-first history settings

---

## 🔗 Integration Points

- [[coreDeck]] — Cards 01-06 map to Levels 1-4 touch zones
- [[inclusive-timer-design]] — Wave mode for Level 5 edging
- [[inclusive-edging-design]] — Card language style guide
- [[types-spec]] — `IntimacyCard` type + `KegelTimerCard` integration
- [[research-prompts]] — Prompt 5 covers sensate focus

---

## 🏷️ Tags
`research`, `sensate-focus`, `intimacy`, `card-system`, `mvp-content`, `communication`, `trust-building`