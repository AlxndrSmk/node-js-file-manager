import process from 'process';
import { cwd, stdin } from 'node:process';

const args = process.argv.slice(2);
let username;

const showCurrentDirectory = () => console.log(`You are currently in ${cwd()}`);
const sayGoodbye = () =>
  console.log(`
Thank you for using File Manager, ${username}, goodbye!`);

args.map((el) => {
  if (el.startsWith('--')) {
    username = el.split('=')[1];
    console.log(`Welcome to the File Manager, ${username}!`);
  }
});
showCurrentDirectory();

stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input === '.exit') {
    sayGoodbye();
    process.exit();
  } else {
    showCurrentDirectory();
  }
});

process.on('SIGINT', () => {
  sayGoodbye();
  process.exit();
});
