# ULTRON

> A modular personal AI assistant inspired by JARVIS, built incrementally with real-world technologies.

ULTRON is a personal project focused on building a multimodal, persistent, and eventually proactive AI assistant capable of understanding context and performing authorized actions in both digital and physical environments.

The project is being developed incrementally, prioritizing **working software, modular architecture, security, observability, and real integrations** over purely conceptual features.

## Project Status

**Current phase:** `v0.0 — Foundation & Architecture`
**Next milestone:** `v0.1 — First functional ULTRON`

Currently implemented:

- ✅ Python-based ULTRON Core
- ✅ FastAPI HTTP server
- ✅ `/health` endpoint
- ✅ React + TypeScript Command Center
- ✅ Command Center ↔ Core communication
- ✅ Live Core online/offline status

Next:

- ⏳ Text chat interface
- ⏳ LLM integration
- ⏳ First real ULTRON tool
- ⏳ Configuration and structured logging

## Architecture

ULTRON is designed as a **modular system**, rather than a single AI model.

```text
                  ┌─────────────────────┐
                  │   Command Center    │
                  │ React + TypeScript  │
                  └──────────┬──────────┘
                             │
                         HTTP / WS
                             │
                  ┌──────────▼──────────┐
                  │     ULTRON Core     │
                  │ Python + FastAPI    │
                  └──────────┬──────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
          LLM Layer        Tools          Security
             │               │               │
             └───────────────┼───────────────┘
                             │
                    Future integrations
                 Home / Voice / Memory / IoT
```

The Core acts as the central orchestration layer, while interfaces, tools, memory, voice, automation, and physical devices remain separate components.

## Tech Stack

### Core

- Python
- FastAPI
- Uvicorn
- uv

### Command Center

- React
- TypeScript
- Vite
- ESLint

### Development

- Git
- GitHub
- VS Code

## Repository Structure

```text
ultron/
├── apps/
│   ├── core/
│   │   ├── src/
│   │   │   └── ultron_core/
│   │   ├── pyproject.toml
│   │   └── uv.lock
│   │
│   └── command-center/
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
│
├── .gitignore
└── README.md
```

The repository will evolve as new capabilities are introduced. Modules are intentionally added only when they become necessary.

## Running Locally

### Requirements

- Python
- uv
- Node.js
- npm

### Start the ULTRON Core

```bash
cd apps/core
uv run uvicorn ultron_core.main:app --reload --host 127.0.0.1 --port 8000
```

The Core will be available at:

```text
http://127.0.0.1:8000
```

Health endpoint:

```text
http://127.0.0.1:8000/health
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

### Start the Command Center

In another terminal:

```bash
cd apps/command-center
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

The Command Center should display whether the ULTRON Core is currently online.

## Roadmap

The project evolves by **capabilities rather than fixed deadlines**.

Planned stages include:

- `v0.1` — Core + Command Center
- `v0.2` — Home automation
- `v0.3` — Voice interaction
- `v0.4` — Persistent memory
- `v0.5` — Proactivity and event handling
- `v0.6` — Physical context and perception
- `v0.7` — Agents and computer interaction
- `v1.0` — Integrated everyday assistant

## Design Principles

- Build working capabilities before adding complexity.
- Prefer software prototypes before buying hardware.
- Keep components modular and replaceable.
- Keep orchestration centralized in the ULTRON Core.
- Treat security and privacy as architectural requirements.
- Prefer reversible and auditable actions.
- Require explicit authorization for critical actions.
- Avoid unnecessary vendor lock-in.

## Why ULTRON?

The project is inspired by the idea of JARVIS from _Iron Man_, but focuses exclusively on capabilities that can be built using currently available technologies.

The goal is not to simulate a fictional AI in a single step, but to progressively engineer a real personal assistant whose capabilities become more sophisticated over time.

---

**Status:** 🚧 Active development
