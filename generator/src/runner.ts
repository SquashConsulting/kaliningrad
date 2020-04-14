import fs from 'fs';
import path from 'path';
import yargs from 'yargs';

import { IConfig } from 'interfaces';

import clone from 'services/git';
import bootstrap from 'services/templates';

const generateProjectPath = (projectName: string): string => {
  const cwd = process.cwd();
  const projectPath = path.join(cwd, projectName);

  const nameTaken = fs.existsSync(projectPath);
  if (!nameTaken) return projectPath;

  const isDirectory = fs.lstatSync(projectPath).isDirectory();
  if (!isDirectory) return projectPath;

  throw new Error(`A directory with the name "${projectName}" already exists.`);
};

export default async (argv: yargs.Arguments<IConfig>): Promise<void> => {
  const graph: Kaliningrad.Graph = argv.config;
  const projectName = argv._[argv._.length - 1];

  const destination = generateProjectPath(projectName);

  await clone(destination);
  bootstrap(destination, graph);
};
