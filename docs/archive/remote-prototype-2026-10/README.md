# Historical remote-prototype material

**Historical reference only — not current product, implementation, security, or agent guidance.**

These documents came from the pre-reconciliation remote prototype. They record earlier research, product proposals, technical assumptions, and agent conventions. They describe a different React 18 / Zustand / PWA / session-history direction and may contain proposals that were never implemented or approved. Do not treat them as current requirements, copy activity content into the application, or restore dependencies and behavior solely because they appear here.

The current repository instructions are in the root [AGENTS.md](../../../AGENTS.md). The current frontend experience and backend boundaries are in [the frontend specification](../../architecture/frontend-game-experience.md) and [the backend plan](../../architecture/backend-plan.md).

## Archived documents

The original project map, design documents, research notes, strategy prompts, and planning material are retained under [`docs/`](./docs/) for historical context. Their original relative organization is preserved where practical. The former `AGENTS.md` and `CLAUDE.md` are included as historical files and must not supersede the root instructions.

## Disposition of remote-only source modules

| Module | Disposition |
|---|---|
| `SessionBuilder` | **Adapted:** the useful configure-and-review idea is implemented in the current solo flow; unconnected role, wave, intensity, and duration controls are not carried forward. |
| Remote `SessionTimer` and timer hook | **Replaced:** one shared deadline-based timer engine is authoritative. The remote engine remains available in Git history. |
| `HistoryScreen` | **Deferred:** its browser-persisted session history is not imported. |
| `BallTeaseScreen` and explicit/multi-deck activity screens | **Deferred:** not part of the selected product flow or approved content scope. |
| `ConsentGate`, `Disclaimer`, and `AgeGate` | **Replaced:** use the existing consent-first onboarding, self-attested age gate, and privacy acknowledgement. The remote screens remain available in Git history. |
| Zustand store and remote types | **Replaced:** current UI/domain state uses the existing React state and focused pure helpers; no state library was added. |
| Audio and remote visual helpers | **Deferred:** not required for the connected session milestone. |
| Remote deck JSON files | **Deferred:** their content is not imported or approved for the selected experience. Original files remain available in Git history. |
| Remote PWA configuration and age-gate document | **Deferred:** installability and offline caching require a separate verified milestone. |

The reconciliation keeps the selected anonymous challenge content and its stable identifiers; it does not import the remote prototype's history, explicit deck content, or claims of partner synchronization.
