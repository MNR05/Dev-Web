import { readFile } from 'node:fs/promises';
import { summarizeJsonLines } from './index.js';
const path = process.argv[2];
if (!path) {
  console.error('Usage: node cli.js requests.jsonl');
  process.exitCode = 1;
} else {
  readFile(path, 'utf8')
    .then((text) => console.log(JSON.stringify(summarizeJsonLines(text), null, 2)))
    .catch((error) => { console.error(error.message); process.exitCode = 1; });
}
