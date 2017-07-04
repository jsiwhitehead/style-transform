const emptyObj = Object.create(null);

const memoizeObjectFunc = <T extends (obj: any) => any>(func: T): T => {
  const objCache = new WeakMap();
  const strCache = new Map();

  return ((obj: any = emptyObj) => {
    if (objCache.has(obj)) return objCache.get(obj);

    const str = JSON.stringify(obj);
    if (strCache.has(str)) {
      const result = strCache.get(str);
      objCache.set(obj, result);
      return result;
    }

    const result = func(obj);

    objCache.set(obj, result);
    strCache.set(str, result);

    return result;
  }) as any;
};

export const memoizeFunc = <
  T extends (...args: any[]) => any,
  U extends (...args: any[]) => any
>(
  func: T,
  keyFunc?: U | true,
): T => {
  if (keyFunc === true) return memoizeObjectFunc(func);

  const funcCache = keyFunc ? new Map<any, any>() : new WeakMap<any, any>();
  const kFunc = keyFunc || ((...args) => args[0] || emptyObj);

  return ((...args: any[]) => {
    const key = kFunc(...args);

    if (funcCache.has(key)) return funcCache.get(key);

    const result = func(...args);
    funcCache.set(key, result);

    return result;
  }) as any;
};
