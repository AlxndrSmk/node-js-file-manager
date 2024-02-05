import process from 'process';
import { stdin } from 'node:process';
import os from 'os';
import path from 'path';
import fs from 'fs';

import listFiles from './listFiles.js';
import showPrompt from './showPrompt.js';
import readFile from './readFile.js';
import createFile from './createFile.js';
import renameFile from './renameFile.js';
import copyFile from './copyFile.js';
import deleteFile from './deleteFile.js';
import operationSystem from './operationSystem.js';
import calcHash from './calcHash.js';

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
  stdin.on('data', async (data) => {
    const input = data.toString().trim();

    if (input === '.exit') {
      printGoodbye();
      process.exit();
    } else if (input === 'ls') {
      listFiles(currentDir);
    } else if (input.split(' ')[0] === 'cd') {
      const pathToDirectory = input.split(' ')[1];
      let tempDir;

      if (pathToDirectory.startsWith(homeDir)) {
        tempDir = pathToDirectory;
      } else {
        tempDir = path.join(currentDir, pathToDirectory);
      }

      try {
        if (fs.statSync(tempDir).isDirectory()) {
          currentDir = tempDir;
          showCurrentDir();
          showPrompt();
        } else {
          console.log('This is not a directory.');
        }
      } catch {
        console.log("Directory doesn't exist.");
      }

      showCurrentDir();
      showPrompt();
    } else if (input === 'up') {
      const parentDir = currentDir.split('/').slice(0, -1).join('/');
      currentDir = parentDir;
      if (parentDir === homeDir.split('/').slice(0, -1).join('/')) {
        currentDir = homeDir;
      }
      showCurrentDir();
      showPrompt();
    } else if (input.split(' ')[0] === 'cat') {
      readFile(input, currentDir);
    } else if (input.split(' ')[0] === 'add') {
      await createFile(currentDir, input);
    } else if (input.split(' ')[0] === 'rn') {
      await renameFile(input);
    } else if (input.split(' ')[0] === 'cp') {
      await copyFile(input);
    } else if (input.split(' ')[0] === 'mv') {
      await copyFile(input);
    } else if (input.split(' ')[0] === 'rm') {
      await deleteFile(input);
    } else if (input.split(' ')[0] === 'os') {
      operationSystem(input);
    } else if (input.split(' ')[0] === 'hash') {
      calcHash(input);
    } else {
      console.log(os.EOL + 'Unknown command.');
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
