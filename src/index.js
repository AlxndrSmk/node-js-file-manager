import process from 'process';
import { stdin } from 'node:process';
import os from 'os';
import path from 'path';
import fs from 'fs';

import listFiles from './listFiles.js';
import showPrompt from './showPrompt.js';

const args = process.argv.slice(2);
let username;
const homeDir = os.homedir();
let currentDir = homeDir;

const showHomeDir = () => console.log(`You are currently in ${homeDir}`);
export const showCurrentDir = () =>
  console.log(`You are currently in ${currentDir}`);
const printGoodbye = () =>
  console.log(`
Thank you for using File Manager, ${username}, goodbye!`);
const printGreeting = () => {
  args.map((el) => {
    if (el.startsWith('--')) {
      username = el.split('=')[1];
      console.log(`Welcome to the File Manager, ${username}!`);
    }
  });
};

const handleExit = () => {
  stdin.on('data', (data) => {
    const input = data.toString().trim();

    if (input === '.exit') {
      printGoodbye();
      process.exit();
    } else if (input === 'ls') {
      listFiles(currentDir);
      // showCurrentDir();
    } else if (input.startsWith('cd')) {
      try {
        const pathToDirectory = input.split(' ')[1];
        const testDir = path.join(currentDir, pathToDirectory);
        if (fs.statSync(testDir).isDirectory()) {
          currentDir = path.join(currentDir, pathToDirectory);
          showCurrentDir();
          showPrompt();
        } else {
          console.log('This is not a directory.');
          showCurrentDir();
          showPrompt();
        }
      } catch {
        console.log("Directory doesn't exist.");
        showCurrentDir();
        showPrompt();
      }
    } else {
      showCurrentDir();
      showPrompt();
    }
  });

  process.on('SIGINT', () => {
    printGoodbye();
    process.exit();
  });
};

const app = () => {
  printGreeting();
  showHomeDir();
  showPrompt();
  handleExit();
};

app();
