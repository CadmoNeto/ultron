# ULTRON

> A modular personal AI assistant inspired by JARVIS, built incrementally with real-world technologies.

ULTRON is a personal engineering project focused on progressively building a real AI assistant capable of understanding context, interacting through multiple interfaces, and eventually performing authorized actions in digital and physical environments.

Rather than treating the assistant as a single AI model, ULTRON is designed as a **modular system** composed of a central Core, interfaces, LLM providers, tools, security policies, memory, event handling, voice, and future IoT integrations.

The project prioritizes **working software, modularity, observability, security, and incremental development** over speculative features.

## Project Status

**Current project phase:** `v0.0 — Foundation & Architecture`
**Next milestone:** `v0.1 — First functional ULTRON`

### Currently implemented

- ✅ Python-based ULTRON Core
- ✅ FastAPI HTTP server
- ✅ `/health` endpoint
- ✅ Text chat API with validated request/response contracts
- ✅ React + TypeScript Command Center
- ✅ Command Center ↔ Core communication
- ✅ Live Core online/offline monitoring
- ✅ Text interaction through the Command Center
- ✅ Input validation and duplicate-send protection
- ✅ Orchestrator separated from the HTTP layer
- ✅ Asynchronous LLM abstraction
- ✅ Swappable LLM provider architecture
- ✅ Fake LLM provider for deterministic development and testing
- ✅ Dependency injection of the LLM implementation
- ✅ Environment-based Core configuration
- ✅ Typed configuration validation with Pydantic Settings
- ✅ LLM provider selection through environment variables
- ✅ Local `.env` support with versioned `.env.example`

### Next

- ⏳ Structured logging
- ⏳ Real LLM provider integration
- ⏳ First real ULTRON tool
- ⏳ Additional Core tests and diagnostics

## Architecture

ULTRON is designed around a centralized Core with replaceable components.

```text
┌──────────────────────────┐
│      Command Center      │
│   React + TypeScript     │
└────────────┬─────────────┘
             │
             │ HTTP
             ▼
┌──────────────────────────┐
│       FastAPI Layer      │
│   HTTP + validation      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       Orchestrator       │
│  Core decision flow      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       LLM Protocol       │
│ Provider abstraction     │
└────────────┬─────────────┘
             │
             ▼
       ┌───────────┐
       │  FakeLLM  │
       └───────────┘
             │
             │ future providers
             ▼
      OpenAI / Local / ...
```

A request currently follows this flow:

```text
User
  ↓
Command Center
  ↓
POST /chat
  ↓
ChatRequest validation
  ↓
Orchestrator
  ↓
LLM abstraction
  ↓
Configured LLM provider
  ↓
ChatResponse
  ↓
Command Center
```

The important architectural constraint is that the **Orchestrator depends on the LLM contract, not on a specific AI vendor**.

This keeps the Core independent from individual providers and allows different implementations to be introduced without changing the HTTP API or orchestration layer.

## Core Configuration

ULTRON Core configuration is loaded from environment variables using **Pydantic Settings**.

The configuration layer is responsible for validating values before the application is assembled.

The current configuration flow is:

```text
Environment variables
        ↓
     Settings
        ↓
Provider configuration
        ↓
     main.py
        ↓
Concrete implementation
```

The currently supported LLM provider is:

```text
fake
```

If no provider is explicitly configured, ULTRON uses the fake provider by default for local development.

### Environment file

Copy the example environment file:

```bash
cd apps/core
```

Create a local `.env` based on:

```text
.env.example
```

Current example:

```env
ULTRON_LLM_PROVIDER=fake
```

The `.env` file is intentionally excluded from Git and must be used for local configuration and future secrets.

The `.env.example` file is versioned and documents the environment variables required to run the project.

Invalid configuration values cause the Core to fail during startup instead of silently falling back to an unexpected configuration.

## Repository Structure

```text
ultron/
├── apps/
│   ├── core/
│   │   ├── src/
│   │   │   └── ultron_core/
│   │   │       ├── api/
│   │   │       │   └── chat.py
│   │   │       │
│   │   │       ├── config/
│   │   │       │   └── settings.py
│   │   │       │
│   │   │       ├── llm/
│   │   │       │   ├── protocol.py
│   │   │       │   └── fake.py
│   │   │       │
│   │   │       ├── orchestrator/
│   │   │       │   └── chat.py
│   │   │       │
│   │   │       ├── __init__.py
│   │   │       └── main.py
│   │   │
│   │   ├── .env.example
│   │   ├── pyproject.toml
│   │   └── uv.lock
│   │
│   └── command-center/
│       ├── public/
│       ├── src/
│       ├── package.json
│       ├── package-lock.json
│       ├── eslint.config.js
│       └── vite.config.ts
│
├── .gitignore
└── README.md
```

