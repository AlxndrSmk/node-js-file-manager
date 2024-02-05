import fs from 'fs';
import path from 'path';
import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';
import errorCodes from './errorCodes.js';

const listFiles = async (dirPath) => {
  try {
    const files = await fs.promises.readdir(dirPath);
    if (files.length) {
      const sortedFiles = await Promise.all(
        files.map(async (file) => {
          const stats = await fs.promises.lstat(path.join(dirPath, file));
          return {
            name: file,
            type: stats.isDirectory() ? 'directory' : 'file',
          };
        })
      );

      sortedFiles.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

      console.table(sortedFiles, ['name', 'type']);
    } else {
      console.log('Folder is empty.');
    }
  } catch (err) {
    if (err.code in errorCodes) {
      console.log(`Error listing files: ${errorCodes[err.code]}.`);
    } else {
      console.log(err);
    }
  }

  showCurrentDir();
  showPrompt();
};

export default listFiles;
