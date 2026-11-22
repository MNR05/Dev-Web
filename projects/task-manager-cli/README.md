# Task Manager CLI

**Problem:** Save and track small tasks without a cloud service or UI dependencies.

**Features:** Add, list and complete tasks. JSON is written to a temporary file and renamed to reduce partial-write corruption.

```bash
node cli.js --file ./tasks.json add "Review project documentation"
node cli.js --file ./tasks.json list
node cli.js --file ./tasks.json complete YOUR-UUID
```

**Limitations:** Single-user and no concurrent-write locking. Use SQLite or PostgreSQL for multi-user use.
