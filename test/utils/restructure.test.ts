import { mapToTree, treeToMap } from '../../src/utils/restructure';

describe('utils: restructure', () => {
  test('convert cssMaps to cssTrees', () => {
    expect(mapToTree({ '': {} })).toEqual({});

    expect(
      mapToTree({
        '': {
          fontSize: 16,
        },
        focused: {
          fontWeight: 'bold',
        },
        'focused.active': {
          color: 'blue',
        },
        'active.focused': {
          background: 'red',
        },
      }),
    ).toEqual({
      fontSize: 16,
      focused: {
        fontWeight: 'bold',
        active: {
          color: 'blue',
        },
      },
      active: {
        focused: {
          background: 'red',
        },
      },
    });
  });

  test('convert cssTrees to cssMaps', () => {
    expect(treeToMap()).toEqual({ '': {} });

    expect(treeToMap({})).toEqual({ '': {} });

    expect(
      treeToMap({
        fontSize: 16,
        focused: {
          fontWeight: 'bold',
          active: {
            color: 'blue',
          },
        },
        active: {
          focused: {
            background: 'red',
          },
        },
      }),
    ).toEqual({
      '': {
        fontSize: 16,
      },
      focused: {
        fontWeight: 'bold',
      },
      'active.focused': {
        color: 'blue',
        background: 'red',
      },
    });
  });
});
