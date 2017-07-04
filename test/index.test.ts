import styleTransform from '../src';

describe('index', () => {
  test('empty style and config', () => {
    expect(styleTransform(undefined, [])).toEqual({});
  });

  test('map empty style to new object', () => {
    expect(styleTransform(undefined, [{ width: 10 }])).toEqual({ width: 10 });
  });

  test('map style to new object', () => {
    expect(styleTransform({ height: 10 }, [{ width: 20 }])).toEqual({
      width: 20,
    });
  });

  test('map empty root style with transform', () => {
    expect(styleTransform(undefined, [['merge', { width: 10 }]])).toEqual({
      width: 10,
    });
  });

  test('map root style with transform', () => {
    expect(styleTransform({ height: 10 }, [['merge', { width: 20 }]])).toEqual({
      height: 10,
      width: 20,
    });
  });

  test('caching with core transforms', () => {
    const style = { height: 10 };

    const res1 = styleTransform(style, [{ width: 20 }]);
    const res2 = styleTransform(style, [{ width: 20 }]);

    expect(res1).toBe(res2);

    const res3 = styleTransform(style, [['merge', { width: 20 }]]);
    const res4 = styleTransform(style, [['merge', { width: 20 }]]);

    expect(res3).toBe(res4);
  });

  test('caching with custom transforms', () => {
    const style = { height: 10 };
    const customTransforms = { custom: s => s };

    const res1 = styleTransform(style, [['merge', { width: 20 }]]);
    const res2 = styleTransform(
      style,
      [['merge', { width: 20 }]],
      customTransforms,
    );
    const res3 = styleTransform(
      style,
      [['merge', { width: 20 }]],
      customTransforms,
    );

    expect(res1).not.toBe(res2);
    expect(res2).toBe(res3);
  });
});
