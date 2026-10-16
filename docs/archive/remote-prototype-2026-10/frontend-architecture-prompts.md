# Perfect & Robust Frontend Architecture Prompts for CoupleEdger (2026)

> **Goal**: Design a production-ready, scalable frontend architecture for CoupleEdger that achieves 99.5% crash-free sessions, 100ms timer precision, and 7-day PWA install retention.

---

## Frontend Architecture Prompt #1: Component Architecture & Design System

**Task**: Design a scalable component architecture for CoupleEdger that supports:

1. **Modular Component Structure**
   - Atomic design system (atoms, molecules, organisms, templates)
   - Component composition patterns for reusability
   - Storybook setup for component documentation
   - 7+ visual modes with theme switching

2. **Responsive Design System**
   - Mobile-first approach with progressive enhancement
   - 4K TV support and smart home integration
   - Touch interaction patterns for both phone and tablet
   - Accessibility WCAG 2.2 AAA compliance

3. **State Management Architecture**
   - Hierarchical state management (session → phase → card)
   - Persisted state patterns for offline support
   - Real-time synchronization patterns
   - State serialization for clinical research

**Deliverables**:
- Component folder structure with TypeScript interfaces
- Complete design tokens system (colors, typography, spacing)
- Storybook stories for 20+ core components
- Responsive design mockups for 3 device categories
- State management documentation and patterns

---

## Frontend Architecture Prompt #2: Timer Engine Integration

**Task**: Design the timer engine integration that achieves <100ms precision:

1. **High-Precision Timing Architecture**
   - requestAnimationFrame-based timing engine
   - Sub-millisecond precision measurement
   - Cross-browser compatibility matrix
   - Performance monitoring and drift compensation

2. **Phase Transition System**
   - Smooth phase transitions with visual feedback
   - Audio synchronization with timer precision
   - Haptic feedback integration patterns
   - User experience optimization for each phase

3. **Timer API Design**
   - TypeScript interfaces for all timer operations
   - Event-driven architecture for external triggers
   - Error handling and recovery patterns
   - Performance profiling tools

**Deliverables**:
- Timer architecture documentation
- Performance benchmarks and testing suite
- Cross-browser compatibility matrix
- Timer API specification document
- Error recovery and retry logic

---

## Frontend Architecture Prompt #3: Audio & Haptics Integration

**Task**: Design the audio and haptics system for immersive sessions:

1. **Audio Architecture**
   - Web Audio API architecture patterns
   - 6-7 distinct sound synthesis systems
   - Spatial audio for 2-player sessions
   - Adaptive audio based on biometric feedback

2. **Haptics Integration**
   - Device capability detection and fallback system
   - Custom vibration patterns for each phase
   - Smart home haptic integration
   - Accessibility haptics for visual users

3. **Multi-Modal Feedback**
   - Synchronized audio-visual-haptic feedback
   - Adaptive intensity based on user state
   - Context-aware feedback patterns
   - Performance optimization for battery life

**Deliverables**:
- Audio engine architecture document
- Haptics device compatibility matrix
- Performance optimization guide
- Accessibility integration checklist
- Audio testing automation suite

---

## Frontend Architecture Prompt #4: PWA & Offline Strategy

**Task**: Design the PWA architecture for 7-day install retention and offline reliability:

1. **Service Worker Architecture**
   - Workbox configuration for offline functionality
   - Cache strategies for different asset types
   - Background sync for session data
   - Offline-first application shell design

2. **Offline Experience**
   - Session continuation after connectivity loss
   - Local-first data persistence
   - Graceful degradation patterns
   - Offline analytics and error reporting

3. **Performance Optimization**
   - Bundle analysis and code splitting
   - Resource prioritization for different network conditions
   - Progressive enhancement for older devices
   - Memory management for long-running sessions

**Deliverables**:
- Service worker configuration
- Offline experience design
- Performance optimization guide
- Bundle analysis and recommendations
- Offline testing scenarios

---

## Frontend Architecture Prompt #5: Clinical & Research Integration

**Task**: Design the architecture for clinical integration and research data collection:

1. **Data Architecture**
   - HIPAA-compliant data structures
   - Clinical data export formats (FHIR, DICOM compatible)
   - Research-grade analytics and reporting
   - Privacy-preserving data sharing

2. **Clinical Tools**
   - Therapist dashboard architecture
   - Client progress tracking interface
   - Outcome measurement tools
   - Session export and documentation

3. **Research Integration**
   - Study protocol integration
   - Participant recruitment and onboarding
   - Data validation and quality control
   - Institutional review board compliance

**Deliverables**:
- Clinical data architecture specification
- Research integration patterns
- Privacy and compliance documentation
- Therapist dashboard design
- Data export formats and protocols

---

## Frontend Architecture Prompt #6: Security & Privacy Architecture

**Task**: Design the security and privacy architecture for 18+ content protection:

1. **Age Verification Architecture**
   - Multi-factor age verification systems
   - Age-gate bypass protection
   - Regional compliance (GDPR, CCPA, etc.)
   - Privacy-preserving verification methods

2. **Content Protection**
   - NSFW content filtering and access control
   - Screenshot prevention and DRM
   - Legal compliance and audit trails
   - Emergency lockdown protocols

3. **Data Privacy**
   - Local-first data storage with optional encryption
   - Zero-knowledge analytics
   - User-controlled data export and deletion
   - Privacy-by-design architecture

**Deliverables**:
- Age verification architecture
- Content protection system design
- Privacy compliance matrix
- Security audit checklist
- Emergency response protocols
