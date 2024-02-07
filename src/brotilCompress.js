import fs from 'fs';
import zlib from 'zlib';
import os from 'os';
import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';

const brotilCompress = async (input) => {
  const isCompress = input.split(' ')[0] === 'compress';
  const inputFilePath = input.split(' ')[1];
  const outputFilePath = input.split(' ')[2];

  if (!inputFilePath?.startsWith('/') || !outputFilePath?.startsWith('/')) {
    console.log(os.EOL + 'Please, enter absolute path to file.');
    showCurrentDir();
    showPrompt();
  } else {
    try {
      const readStream = fs.createReadStream(inputFilePath);
      const writeStream = fs.createWriteStream(outputFilePath);

      const compressor = isCompress
        ? zlib.createBrotliCompress()
        : zlib.createBrotliDecompress();

      readStream.pipe(compressor).pipe(writeStream);

      readStream.on('error', (err) => {
        console.log('Error reading file:', err);
        showCurrentDir();
        showPrompt();
      });

      compressor.on('error', (err) => {
        console.log(
          `Error ${isCompress ? `compressing` : `decompressing`} file: ${err}`
        );
        showCurrentDir();
        showPrompt();
      });

      writeStream.on('error', (err) => {
        console.log('Error writing compressed file:', err);
        console.log(
          `Error writing ${
            isCompress ? `compressed` : `decompressed`
          } file: ${err}`
        );
        showCurrentDir();
        showPrompt();
      });

      writeStream.on('finish', () => {
        console.log(
          `File ${
            isCompress ? `compression` : `decompression`
          } completed successfully.`
        );
        showCurrentDir();
        showPrompt();
      });
    } catch (err) {
      console.log(err);
      showCurrentDir();
      showPrompt();
    }
  }
};

export default brotilCompress;
