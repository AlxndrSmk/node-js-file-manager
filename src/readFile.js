import fs from 'fs';
import path from 'path';
import { showCurrentDir } from './index.js';
import showPrompt from './showPrompt.js';

const readFile = (input, currentDir) => {
  const name = input.split(' ')[1];

  if (name.startsWith('.')) {
    console.log("\nSystem files can't be read.");
    showCurrentDir();
    showPrompt();
  } else {
    const pathToFile = path.join(currentDir, name);

    const readable = fs.createReadStream(pathToFile);

    readable.on('readable', () => {
      let chunk;

      while (null !== (chunk = readable.read())) {
        console.log(`${chunk}`);
        console.log(`\nFile '${name}' read successfully.`);
        showCurrentDir();
        showPrompt();
      }
    });

    readable.on('error', (error) => {
      console.error('Error occurred:', error.message);
      showCurrentDir();
      showPrompt();
    });
  }
};

export default readFile;
