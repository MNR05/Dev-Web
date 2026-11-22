import { addTask, completeTask, loadTasks } from './task-store.js';

async function main(args) {
  let file = './tasks.json';
  if (args[0] === '--file') {
    file = args[1];
    args = args.slice(2);
  }
  if (!file) throw new Error('Missing --file value');
  const [command, ...values] = args;
  if (command === 'add') console.log(JSON.stringify(await addTask(file, values.join(' ')), null, 2));
  else if (command === 'complete') console.log(JSON.stringify(await completeTask(file, values[0]), null, 2));
  else if (command === 'list') console.log(JSON.stringify(await loadTasks(file), null, 2));
  else throw new Error('Usage: node cli.js [--file path] add TITLE | list | complete ID');
}
main(process.argv.slice(2)).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
