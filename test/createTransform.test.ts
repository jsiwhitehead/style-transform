import createTransform from '../src/createTransform';

describe('createTransform', () => {
  test('props transform with no keys', () => {
    const transform = createTransform(style => ({ ...style, width: 10 }));

    expect(transform({ '': { height: 10 } })).toEqual({
      '': { width: 10, height: 10 },
    });
    expect(transform({ '': { height: 10 }, focused: { height: 20 } })).toEqual({
      '': { width: 10, height: 10 },
      focused: { height: 20 },
    });
  });

  test('props transform with keys', () => {
    const transform = createTransform((style, width, height) => ({
      ...style,
      width,
      height,
    }));

    expect(transform({ '': {} }, 10, 20)).toEqual({
      '': { width: 10, height: 20 },
    });
    expect(transform({ '': {} }, 20, 10)).toEqual({
      '': { width: 20, height: 10 },
    });
  });

  test('map transform with no keys', () => {
    const transform = createTransform.map(styleMap =>
      Object.keys(styleMap).reduce(
        (res, k) => ({ ...res, [k]: { ...styleMap[k], width: 10 } }),
        {},
      ),
    );

    expect(transform({ '': { height: 10 } })).toEqual({
      '': { width: 10, height: 10 },
    });
    expect(transform({ '': {}, focused: { height: 20 } })).toEqual({
      '': { width: 10 },
      focused: { width: 10, height: 20 },
    });
  });

  test('map transform with keys', () => {
    const transform = createTransform.map((styleMap, width, height) =>
      Object.keys(styleMap).reduce(
        (res, k) => ({
          ...res,
          [k]: { ...styleMap[k], width, height },
        }),
        {},
      ),
    );

    expect(
      transform({ '': {}, focused: { position: 'relative' } }, 10, 20),
    ).toEqual({
      '': { width: 10, height: 20 },
      focused: { position: 'relative', width: 10, height: 20 },
    });
    expect(
      transform({ '': {}, focused: { position: 'relative' } }, 20, 10),
    ).toEqual({
      '': { width: 20, height: 10 },
      focused: { position: 'relative', width: 20, height: 10 },
    });
  });
});
