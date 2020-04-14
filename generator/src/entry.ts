import yargs from 'yargs';

import { IConfig } from 'interfaces';

import generateProject from 'runner';
import check from 'utils/argumentValidator';
import processFile from 'utils/fileProcessor';

const argv: yargs.Arguments<IConfig> = yargs
  .scriptName('kaliningrad')
  .usage('Usage: $0 <command> [options]')
  .command('generate', 'generates a project with given configuration')
  .example(
    '$0 generate -f kaliningrad.json user_service',
    'generates a new project with given configs in the specified directory',
  )
  .alias('config', 'c')
  .nargs('config', 1)
  .describe('config', 'Loads a Kaliningrad configuration file')
  .demandCommand(1)
  .demandOption(['config'])
  .check(check)
  .coerce('config', processFile)
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2020 @ Squash Consulting').argv;

generateProject(argv);
