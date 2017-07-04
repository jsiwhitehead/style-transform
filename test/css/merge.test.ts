import merge from '../../src/css/merge';

describe('css: merge', () => {
  test('merge empty list of styles', () => {
    expect(merge()).toEqual({});
  });

  test('merge single style', () => {
    expect(merge({ padding: 10 })).toEqual({ padding: 10 });
  });

  test('merge normal styles', () => {
    expect(
      merge(
        { width: 100, height: 100 },
        { position: 'relative' },
        { cursor: 'pointer' },
      ),
    ).toEqual({
      width: 100,
      height: 100,
      position: 'relative',
      cursor: 'pointer',
    });
  });

  test('merge normal and empty styles', () => {
    expect(
      merge({ width: 100, height: 100 }, undefined, { cursor: 'pointer' }),
    ).toEqual({ width: 100, height: 100, cursor: 'pointer' });
  });

  test('merge shorthand styles', () => {
    expect(
      merge(
        { padding: 10 },
        { paddingTop: 20 },
        { paddingRight: 20, paddingBottom: 30 },
      ),
    ).toEqual({
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 30,
      paddingLeft: 10,
    });
  });
});
