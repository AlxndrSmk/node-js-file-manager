import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';
import fs from 'fs';
import os from 'os';
import crypto from 'crypto';

const calcHash = async (input) => {
  const path = input.split(' ')[1];

  if (!path?.startsWith('/')) {
    console.log(os.EOL + 'Please, enter absolute path to file.');
    showCurrentDir();
    showPrompt();
  } else {
    const fd = fs.createReadStream(path);
    const hash = crypto.createHash('sha1');
    hash.setEncoding('hex');

    fd.on('end', () => {
      hash.end();
      console.log('Hash: ' + hash.read());
      showCurrentDir();
      showPrompt();
    });

    fd.pipe(hash);
  }
};

export default calcHash;
