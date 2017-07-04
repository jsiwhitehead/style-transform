import { memoizeFunc } from '../../src/utils/memoize';

describe('utils: memoize', () => {
  test('memoize function with single argument', () => {
    let numCalls = 0;
    const addY = memoizeFunc((o?) => {
      numCalls += 1;
      return { ...o || {}, y: 1 };
    });

    addY();
    expect(addY()).toEqual({ y: 1 });
    expect(numCalls).toBe(1);

    const obj = { x: 1 };
    addY(obj);
    expect(addY(obj)).toEqual({ x: 1, y: 1 });
    expect(numCalls).toBe(2);
  });

  test('memoize function with multiple arguments', () => {
    let numCalls = 0;
    const addNums = memoizeFunc(
      (...nums) => {
        numCalls += 1;
        return nums.reduce((res, n) => res + n, 0);
      },
      (...nums) => nums.map(n => `${n}`).join('.'),
    );

    addNums(1, 2, 3);
    expect(addNums(1, 2, 3)).toEqual(6);
    expect(numCalls).toBe(1);
  });
});
