---
tags: [research, ai-voice-coach, on-device-llm, tts, privacy, mvp]
---

# Local AI Voice Coach for Personalized Intimate Experiences

> **Source**: Apple Foundation Models, llama.cpp, Piper/Kokoro TTS, on-device LLM research
> **Key Finding**: On-device LLM for bounded prompt generation + local preference learning + local TTS
> **Status**: ✅ Ready for MVP (Phase 1: Voice-enabled card player)

---

## 🎯 Core Product Concept

> **Privacy-first AI voice coach** that generates personalized instructions for intimate experiences (edging, pacing, recovery, partner-led sessions) — all on-device, no cloud upload.

**Architecture**: 3-layer separation
1. **Local LLM** → Bounded prompt generation within user-defined boundaries
2. **Local TTS** → Voice synthesis (native → Piper/Kokoro)
3. **Session Controller** → Deterministic state machine (timer, safety, consent)

**Core Principle**: Personalize *voice/pacing/wording* — NEVER personalize away user control.

---

## 🧬 5 Voice Personality Profiles (Configurable)

| Profile | Tone | Rate | Style | Best For |
|---------|------|------|-------|----------|
| **Calm Guide** | Reassuring, neutral | Slower | Gentle suggestions | Beginners, recovery, awareness |
| **Direct Coach** | Confident, neutral | Moderate | Direct instructions | Timed routines, predictable sequences |
| **Playful Tease** | Playful, warm | Variable | Suggestive prompts | Novelty, anticipation |
| **Praise Partner** | Warm, encouraging | Moderate | Affirmation-led | Users preferring encouragement |
| **Formal Director** | Composed, formal | Measured | Structured steps | Ritual-like, consensual roleplay |

**All profiles configurable**: `directness`, `playfulness`, `encouragement`, `verbosity`, `speech_rate`, `pause_length`, `check_in_frequency`

---

## 🏗️ Architecture (3-Layer Separation)

```
USER PREFERENCES → Voice Profile → Local LLM / Prompt Selection → Structured Output Validator
                                                              ↓
                                            Session Controller (timer, safety, consent)
                                                              ↓
                                            Local TTS (native → Piper/Kokoro)
                                                              ↓
                                                            AUDIO
```

**Key Separation**: LLM generates *bounded instruction object* → Validator checks schema/consent/safety → Session Controller handles timing/safety → TTS plays audio.

**LLM Never**: Controls timer, overrides consent, changes safety settings, decides session flow.

---

## 🔧 Local LLM Integration (2-Track)

### Track 1: Apple-First (iOS/watchOS)
- **Apple Foundation Models** → Native, offline, structured outputs
- Device compatibility checked at runtime

### Track 2: Cross-Platform (All Hardware)
- **llama.cpp** with quantized 1B-4B parameter models
- Test instruction-following, latency, memory, battery, multilingual quality

**Both**: Constrained output schema, validator, prewritten fallback cards

```json
{
  "card_type": "CHECK_IN",
  "spoken_text": "Would you like to continue at this pace, slow down, pause, or finish?",
  "requires_user_response": true,
  "allowed_actions": ["CONTINUE", "SLOW_DOWN", "PAUSE", "STOP"],
  "timer_change": null,
  "voice_style": "CALM_GUIDE"
}
```

**Validation Rules** (pre-playback):
1. Schema match ✓
2. Belongs to current session ✓
3. No unapproved activities ✓
4. Required check-ins not skipped ✓
5. Pause/stop never disabled ✓
6. Consent settings unchanged ✓
6. Length limit respected ✓

---

## 🧠 Local Preference Learning (Explicit Feedback Only)

**Never infers**: Consent from silence, hidden desires, psychological vulnerabilities

**Only learns from explicit feedback**:
```
"Helpful" / "Too much talking" / "Too formal" / "Too playful"
"Too fast" / "Too slow" / "More check-ins" / "Fewer check-ins"
```

**Updates local preference vector per profile**:
```json
{
  "profile": "CALM_GUIDE",
  "preferred_verbosity": 1,
  "preferred_speech_rate": 0.9,
  "preferred_pause_length": "long",
  "check_in_frequency": "medium",
  "playfulness": 1
}
```

**Rules**: Bounded values, explicit feedback only, stop/pause/skip = valid actions (not negative feedback).

