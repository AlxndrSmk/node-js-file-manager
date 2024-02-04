import * as fsPromises from 'fs/promises';
import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';
import { access, constants } from 'node:fs';
import path from 'path';

const renameFile = async (input) => {
  const oldPath = input.split(' ')[1];
  const fileName = input.split(' ').pop();
  const newPath = path.join(
    oldPath.split('/').slice(0, -1).join('/'),
    fileName
  );

  if (!oldPath.startsWith('/')) {
    console.log('\nPlease, enter absolute path to file.');
    showCurrentDir();
    showPrompt();
  } else {
    access(oldPath, constants.F_OK, async (err) => {
      if (err) {
        console.log(`
            File '${oldPath.split('/').pop()}' does not exists.`);
      } else {
        await fsPromises.rename(oldPath, newPath);
        console.log('\nFile renamed succesfully');
      }
      showCurrentDir();
      showPrompt();
    });
  }
};

export default renameFile;
