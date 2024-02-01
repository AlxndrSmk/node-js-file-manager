import process from 'process';

const args = process.argv.slice(2);

args.map((el) => {
  if (el.startsWith('--')) {
    const username = el.split('=')[1];
    console.log(`Welcome to the File Manager, ${username}!`);
  }
});
