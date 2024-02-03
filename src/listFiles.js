import fs from 'fs';
import path from 'path';
import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';
import errorCodes from './errorCodes.js';

const listFiles = async (dirPath) => {
  try {
    const files = await fs.promises.readdir(dirPath);

    const sortedFiles = files.sort((a, b) => {
      const aStats = fs.lstatSync(path.join(dirPath, a));
      const bStats = fs.lstatSync(path.join(dirPath, b));
      if (aStats.isDirectory() !== bStats.isDirectory()) {
        return aStats.isDirectory() ? -1 : 1;
      }
      return a.localeCompare(b);
    });

    const tableData = sortedFiles.map((file) => ({
      name: file,
      type: fs.lstatSync(path.join(dirPath, file)).isDirectory()
        ? 'directory'
        : 'file',
    }));
    console.table(tableData, ['name', 'type']);
    showCurrentDir();
    showPrompt();
  } catch (err) {
    if (err.code in errorCodes) {
      console.log(`Error listing files: ${errorCodes[err.code]}.`);
    } else {
      console.log(err);
    }
    showCurrentDir();
    showPrompt();
  }
};

export default listFiles;
