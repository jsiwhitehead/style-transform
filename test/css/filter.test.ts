import filter from '../../src/css/filter';

describe('css: filter', () => {
  test('filter empty style', () => {
    expect(filter(undefined, 'padding')).toEqual({});
  });

  test('filter normal styles', () => {
    expect(
      filter(
        { width: 100, height: 100, position: 'absolute' },
        'width',
        'height',
      ),
    ).toEqual({
      width: 100,
      height: 100,
    });
  });

  test('filter missing styles', () => {
    expect(
      filter({ width: 100, height: 100, position: 'absolute' }, 'top', 'right'),
    ).toEqual({});
  });

  test('filter shorthand styles', () => {
    expect(
      filter(
        { padding: '10px 20px', position: 'absolute' },
        'paddingTop',
        'paddingRight',
      ),
    ).toEqual({
      paddingTop: '10px',
      paddingRight: '20px',
    });
  });
});
