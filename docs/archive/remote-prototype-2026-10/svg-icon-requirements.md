# CoupleEdger SVG Icon Requirements

> **Context**: Comprehensive icon system for CoupleEdger PWA covering all UI elements, card types, timer phases, safety states, and user interactions. 100% locally rendered, no external dependencies.

---

## Icon Categories (Total: 85+ Icons)

### 1. Safety State Icons (4 Essential)

| Icon | Description | Usage |
|------|-------------|-------|
| `red-circle.svg` | Red circle with white border | Stop/Red safety state |
| `yellow-circle.svg` | Yellow circle with white border | Pause/Yellow safety state |
| `green-circle.svg` | Green circle with white border | Continue/Green safety state |
| `safeword-badge.svg` | Shield icon with "SAFEWORD" text | Emergency safeword access |

### 2. Card Type Icons (6 Essential + 2 Variants)

| Icon | Description | Usage |
|------|-------------|-------|
| `edge-card.svg` | Card with wave/edge symbol | EDGE type cards |
| `tease-card.svg` | Card with feather/tease symbol | TEASE type cards |
| `punishment-card.svg` | Card with lightning/punishment symbol | PUNISHMENT type cards |
| `reward-card.svg` | Card with star/reward symbol | REWARD type cards |
| `wildcard-card.svg` | Card with wildcard/joker symbol | WILDCARD type cards |
| `command-card.svg` | Card with text/command symbol | COMMAND type cards |

**Variant Versions** (colored for intensity levels):
- `edge-card-intensity-1.svg`, `intensity-2.svg`, `intensity-3.svg`, `intensity-4.svg`, `intensity-5.svg`
- Same variants for all 6 card types

### 3. Multi-Peak Phase Icons (5 Core)

| Icon | Description | Usage |
|------|-------------|-------|
| `recognize-edge.svg` | Eye/awareness symbol | multi-peak-01-recognize |
| `contract-release.svg` | Muscle/contraction symbol | multi-peak-02-contract-release |
| `edge-reset.svg` | Reset/replay symbol | multi-peak-03-edge-reset |
| `multi-peak-recovery.svg` | Healing/recovery symbol | multi-peak-04-recovery |
| `choose-peak.svg` | Choice/fork symbol | multi-peak-05-choose-peak |

### 4. Kegel Timer Mode Icons (5 Modes)

| Icon | Description | Usage |
|------|-------------|-------|
| `hold-release.svg` | Hold/release arrows | Kegel: Hold & Release |
| `rhythm-sync.svg` | Rhythm waves | Kegel: Rhythm Sync |
| `edge-awareness.svg` | Edge/awareness icon | Kegel: Edge Awareness |
| `relaxation-reset.svg` | Relaxation/release | Kegel: Relaxation Reset |
| `adaptive-sync.svg` | Adaptive sync symbol | Kegel: Adaptive Sync |

### 5. Timer Phase Icons (4 Phases)

| Icon | Description | Usage |
|------|-------------|-------|
| `stroke-phase.svg` | Stroke/swoosh symbol | Three-phase: stroke |
| `edge-phase.svg` | Edge/peak symbol | Three-phase: edge |
| `rest-phase.svg` | Rest/relax symbol | Three-phase: rest |
| `idle-phase.svg` | Idle/sleep symbol | Three-phase: idle/reset |

### 6. Voice Coach Icons (7 Languages)

| Icon | Language | Usage |
|------|----------|-------|
| `voice-en-US.svg` | English (US) | Web Speech API |
| `voice-en-GB.svg` | English (UK) | Web Speech API |
| `voice-es-ES.svg` | Spanish (Spain) | Web Speech API |
| `voice-fr-FR.svg` | French (France) | Web Speech API |
| `voice-de-DE.svg` | German (Germany) | Web Speech API |
| `voice-it-IT.svg` | Italian (Italy) | Web Speech API |
| `voice-pt-BR.svg` | Portuguese (Brazil) | Web Speech API |

**Unified Voice Icon**: `voice-coach.svg` with language selector

### 7. Haptic Pattern Icons (5 Patterns)

| Icon | Pattern | Usage |
|------|---------|-------|
| `haptic-standard.svg` | Standard vibration | Default haptic feedback |
| `haptic-slow.svg` | Slower vibration | Relaxation phase |
| `haptic-fast.svg` | Faster vibration | Edge/peak phase |
| `haptic-pulse.svg` | Pulse pattern | Rhythm sync |
| `haptic-custom.svg` | Custom pattern | User-defined patterns |

