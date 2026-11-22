# JavaScript & Web Engineering Labs

Small, useful JavaScript projects focused on APIs, automation reliability, practical CLIs and data processing.

> **Provenance:** The exercises below were newly prepared in 2026 and have real GitHub commit dates. No claim is made that they were authored in 2018.

## Mini-projects

| Project | Problem solved | Engineering concepts |
| --- | --- | --- |
| [Webhook Signature](./projects/webhook-signature/) | Authenticate webhook payloads safely | HMAC-SHA256, constant-time comparison, input validation |
| [Task Manager CLI](./projects/task-manager-cli/) | Save and organize tasks offline | JSON storage, validation, atomic file replacement |
| [Log Insights](./projects/log-insights/) | Summarize API latency and errors from logs | JSONL parsing, statistics, resilience to bad input |

## Quick start

Node.js **20+**. No npm dependencies.

```bash
npm test
node projects/task-manager-cli/cli.js --file /tmp/tasks.json add "Prepare report"
node projects/task-manager-cli/cli.js --file /tmp/tasks.json list
node projects/log-insights/cli.js projects/log-insights/sample.jsonl
```

All examples are generic; no private services, data or credentials are included.
