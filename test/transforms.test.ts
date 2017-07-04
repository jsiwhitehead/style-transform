import transforms from '../src/transforms';

describe('transforms', () => {
  test('defaults', () => {
    expect(transforms.defaults({ '': {} })).toEqual({ '': {} });
    expect(transforms.defaults({ '': {} }, undefined)).toEqual({ '': {} });
    expect(transforms.defaults({ '': {} }, {})).toEqual({ '': {} });

    expect(transforms.defaults({ '': { width: 10 } })).toEqual({
      '': { width: 10 },
    });
    expect(transforms.defaults({ '': {} }, { width: 10 })).toEqual({
      '': { width: 10 },
    });
    expect(transforms.defaults({ '': { width: 20 } }, { width: 10 })).toEqual({
      '': { width: 20 },
    });

    expect(
      transforms.defaults(
        {
          '': { width: 10 },
          focused: { width: 20 },
        },
        {
          height: 30,
          focused: { width: 40 },
        },
      ),
    ).toEqual({
      '': { width: 10, height: 30 },
      focused: { width: 20 },
    });
  });

  test('expandFor', () => {
    expect(transforms.expandFor({ '': {} }, 'paddingTop')).toEqual({ '': {} });

    expect(
      transforms.expandFor({ '': { padding: 10 } }, 'paddingTop'),
    ).toEqual({
      '': {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
      },
    });
  });

  test('filter', () => {
    expect(transforms.filter({ '': {} }, 'paddingTop')).toEqual({ '': {} });

    expect(
      transforms.filter(
        { '': { paddingTop: 10, paddingRight: 10 } },
        'paddingTop',
      ),
    ).toEqual({
      '': { paddingTop: 10 },
    });
    expect(transforms.filter({ '': { padding: 10 } }, 'paddingTop')).toEqual({
      '': { paddingTop: 10 },
    });
  });

  test('filterKeys', () => {
    expect(transforms.filterKeys({ '': {} }, 'focused')).toEqual({ '': {} });

    expect(
      transforms.filterKeys(
        {
          '': { width: 10 },
          focused: { width: 20 },
          active: { width: 40 },
          'active.focused': { width: 30 },
        },
        'focused',
      ),
    ).toEqual({
      '': { width: 10 },
      focused: { width: 20 },
    });
  });

  test('merge', () => {
    expect(transforms.merge({ '': {} })).toEqual({ '': {} });
    expect(transforms.merge({ '': {} }, undefined)).toEqual({ '': {} });
    expect(transforms.merge({ '': {} }, {})).toEqual({ '': {} });

    expect(transforms.merge({ '': { width: 10 } })).toEqual({
      '': { width: 10 },
    });
    expect(transforms.merge({ '': {} }, { width: 10 })).toEqual({
      '': { width: 10 },
    });

    expect(transforms.merge({ '': { width: 20 } }, { width: 10 })).toEqual({
      '': { width: 10 },
    });
    expect(
      transforms.merge({ '': { width: 20, height: 30 } }, { width: 10 }),
    ).toEqual({
      '': { width: 10, height: 30 },
    });
    expect(
      transforms.merge(
        { '': { width: 40 } },
        { width: 10 },
        { width: 20, height: 30 },
      ),
    ).toEqual({
      '': { width: 20, height: 30 },
    });

    expect(
      transforms.merge(
        {
          '': { height: 40 },
          focused: { width: 50 },
        },
        {
          width: 10,
          focused: { width: 20 },
        },
        {
          focused: { height: 30 },
        },
      ),
    ).toEqual({
      '': { width: 10, height: 40 },
      focused: { width: 20, height: 30 },
    });
  });

  test('mergeKeys', () => {
    expect(transforms.mergeKeys({ '': {} })).toEqual({ '': {} });
    expect(transforms.mergeKeys({ '': {} }, 'focused')).toEqual({ '': {} });

    expect(
      transforms.mergeKeys(
        {
          '': { width: 10 },
          focused: { height: 20 },
        },
        'focused',
      ),
    ).toEqual({
      '': { width: 10, height: 20 },
    });
    expect(
      transforms.mergeKeys(
        {
          '': { width: 10 },
          focused: { height: 20 },
          hovered: { width: 40 },
          'focused.hovered': { width: 30 },
        },
        'focused',
        'active',
      ),
    ).toEqual({
      '': { width: 10, height: 20 },
      hovered: { width: 30 },
    });
    expect(
      transforms.mergeKeys(
        {
          '': { width: 10 },
          focused: { height: 20 },
          active: { width: 40 },
          'focused.active': { width: 30 },
        },
        'focused',
        'active',
      ),
    ).toEqual({
      '': { width: 30, height: 20 },
    });

    expect(
      transforms.mergeKeys(
        {
          '': { width: 10 },
          focused: { height: 20 },
          active: { width: 40 },
          'focused.active': { width: 30 },
        },
        { focused: true, active: true, hovered: false },
      ),
    ).toEqual({
      '': { width: 30, height: 20 },
    });
  });

  test('numeric', () => {
    expect(transforms.numeric({ '': {} })).toEqual({ '': {} });

    expect(transforms.numeric({ '': {} }, 'width')).toEqual({
      '': { width: 0 },
    });
    expect(transforms.numeric({ '': { width: 10 } }, 'width')).toEqual({
      '': { width: 10 },
    });
    expect(transforms.numeric({ '': { width: '10px' } }, 'width')).toEqual({
      '': { width: 10 },
    });

    expect(
      transforms.numeric({ '': { width: '10px', height: '20px' } }, 'width'),
    ).toEqual({
      '': { width: 10, height: '20px' },
    });
    expect(
      transforms.numeric({ '': { padding: '10px 20px' } }, 'paddingTop'),
    ).toEqual({
      '': {
        paddingTop: 10,
        paddingRight: '20px',
        paddingBottom: '10px',
        paddingLeft: '20px',
      },
    });
  });

  test('scale', () => {
    expect(transforms.scale({ '': {} })).toEqual({ '': {} });

    expect(
      transforms.scale({ '': { padding: '10px 20px' } }, { paddingTop: 5 }),
    ).toEqual({
      '': {
        paddingTop: 50,
        paddingRight: '20px',
        paddingBottom: '10px',
        paddingLeft: '20px',
      },
    });
  });
});
