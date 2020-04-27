/* Exports */

export default pipe;

/* Module Functions */

function pipe(initialValue: any, ...fns: Function[]): any {
  return fns.reduce(
    (prev: any, nextFn: Function): any => nextFn(prev),
    initialValue,
  );
}