### 7. Three-Phase Progress Icons

| Icon | Description | Usage |
|------|-------------|-------|
| `progress-stroke.svg` | Stroke progress | 0% stroke progress |
| `progress-edge.svg` | Edge progress | 50% edge progress |
| `progress-rest.svg` | Rest progress | 75% rest progress |
| `progress-complete.svg` | Complete/checkmark | Session complete |

### 8. Session Navigation Icons

| Icon | Description | Usage |
|------|-------------|-------|
| `next-card.svg` | Arrow forward | Next card in deck |
| `prev-card.svg` | Arrow backward | Previous card in deck |
| `shuffle-deck.svg` | Shuffle arrows | Deck randomization |
| `favorite-card.svg` | Heart/bookmark | Save favorite card |
| `share-card.svg` | Share arrow | Share to partner/social |

### 9. Profile & Connection Icons

| Icon | Description | Usage |
|------|-------------|-------|
| `partner-invite.svg` | Person with + | Partner invitation |
| `partner-connect.svg` | Two connected dots | Two-player connection |
| `privacy-shield.svg` | Shield/lock | Privacy protection |
| `data-delete.svg` | Trash can | Data deletion |
| `profile-edit.svg` | Pencil/user | Profile editing |

### 10. App Store & Policy Icons

| Icon | Description | Usage |
|------|-------------|-------|
| `pwa-install.svg` | Install app icon | PWA installation |
| `app-store-badge.svg` | App store badge | Distribution compliance |
| `privacy-policy.svg` | Document/lock | Privacy policy |
| `terms-service.svg` | Gavel/terms | Terms of service |
| `18-plus-badge.svg` | "18+" text badge | Age verification |

### 11. Visual Mode Icons (3 Modes)

| Icon | Mode | Usage |
|------|------|-------|
| `mode-pulse.svg` | Pulse | Visual mode: pulse |
| `mode-flash.svg` | Flash | Visual mode: flash |
| `mode-breath.svg` | Breath | Visual mode: breath |

### 12. Shared/Session Icons

| Icon | Description | Usage |
|------|-------------|-------|
| `session-start.svg` | Play/start | Start session |
| `session-pause.svg` | Pause | Pause/resume session |
| `session-reset.svg` | Circular arrow | Reset session |
| `session-save.svg` | Disk/save | Save session progress |
| `session-share.svg` | Share arrow | Share session with partner |

---

## Icon Design Specifications

### Technical Requirements

