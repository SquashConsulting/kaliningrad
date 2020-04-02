import yargs from 'yargs';

export default function(argv: yargs.Arguments): boolean {
  const length: number = argv._.length;
  if (length !== 2)
    throw new Error(
      `Incorrect number of arguments, expected 1 got ${length - 1}`,
    );

  return true;
}
