export default (initialValue: any, ...fns: Function[]): any =>
  fns.reduce((prev: any, nextFn: Function): any => nextFn(prev), initialValue);