Modules are intentionally introduced only when their responsibilities become necessary.

## Tech Stack

### ULTRON Core

- Python 3.12+
- FastAPI
- Pydantic
- Pydantic Settings
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

## Running Locally

### Requirements

Install:

- Python 3.12+
- uv
- Node.js
- npm

Clone the repository and enter the project directory.

### Configure the Core

The default development configuration already uses `FakeLLM`.

Optionally, create:

```text
apps/core/.env
```

based on:

```text
apps/core/.env.example
```

Example:

```env
ULTRON_LLM_PROVIDER=fake
```

### Start the ULTRON Core

```bash
cd apps/core
uv sync
uv run uvicorn ultron_core.main:app --reload --host 127.0.0.1 --port 8000
```

The Core will be available at:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/health
```

Interactive FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

### Start the Command Center

Open another terminal:

```bash
cd apps/command-center
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

The Command Center monitors the Core status and allows text interaction with ULTRON.

## Development Checks

### Command Center lint

```bash
cd apps/command-center
npm run lint
```

A successful ESLint run may finish without printing additional output.

### Command Center production build

```bash
npm run build
```

A successful build generates the production bundle without compilation errors.

## Current LLM Architecture

The Core does not directly depend on a specific AI provider.

Instead, the Orchestrator depends on an asynchronous LLM contract.

```text
Orchestrator
     │
     ▼
    LLM
     │
     ├── FakeLLM
     │
     ├── Real cloud provider        (future)
     │
     └── Local model provider       (future)
```

`FakeLLM` currently provides a deterministic implementation that allows the complete application flow to be developed without external API dependencies.

The provider is selected during application composition from the validated Core configuration.

This means the HTTP API and Orchestrator do not need to know how configuration is stored or which concrete provider is active.

A real LLM provider will be introduced without changing the existing LLM contract.

## Roadmap

ULTRON evolves through demonstrated capabilities rather than fixed deadlines.

### v0.1 — First functional ULTRON

Target capabilities:

- ✅ Core running locally
- ✅ Text chat
- ✅ Basic Command Center
- 🚧 Configuration and logging
  - ✅ Local configuration
  - ⏳ Structured logging

- ⏳ First real tool
- ✅ Defined repository structure

### v0.2 — Home

Home Assistant integration, device state reading, initial home actions, and automation authorization policies.

### v0.3 — Voice

Speech-to-text, text-to-speech, streaming, wake word support, and voice endpoints.

### v0.4 — Memory

Persistent preferences, entities, projects, previous decisions, and contextual retrieval.

### v0.5 — Proactivity

Events, scheduling, alerts, routines, prioritization, and notification control.

### v0.6 — Perception

Presence, environmental sensors, room context, and authorized visual perception.

### v0.7 — Agents & Computer

Specialized tools, multi-step workflows, assisted computer/browser operation, confirmations, and action auditing.

### v1.0 — ULTRON

An integrated and sustainable everyday assistant combining voice, memory, tools, home automation, contextual interfaces, security, and useful proactivity.

## Design Principles

ULTRON follows a few core engineering principles:

- Build small, demonstrable increments.
- Prefer working software before sophisticated architecture.
- Keep the system modular and components replaceable.
- Keep orchestration centralized in the ULTRON Core.
- Avoid unnecessary vendor lock-in.
- Prototype capabilities in software before purchasing hardware.
- Treat privacy and security as architectural requirements.
- Prefer reversible, observable, and auditable operations.
- Require explicit authorization for critical actions.
- Add complexity only when a real requirement justifies it.

## Long-Term Direction

The long-term goal is a multimodal personal assistant capable of combining:

```text
Text
Voice
Context
Memory
Tools
Events
Home automation
Sensors
Computer interaction
```

while keeping authorization, privacy, observability, and user control at the center of the system.

ULTRON is inspired by the concept of JARVIS from _Iron Man_, but the implementation is deliberately constrained to technologies that can actually be built and integrated today.

The objective is not to reproduce a fictional AI all at once.

It is to **engineer one capability at a time until the collection of working components becomes a useful personal intelligence system.**

---

**Status:** 🚧 Active development
