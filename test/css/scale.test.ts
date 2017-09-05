import scale from '../../src/css/scale';

describe('css: scale', () => {
  test('scale empty style', () => {
    expect(scale(undefined, { width: 2 })).toEqual({ width: 0 });
  });

  test('scale normal styles', () => {
    expect(
      scale(
        { width: 100, height: 100, position: 'absolute' },
        { width: 2, height: 3 },
      ),
    ).toEqual({
      width: 200,
      height: 300,
      position: 'absolute',
    });
  });

  test('scale normal styles with rounding', () => {
    expect(
      scale(
        { width: 5, height: 15, position: 'absolute' },
        { width: 1.5, height: 0.5 },
      ),
    ).toEqual({
      width: 8,
      height: 8,
      position: 'absolute',
    });
  });

  test('scale missing styles', () => {
    expect(
      scale({ width: 100, height: 100, position: 'absolute' }, { top: 2 }),
    ).toEqual({
      width: 100,
      height: 100,
      position: 'absolute',
      top: 0,
    });
  });

  test('scale string styles', () => {
    expect(
      scale(
        { width: '100px', height: '100px', position: 'absolute' },
        { width: 2, height: 3 },
      ),
    ).toEqual({
      width: 200,
      height: 300,
      position: 'absolute',
    });
  });

  test('scale shorthand style', () => {
    expect(
      scale({ padding: 10, position: 'absolute' }, { padding: 2 }),
    ).toEqual({
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      position: 'absolute',
    });
  });

  test('scale string shorthand style', () => {
    expect(
      scale({ padding: '10px 20px', position: 'absolute' }, { padding: 2 }),
    ).toEqual({
      paddingTop: 20,
      paddingRight: 40,
      paddingBottom: 20,
      paddingLeft: 40,
      position: 'absolute',
    });
  });

  test('scale string shorthand styles', () => {
    expect(
      scale(
        { padding: '10px 20px', position: 'absolute' },
        { paddingTop: 2, paddingRight: 3 },
      ),
    ).toEqual({
      paddingTop: 20,
      paddingRight: 60,
      paddingBottom: '10px',
      paddingLeft: '20px',
      position: 'absolute',
    });
  });

  test('scale normal styles with map', () => {
    expect(
      scale({ width: 100, position: 'absolute' }, { height: { width: 2 } }),
    ).toEqual({
      width: 100,
      height: 200,
      position: 'absolute',
    });
  });

  test('scale missing styles with map', () => {
    expect(
      scale({ top: 100, position: 'absolute' }, { height: { width: 2 } }),
    ).toEqual({
      top: 100,
      height: 0,
      position: 'absolute',
    });
  });

  test('scale string styles with map', () => {
    expect(
      scale({ width: '100px', position: 'absolute' }, { height: { width: 2 } }),
    ).toEqual({
      width: '100px',
      height: 200,
      position: 'absolute',
    });
  });

  test('scale normal styles with multi map', () => {
    expect(
      scale(
        { width: 100, paddingLeft: 20, position: 'absolute' },
        { height: { width: 2, paddingLeft: 3 } },
      ),
    ).toEqual({
      width: 100,
      paddingLeft: 20,
      height: 260,
      position: 'absolute',
    });
  });

  test('scale normal styles twice with map', () => {
    expect(
      scale(
        { width: 100, height: 100, position: 'absolute' },
        { height: { width: 2 }, top: { height: 2 } },
      ),
    ).toEqual({
      width: 100,
      height: 200,
      top: 200,
      position: 'absolute',
    });
  });

  test('scale string styles to shorthand prop with map', () => {
    expect(
      scale({ width: '10px', position: 'absolute' }, { padding: { width: 2 } }),
    ).toEqual({
      width: '10px',
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      position: 'absolute',
    });
  });

  test('scale normal styles to shorthand prop with merging map', () => {
    expect(
      scale({ width: 10, paddingTop: 10 }, { padding: { width: 2 } }),
    ).toEqual({
      width: 10,
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
    });
  });

  test('scale shorthand styles to shorthand prop with map', () => {
    expect(
      scale(
        { margin: '10px 20px', position: 'absolute' },
        { padding: { margin: 2 } },
      ),
    ).toEqual({
      marginTop: '10px',
      marginRight: '20px',
      marginBottom: '10px',
      marginLeft: '20px',
      paddingTop: 20,
      paddingRight: 40,
      paddingBottom: 20,
      paddingLeft: 40,
      position: 'absolute',
    });
  });

  test('scale numeric line height', () => {
    expect(
      scale(
        { fontSize: 10, lineHeight: 2 },
        { height: { fontSize: 1, lineHeight: 1 }, lineHeight: 2 },
      ),
    ).toEqual({
      fontSize: 10,
      lineHeight: '40px',
      height: 30,
    });
  });
});
