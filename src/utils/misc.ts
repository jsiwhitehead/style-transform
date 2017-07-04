export const undefOrNull = x => x === null || x === undefined;

export const isObject = (v: any) =>
  Object.prototype.toString.call(v) === '[object Object]';

export const flatten = <T>(array: (T[] | T | undefined)[]) =>
  array.reduce<T[]>((res, v) => res.concat(v || []), []);

const uniqueFromArray = <T>(array: T[]) => Array.from(new Set(array));
export const unique = <T>(array: (T[] | T | undefined)[]) =>
  uniqueFromArray(flatten(array));
