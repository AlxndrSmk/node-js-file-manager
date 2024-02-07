import fs from 'fs';
import os from 'os';
import { access, constants, unlink } from 'node:fs';
import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';

const copyFile = async (input) => {
  const isMove = input.split(' ')[0] === 'mv';
  const oldPath = input.split(' ')[1];
  const newPath = input.split(' ')[2];

  if (!oldPath?.startsWith('/') || !newPath?.startsWith('/')) {
    console.log(os.EOL + 'Please, enter absolute path to file.');
    showCurrentDir();
    showPrompt();
  } else {
    access(oldPath, constants.F_OK, async (err) => {
      if (err) {
        console.log(`
File '${oldPath.split('/').pop()}' does not exists.`);
        showCurrentDir();
        showPrompt();
      } else {
        const readableStream = fs.createReadStream(oldPath);
        const writableStream = fs.createWriteStream(newPath);

        readableStream.pipe(writableStream);

        readableStream.on('err', (err) => {
          console.log('Error reading file:', err);
          showCurrentDir();
          showPrompt();
        });

        writableStream.on('err', (err) => {
          console.log('Error writing file:', err);
          showCurrentDir();
          showPrompt();
        });

        writableStream.on('finish', async () => {
          if (isMove) {
            try {
              await unlink(oldPath, (err) => {
                if (err) {
                  console.log('Error removing old file: ', err);
                }
              });
              console.log(os.EOL + 'File moved successfully.');
            } catch (err) {
              console.log('Error removing old file: ', err);
            } finally {
              showCurrentDir();
              showPrompt();
            }
          } else {
            console.log(os.EOL + 'File copied successfully!');
            showCurrentDir();
            showPrompt();
          }
        });
      }
    });
  }
};

export default copyFile;
