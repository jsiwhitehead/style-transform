import { flatten, isObject, undefOrNull, unique } from '../../src/utils/misc';

describe('utils: misc', () => {
  test('flatten', () => {
    expect(flatten([1, undefined, [2, 3], 4, undefined, [5, 6]])).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
    ]);
  });

  test('isObject', () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject({ x: 1 })).toBe(true);
  });

  test('undefOrNull', () => {
    expect(undefOrNull(undefined)).toBe(true);
    expect(undefOrNull(null)).toBe(true);
    expect(undefOrNull(true)).toBe(false);
    expect(undefOrNull(1)).toBe(false);
    expect(undefOrNull('string')).toBe(false);
    expect(undefOrNull({ x: 1 })).toBe(false);
  });

  test('unique', () => {
    expect(unique([[1, 2, 3], [2, 3, 4], 3, 4, [5, 6]]).sort()).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
    ]);
  });
});
