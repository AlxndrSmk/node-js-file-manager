import process from 'process';

const args = process.argv.slice(2);
let username;

args.map((el) => {
  if (el.startsWith('--')) {
    username = el.split('=')[1];
    console.log(`Welcome to the File Manager, ${username}!`);
  }
});

process.stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  }
});

process.on('SIGINT', () => {
  console.log(`
Thank you for using File Manager, ${username}, goodbye!`);

  process.exit();
});
