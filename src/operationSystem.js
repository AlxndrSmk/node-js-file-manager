import os from 'os';
import showPrompt from './showPrompt.js';
import { showCurrentDir } from './index.js';

const operationSystem = (input) => {
  const command = input.split(' ')[1];

  switch (command) {
    case '--EOL':
      console.log(os.EOL + 'Your system EOL is: ' + JSON.stringify(os.EOL));
      break;

    case '--cpus':
      console.log(os.EOL + 'Overall CPUS amount: ' + os.cpus().length + '.');
      const info = os.cpus().map((cpu) => ({
        Model: cpu.model.split(' ')[0],
        'Clock rate (GHz)': (cpu.speed / 1000).toFixed(2),
      }));
      console.table(info, ['Model', 'Clock rate (GHz)']);
      break;

    case '--homedir':
      console.log(os.EOL + 'Your home directory is ' + os.homedir());
      break;

    case '--username':
      console.log(
        os.EOL + 'Your system user name is ' + os.userInfo().username
      );
      break;

    case '--architecture':
      console.log(
        os.EOL +
          'CPU architecture for which Node.js binary has compiled: ' +
          os.arch()
      );
      break;

    default:
      console.log(os.EOL + 'Unknown command.');
  }

  showCurrentDir();
  showPrompt();
};

export default operationSystem;
