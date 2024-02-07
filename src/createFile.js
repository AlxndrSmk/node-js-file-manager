import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';

const content = '';

const createFile = async (currentDir, input) => {
  const fileName = input.split(' ')[1];

  try {
    await fs.writeFile(path.join(currentDir, fileName), content, {
      flag: 'wx',
    });
    console.log(`
File '${fileName}' created at ${currentDir}`);
    showCurrentDir();
    showPrompt();
  } catch (err) {
    console.log(err);
  }
};

export default createFile;
