## Project Status

**Current release:** `v0.1.0 — Birth`
**Current milestone:** `v0.1 — First functional ULTRON` ✅
**Next milestone:** `v0.2 — Home`

ULTRON v0.1.0 establishes the first functional baseline of the project: a locally executable Core, text interaction, a basic Command Center, configuration and logging, automated tests, and the first real read-only tool.

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
- ✅ Dependency injection of LLM and tool providers
- ✅ Environment-based Core configuration
- ✅ Typed configuration validation with Pydantic Settings
- ✅ LLM provider selection through environment variables
- ✅ Local `.env` support with versioned `.env.example`
- ✅ Configurable Core logging
- ✅ Log levels controlled through environment variables
- ✅ Automated Core tests with pytest
- ✅ Short local Core command through `uv run ultron`
- ✅ Command Center Core URL configured through environment variables
- ✅ First real ULTRON tool: system status
- ✅ CPU, memory, disk and uptime telemetry
- ✅ `/system_status` endpoint
- ✅ System status available to the Orchestrator without unnecessary LLM calls
- ✅ System status telemetry in the Command Center
- ✅ ULTRON Core deployment on Vercel

### v0.1 — Birth ✅

**Released as:** `v0.1.0`

Objective: establish the first functional ULTRON running on a computer.

Completed capabilities:

- ✅ Core running locally
- ✅ Text chat
- ✅ Basic Command Center
- ✅ Configuration and logging
  - ✅ Local environment configuration
  - ✅ Typed configuration validation
  - ✅ Configurable log levels
  - ✅ Core flow logging

- ✅ First real tool
  - ✅ System status provider abstraction
  - ✅ CPU, memory, disk and uptime telemetry
  - ✅ Dedicated `/system_status` endpoint
  - ✅ Orchestrator integration
  - ✅ Automated coverage

- ✅ Defined repository structure

Additional development infrastructure already available:

- ✅ Automated Core tests
- ✅ Replaceable provider architecture
- ✅ Dependency injection
- ✅ Public Core deployment for development/demo purposes
- ✅ Command Center system telemetry

**Milestone status:** Completed.

### Next milestone — v0.2 Home

The next milestone focuses on connecting ULTRON to the physical home environment.

Planned capabilities include:

- ⏳ Home Assistant integration
- ⏳ Reading device and sensor states
- ⏳ First authorized home actions
- ⏳ Automation authorization policies
- ⏳ Evaluation of Echo Pop integration in a real environment

Other technical improvements, such as a real LLM provider, additional testing, deployment improvements, and broader observability, may be developed incrementally when they support a concrete project requirement.
