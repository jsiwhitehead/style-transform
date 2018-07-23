import st from '../src/index';

const jsonexpect = (a, b) =>
  expect(JSON.parse(JSON.stringify(a))).toEqual(JSON.parse(JSON.stringify(b)));

describe('transforms', () => {
  test('defaults', () => {
    jsonexpect(st({}).defaults(), {});
    jsonexpect(st({}).defaults(undefined), {});
    jsonexpect(st({}).defaults({}), {});

    jsonexpect(st({}).defaults({ '': { width: 10 } }), { width: 10 });
    jsonexpect(st({}).defaults({ width: 10 }), { width: 10 });
    jsonexpect(st({ width: 10 }).defaults({ width: 20 }), { width: 10 });

    jsonexpect(
      st({
        width: 10,
        focused: { width: 20 },
      }).defaults({
        height: 30,
        focused: { width: 40 },
      }),
      { width: 10, height: 30 },
    );
  });

  test('expandFor', () => {
    jsonexpect(st({}).expandFor('paddingTop'), {});

    jsonexpect(st({ padding: 10 }).expandFor('paddingTop'), {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
    });
  });

  test('filter', () => {
    jsonexpect(st({}).filter('paddingTop'), {});

    jsonexpect(st({ paddingTop: 10, paddingRight: 10 }).filter('paddingTop'), {
      paddingTop: 10,
    });

    jsonexpect(st({ padding: 10 }).filter('paddingTop'), { paddingTop: 10 });
  });

  test('merge', () => {
    jsonexpect(st({}).merge(), {});
    jsonexpect(st({}).merge(undefined), {});
    jsonexpect(st({}).merge({}), {});

    jsonexpect(st({ width: 10 }).merge(), { width: 10 });
    jsonexpect(st({}).merge({ width: 10 }), { width: 10 });

    jsonexpect(st({ width: 20 }).merge({ width: 10 }), { width: 10 });
    jsonexpect(st({ width: 20, height: 30 }).merge({ width: 10 }), {
      width: 10,
      height: 30,
    });
    jsonexpect(
      st({ width: 40 }).merge({ width: 10 }, { width: 20, height: 30 }),
      { width: 20, height: 30 },
    );

    jsonexpect(
      st({ height: 40, focused: { width: 50 } }).merge(
        { width: 10, focused: { width: 20 } },
        { focused: { height: 30 } },
      ),
      { width: 10, height: 40 },
    );
  });

  test('mergeKeys', () => {
    jsonexpect(st({}).mergeKeys(), {});
    jsonexpect(st({}).mergeKeys('focused'), {});

    jsonexpect(
      st({ width: 10, focused: { height: 20 } }).mergeKeys('focused'),
      { width: 10, height: 20 },
    );
    jsonexpect(
      st({
        width: 10,
        focused: { height: 20 },
        hovered: { width: 40, focused: { width: 30 } },
      }).mergeKeys('focused', 'active'),
      { width: 10, height: 20 },
    );
    jsonexpect(
      st({
        width: 10,
        focused: { height: 20 },
        active: { width: 40, focused: { width: 30 } },
      }).mergeKeys('focused', 'active'),
      { width: 30, height: 20 },
    );

    jsonexpect(
      st({
        width: 10,
        focused: { height: 20 },
        active: { width: 40, focused: { width: 30 } },
      }).mergeKeys({ focused: true, active: true, hovered: false }),
      { width: 30, height: 20 },
    );
  });

  test('numeric', () => {
    jsonexpect(st({}).numeric(), {});

    jsonexpect(st({}).numeric('width'), { width: 0 });
    jsonexpect(st({ width: 10 }).numeric('width'), { width: 10 });
    jsonexpect(st({ width: '10px' }).numeric('width'), { width: 10 });

    jsonexpect(st({ width: '10px', height: '20px' }).numeric('width'), {
      width: 10,
      height: '20px',
    });
    jsonexpect(st({ padding: '10px 20px' }).numeric('paddingTop'), {
      paddingTop: 10,
      paddingRight: '20px',
      paddingBottom: '10px',
      paddingLeft: '20px',
    });
  });

  test('scale', () => {
    jsonexpect(st({}).scale(), {});

    jsonexpect(st({ padding: '10px 20px' }).scale({ paddingTop: 5 }), {
      paddingTop: 50,
      paddingRight: '20px',
      paddingBottom: '10px',
      paddingLeft: '20px',
    });
  });
});
