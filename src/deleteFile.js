import { unlink } from 'node:fs';
import os from 'os';
import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';

const deleteFile = async (input) => {
  const path = input.split(' ')[1];

  if (!path?.startsWith('/')) {
    console.log(os.EOL + 'Please, enter absolute path to file.');
    showCurrentDir();
    showPrompt();
  } else {
    try {
      await unlink(path, (err) => {
        if (err) {
          console.log('Error deleting file: ', err);
        }
      });
      console.log(os.EOL + 'File delete successfully.');
    } catch (err) {
      console.log('Error occured: ', err);
    } finally {
      showCurrentDir();
      showPrompt();
    }
  }
};

export default deleteFile;