1. **SVG Format**: All icons as inline SVGs with viewBox attributes
2. **ViewBox**: 24x24 viewBox standard (except specialized icons)
3. **Color System**:
   - Primary: CurrentColor (inherits from CSS)
   - State colors: Red (#f44336), Yellow (#ffeb3b), Green (#4caf50)
   - Neutral: #666 for secondary elements
4. **Accessibility**:
   - All SVGs include `aria-hidden="true"` or meaningful `aria-label`
   - Focus states for interactive icons
   - Skip links for screen readers
5. **Performance**:
   - Each SVG < 2KB compressed
   - Inline SVG sprite sheet for production
   - No external dependencies or fonts

### Design System Integration

1. **Color Tokens** (from `src/index.css`):
   ```css
   --safety-red: #f44336;
   --safety-yellow: #ffeb3b;
   --safety-green: #4caf50;
   --accent-primary: #4a90d9;
   --text-primary: #e0e0e0;
   ```

2. **Stroke Width**: 2px standard, 3px for emphasis icons
3. **Corner Radius**: 4px maximum for all rounded elements
4. **Scaling**: 100% at 24px, scalable via CSS `width/height`

### File Structure

```
/src/assets/icons/
├── safety/
│   ├── red-circle.svg
│   ├── yellow-circle.svg
│   ├── green-circle.svg
│   └── safeword-badge.svg
│
├── cards/
│   ├── edge-card.svg
│   ├── edge-card-intensity-1.svg
│   ├── edge-card-intensity-2.svg
│   ├── edge-card-intensity-3.svg
│   ├── edge-card-intensity-4.svg
│   ├── edge-card-intensity-5.svg
│   ├── tease-card.svg
│   ├── ...(all 6 types × 5 intensities)
│   └── ...
│
├── multi-peak/
│   ├── recognize-edge.svg
│   ├── contract-release.svg
│   ├── edge-reset.svg
│   ├── multi-peak-recovery.svg
│   └── choose-peak.svg
│
├── kegel/
│   ├── hold-release.svg
│   ├── rhythm-sync.svg
│   ├── edge-awareness.svg
│   ├── relaxation-reset.svg
│   └── adaptive-sync.svg
│
├── phases/
│   ├── stroke-phase.svg
│   ├── edge-phase.svg
│   ├── rest-phase.svg
│   └── idle-phase.svg
│
├── voice/
│   ├── voice-en-US.svg
│   ├── voice-en-GB.svg
│   ├── voice-es-ES.svg
│   ├── voice-fr-FR.svg
│   ├── voice-de-DE.svg
│   ├── voice-it-IT.svg
│   └── voice-pt-BR.svg
│
├── haptics/
│   ├── haptic-standard.svg
│   ├── haptic-slow.svg
│   ├── haptic-fast.svg
│   ├── haptic-pulse.svg
│   └── haptic-custom.svg
│
├── progress/
│   ├── progress-stroke.svg
│   ├── progress-edge.svg
│   ├── progress-rest.svg
│   └── progress-complete.svg
│
├── navigation/
│   ├── next-card.svg
│   ├── prev-card.svg
│   ├── shuffle-deck.svg
│   ├── favorite-card.svg
│   └── share-card.svg
│
├── profile/
│   ├── partner-invite.svg
│   ├── partner-connect.svg
│   ├── privacy-shield.svg
│   ├── data-delete.svg
│   └── profile-edit.svg
│
├── app/
│   ├── pwa-install.svg
│   ├── app-store-badge.svg
│   ├── privacy-policy.svg
│   ├── terms-service.svg
│   └── 18-plus-badge.svg
│
├── visual/
│   ├── mode-pulse.svg
│   ├── mode-flash.svg
│   └── mode-breath.svg
│
└── session/
    ├── session-start.svg
    ├── session-pause.svg
    ├── session-reset.svg
    ├── session-save.svg
    └── session-share.svg
```

### Implementation Checklist

- [ ] Create all 85+ SVG files with proper viewBox
- [ ] Implement CSS color token integration
- [ ] Add accessibility attributes (aria-label, role)
- [ ] Create SVG sprite sheet for production build
- [ ] Test icon rendering across all browsers
- [ ] Verify touch target sizes (minimum 44px hit area)
- [ ] Test dark/light mode compatibility
- [ ] Document icon usage in component library
- [ ] Create icon fallback for unsupported browsers

### Production Optimization

1. **SVG Sprite Sheet**: Consolidate all icons into single HTTP request
2. **SVG Minification**: Remove unnecessary attributes and comments
3. **Critical CSS**: Inline essential icons in HTML head
4. **Lazy Loading**: Load icons only when needed per page/component
5. **Caching Headers**: Long cache lifetime for static SVG assets

### Accessibility Compliance

- **WCAG 2.2 AA/AAA**: All icons have meaningful text alternatives
- **Keyboard Navigation**: Tab order and focus indicators
- **Screen Reader Support**: Descriptive aria-label on all interactive icons
- **Color Contrast**: Minimum 4.5:1 contrast ratio for all state colors
- **Motion Sensitivity**: Respect `prefers-reduced-motion` media query

### Testing Requirements

1. **Unit Tests**: Icon rendering, color inheritance, viewBox validation
2. **Integration Tests**: Component usage across different pages/sessions
3. **Cross-Browser**: Chrome, Safari, Firefox, Edge compatibility
4. **Mobile Testing**: iOS and Android touch targets
5. **Accessibility Audit**: axe-core or similar testing tools

---

## Quick Start: Creating Your First Icon

```html
<!-- Example: Red Safety Circle -->
<svg
  class="safety-icon"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  aria-label="Red safety state"
>
  <circle
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    stroke-width="2"
    fill="none"
  />
  <circle
    cx="12"
    cy="12"
    r="4"
    fill="currentColor"
  />
</svg>
```

```css
/* CSS Integration */
.safety-icon {
  width: 1.5rem;
  height: 1.5rem;
  stroke-width: 2;
}

/* State Variants */
.safety-icon.red { color: var(--safety-red); }
.safety-icon.yellow { color: var(--safety-yellow); }
.safety-icon.green { color: var(--safety-green); }
```