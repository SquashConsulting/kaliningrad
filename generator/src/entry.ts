import yargs from "yargs";

import { IConfig } from "interfaces";

import generateProject from "runner";
import processFile from "utils/fileProcessor";
import processArguments from "utils/argumentValidator";

/* CLI Application Definitions */

const argv: yargs.Arguments<IConfig> = yargs
  .scriptName("kaliningrad")
  .usage("Usage: $0 <command> [options]")
  .command("generate", "generates a project with given configuration")
  .example(
    "$0 generate --config graph.json my_awesome_startup",
    "generates a new project with the given name and configuration."
  )
  .alias("config", "c")
  .nargs("config", 1)
  .describe("config", "Loads a Kaliningrad configuration file")
  .demandCommand(1)
  .demandOption(["config"])
  .check(processArguments)
  .coerce("config", processFile)
  .help("h")
  .alias("h", "help")
  .epilog("copyright 2020 @ Squash Consulting").argv;

/* Main */

generateProject(argv);
