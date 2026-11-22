import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { signPayload, verifyPayload } from '../projects/webhook-signature/index.js';
import { summarizeJsonLines } from '../projects/log-insights/index.js';
import { loadTasks, addTask, completeTask } from '../projects/task-manager-cli/task-store.js';

test('webhook signature accepts correct payload, rejects tampered data', () => {
  const secret = 'a-dedicated-very-long-demo-secret';
  const signature = signPayload('{"a":1}', secret);
  assert.equal(verifyPayload('{"a":1}', secret, signature), true);
  assert.equal(verifyPayload('{"a":2}', secret, signature), false);
  assert.equal(verifyPayload('{"a":1}', secret, 'wrong'), false);
});

test('log insights counts HTTP errors and malformed lines', () => {
  const result = summarizeJsonLines('{"status":200,"durationMs":10}\n{"status":503,"durationMs":80}\nnot-json\n');
  assert.equal(result.requests, 2);
  assert.equal(result.errors, 1);
  assert.equal(result.malformed, 1);
  assert.equal(result.p95Ms, 80);
});

test('task CLI data layer saves and completes a task', async () => {
  const folder = await mkdtemp(join(tmpdir(), 'task-labs-'));
  try {
    const file = join(folder, 'tasks.json');
    const task = await addTask(file, 'Write documentation');
    assert.equal((await loadTasks(file)).length, 1);
    const done = await completeTask(file, task.id);
    assert.equal(done.completed, true);
  } finally { await rm(folder, { recursive: true, force: true }); }
});
