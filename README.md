# **Product Requirements Document (PRD)**

### **Axon v0.2 – Deterministic CLI AI Dashboard for Developers & Engineers**

---

## 0. Executive Summary

Axon is a **terminal-native AI control-plane** that lets software and data engineers run deterministic, schema-validated AI tools and multi-step flows from a single CLI dashboard (`axon dash`) or an HTTP API (`/call`, `/speak`). v0.2 focuses on day-to-day developer tasks—code review, dependency risk, infra drift, RAG search, and data-quality checks—while guaranteeing **same input → same output** through explicit seeds, 0-temperature LLM calls, and SHA-256 output hashing.

---

## 1. Problem Statement

*Developers juggle lint, tests, docs, infra plans, CVE scans, data profiling, and AI helpers—each with its own CLI or SaaS. Nothing stitches them together deterministically inside the terminal.*

---

## 2. Goals & Non-Goals

|         | **Goals (v0.2)**                                                 | **Non-Goals**                                   |
| ------- | ---------------------------------------------------------------- | ----------------------------------------------- |
| **G-1** | Natural-language → deterministic tool/flow routing.              | Full conversational memory (post-v0.3).         |
| **G-2** | Ship **15 AI tools** and **4 opinionated flows** for developers. | Artistic image generation (beyond MVP SD demo). |
| **G-3** | Fastify daemon + SSE streams; usable as GitHub Action.           | Multi-user auth / RBAC.                         |
| **G-4** | Replay & hash verification (`axon replay`).                      | On-device model training.                       |

---

## 3. Personas

| Persona           | Needs                                      | Example Tasks                      |
| ----------------- | ------------------------------------------ | ---------------------------------- |
| **Dev Lead Lena** | Fast PR diff summary, generate unit tests. | `axon flow pr-review $(git diff)`  |
| **DevOps Oscar**  | Detect infra drift & CVEs before deploy.   | `axon flow security-audit`         |
| **Data Eng Dana** | Profile CSV & flag anomalies for BI.       | `axon flow data-contract file.csv` |

---

## 4. Features (Scope v0.2)

### 4.1 CLI / Dashboard

* `axon dash` Ink UI with prompt, live stream, history, task list.
* Hotkeys: **t** (tool list), **l** (task list), **Esc** (cancel), **:inject**.

### 4.2 Interpreter Engine

* Regex intent map → GPT-4o fallback (`temperature=0`).
* Builds **Axon Call Message (ACM)**; enforces seeds for generative tools.
* Logs ACM + output with SHA-256.

### 4.3 Runtimes

* `bash-run.sh`, `ts-fn-run.ts`, `py-fn-run.py` (venv).
* Sandbox: Bubblewrap, Node policy, venv `--no-net`.

### 4.4 Tools (new set)

* **lint-typescript**, **format-markdown**, **pr-summarise**, **test-autogen**,
  **vuln-scan**, **sbom-generate**, **infra-drift**, **rag-index**, **rag-query**,
  **data-profile**, **outlier-detect**, **code-explain**, **commit-msg**,
  **code-refactor**, **schema-from-sql**.

### 4.5 Flows

* **pr-review**, **security-audit**, **infra-check**, **data-contract**.

### 4.6 API

* `POST /call` – deterministic ACM.
* `POST /speak` – NL → router → ACM.
* `GET  /stream/:taskId` – SSE tokens/binary.

### 4.7 Replay & Cache

* Disk cache keyed by hash of `{tool,args,seed,flowVersion}`.
* `axon replay session-*.json --strict` verifies hashes.

---

## 5. Technical Stack

| Layer       | Choice                      | Reason                                 |
| ----------- | --------------------------- | -------------------------------------- |
| HTTP daemon | **Fastify 4**               | >75 k req/s, lightweight.              |
| TUI         | **Ink + ink-gradient**      | React-like dev-speed.                  |
| LLM         | **Vercel AI SDK (GPT-4o)**  | 0-temp; can swap to local.             |
| JSON Schema | **Ajv 8**                   | µs-level validation.                   |
| Code AST    | **ts-morph**                | Compile-safe refactors.                |
| Security    | **Syft, Trivy, Bubblewrap** | Reproducible SBOM & CVEs.              |
| RAG         | **LlamaIndex + Haystack**   | Embedding + retriever = deterministic. |

---

## 6. Success Metrics

| Metric                                  | Target                     |
| --------------------------------------- | -------------------------- |
| CLI TTFB for `axon run summarize`       | < 800 ms on laptop.        |
| Dashboard prompt→token latency          | < 250 ms first token.      |
| Re-run hash mismatch rate               | < 0.1 % across CI suites.  |
| New tool scaffold time                  | < 2 mins incl. manifest.   |
| Daily active CLI users (internal pilot) | ≥ 8 engineers by sprint 3. |

---

## 7. Milestones & Timeline

| Sprint          | Deliverable                                                        |
| --------------- | ------------------------------------------------------------------ |
| **S1 (1 wk)**   | Repo scaffold, Ajv validator, three hello tools, Fastify skeleton. |
| **S2 (1 wk)**   | Ink dashboard, interpreter regex+GPT router.                       |
| **S3 (1.5 wk)** | Runtime bridges, deterministic seeds, ACM spec locked.             |
| **S4 (1 wk)**   | All 15 tools implemented & unit-tested.                            |
| **S5 (0.5 wk)** | 4 flows compiled; replay & cache layer.                            |
| **S6 (0.5 wk)** | Docs, GIF, quickstart; internal pilot.                             |

*Total ≈ 5.5 weeks.*

---

## 8. Risks & Mitigations

| Risk                                  | Mitigation                                                             |
| ------------------------------------- | ---------------------------------------------------------------------- |
| GPT fallback still mis-routes         | Confidence threshold 0.7 → ask user; router unit tests.                |
| Tool runtime escapes sandbox          | Bubblewrap, `node --experimental-policy`, venv `--no-net`.             |
| Seed omission causing non-determinism | Ajv rule: generative tools require `seed`; executor refuses otherwise. |
| Large LLM cost                        | Default to GPT-4o-mini; allow local CodeLlama via environment flag.    |

---

## 9. Open Questions

1. Ship default local embeddings model or require OpenAI embeds?
2. Export dashboard as web (Tauri/electron) or stay pure TTY?
3. Need RBAC/JWT before public release or in v0.3?

---

### Ready for engineering kick-off

If approved, sprint S1 begins with repo bootstrap (`pnpm create axon`) and scaffold of **lint-typescript** plus **summarize** tool to prove deterministic hashes.