---

## 🛡️ Consent-Aware Personalization

| Preference | Controls | Must NOT Control |
|------------|----------|------------------|
| Voice personality | Tone, phrasing | Whether user can stop |
| Speaking rate | Delivery speed | Session duration |
| Prompt density | Instruction frequency | Required consent checks |
| Timing style | Fixed/flexible intervals | Auto-escalation |
| Encouragement | Positive feedback type | Pressure to continue |
| Roleplay vocabulary | Fictional language | Real-world permissions |

**Every session starts with scope summary. Material changes require user agreement.**

---

## 🛡️ Privacy & Security (Local-First)

| Data | Default Handling |
|------|------------------|
| Voice profile / preferences | Stored locally |
| Feedback on prompts | Stored locally |
| Generated instruction text | Not retained after playback (unless saved) |
| Voice recordings | Not collected by default |
| Raw microphone audio | Not required (TTS only) |
| Session history | Optional, with deletion controls |
| Analytics | Operational metrics only, no intimate content |

**Voice cloning** (if added later): Explicit permission + revocation/deletion process.

**Offline mode**: Works without network when LLM/TTS support local inference.

**Safety fallback**: Prewritten card if model unavailable/slow/invalid — timer state preserved, pause/stop never delayed.

---

## 🚀 MVP Roadmap (4 Phases)

| Phase | Features | Focus |
|-------|----------|-------|
| **1. Voice Card Player** | 5 profiles, prewritten cards, native TTS, speech rate/pause, manual controls | Validate voice utility |
| **2. Local LLM** | On-device prompt rewriting, schema-constrained generation, session-state phrasing, output validation, prewritten fallbacks | Validate generation utility |
| **3. Local Neural Voices** | Piper (Finnish+), Kokoro (English+), latency/quality/licensing/battery testing | Voice quality + multilingual |
| **4. Personalization** | Feedback-based updates, per-profile prefs, custom prompt libs, export/deletion | User control + privacy |

---

## 📊 Success Metrics (Autonomy > Engagement)

| Metric | What It Measures |
|--------|------------------|
| Prompt helpfulness rating | Generated instructions meet expectations |
| Voice-profile changes | Defaults appropriate? |
| Manual adjustment frequency | Users need more control? |
| Invalid-output rate | Generation reliability |
| Time to first audio | Perceived responsiveness |
| Fallback frequency | Model reliability |
| Privacy-setting usage | Users can manage data? |
| User-reported pressure | Personalization creating expectations? |
| Stop/pause accessibility | Controls remain accessible? |

**Never optimize for**: Session duration, prompt acceptance, compliance with generated instructions.

---

## 🔗 Integration Points

| Component | Integration |
|-----------|-------------|
| **Timer Modes** | Voice coach available in all 5 modes (Wave/Lock/Switch/Multi-Peak/Async) |
| **Cards** | Voice reads card text + generates transitions |
| **Kegel/Sensate** | Voice guides breathing, contractions, check-ins |
| **Consent** | Voice reads check-ins, never overrides RED/YELLOW/GREEN |
| **Privacy** | Reuses local storage, consent flow, token system |
| **Async LDR** | Voice reads async cards locally |

---

## 📋 MVP Settings

```typescript
const VOICE_COACH_MVP = {
  profiles: 5,                    // Calm/Direct/Playful/Praise/Formal
  tts: "native",                  // Phase 1: native TTS
  llm: "none",                    // Phase 1: no LLM
  fallback: "prewritten_cards",   // Always available
  privacy: "local_only",          // No cloud
  offline: true,                  // Works without network
  consent_voice: "reads_checkins_never_overrides",
};
```

---

## 🔗 Cross-References

- [[inclusive-timer-design]] — Voice in all 5 timer modes
- [[inclusive-edging-design]] — Kegel voice guidance
- [[sensate-focus-card-system]] — Voice reads sensate cards
- [[multi-peak-mode]] — Multi-peak voice coaching
- [[async-ldr-edging]] — Async card voice reading
- [[types-spec]] — Voice coach types defined

---

## 🏷️ Tags
`research`, `ai-voice-coach`, `on-device-llm`, `tts`, `privacy`, `mvp`, `personalization`, `consent`