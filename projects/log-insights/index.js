export function summarizeJsonLines(text) {
  const durations = [];
  const byStatus = {};
  let total = 0;
  let malformed = 0;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    let row;
    try { row = JSON.parse(line); } catch { malformed += 1; continue; }
    if (!Number.isInteger(row.status) || row.status < 100 || row.status > 599 ||
      typeof row.durationMs !== 'number' || !Number.isFinite(row.durationMs) || row.durationMs < 0) {
      malformed += 1;
      continue;
    }
    total += 1;
    byStatus[row.status] = (byStatus[row.status] ?? 0) + 1;
    durations.push(row.durationMs);
  }
  durations.sort((a, b) => a - b);
  const p95Index = Math.max(0, Math.ceil(durations.length * 0.95) - 1);
  return {
    requests: total, malformed,
    errors: Object.entries(byStatus).reduce((sum, [status, count]) => sum + (Number(status) >= 500 ? count : 0), 0),
    byStatus,
    p95Ms: durations.length ? durations[p95Index] : null,
    averageMs: durations.length ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length * 100) / 100 : null
  };
}
