import { readFile, writeFile, rename, mkdir, unlink } from 'node:fs/promises';
import { dirname, basename, join } from 'node:path';
import { randomUUID } from 'node:crypto';

export async function loadTasks(path) {
  try {
    const tasks = JSON.parse(await readFile(path, 'utf8'));
    if (!Array.isArray(tasks)) throw new Error('Invalid task store');
    return tasks;
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function saveTasks(path, tasks) {
  const directory = dirname(path);
  await mkdir(directory, { recursive: true });
  const temp = join(directory, '.' + basename(path) + '.' + randomUUID() + '.tmp');
  try {
    await writeFile(temp, JSON.stringify(tasks, null, 2) + '\n', { mode: 0o600, flag: 'wx' });
    await rename(temp, path);
  } catch (error) {
    await unlink(temp).catch(() => {});
    throw error;
  }
}

export async function addTask(path, title) {
  title = String(title).trim();
  if (!title || title.length > 200) throw new Error('Task title must have 1-200 characters');
  const tasks = await loadTasks(path);
  const task = { id: randomUUID(), title, completed: false, createdAt: new Date().toISOString() };
  tasks.push(task);
  await saveTasks(path, tasks);
  return task;
}

export async function completeTask(path, id) {
  const tasks = await loadTasks(path);
  const task = tasks.find((item) => item.id === id);
  if (!task) throw new Error('Task not found');
  task.completed = true;
  await saveTasks(path, tasks);
  return task;
}
