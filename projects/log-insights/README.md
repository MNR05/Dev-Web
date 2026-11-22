# Log Insights

**Problem:** Find quick operational signals from structured API request logs.

**Input:** JSON Lines with `status` (HTTP integer) and `durationMs` (non-negative number).

```bash
node cli.js sample.jsonl
```

**Output:** Valid requests, malformed lines, 5xx errors, status distribution, average latency and nearest-rank p95.

**Trade-off:** Reads a whole file into memory; for multi-GB logs consider a streaming parser.
