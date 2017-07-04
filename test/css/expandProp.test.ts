import expandProp from '../../src/css/expandProp';

describe('css: expandProp', () => {
  test('expand padding', () => {
    expect(expandProp({ padding: 10 }, 'padding')).toEqual({
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
    });

    expect(expandProp({ padding: '10px' }, 'padding')).toEqual({
      paddingTop: '10px',
      paddingRight: '10px',
      paddingBottom: '10px',
      paddingLeft: '10px',
    });

    expect(expandProp({ padding: '10px 20px' }, 'padding')).toEqual({
      paddingTop: '10px',
      paddingRight: '20px',
      paddingBottom: '10px',
      paddingLeft: '20px',
    });

    expect(expandProp({ padding: '10px 20px 30px' }, 'padding')).toEqual({
      paddingTop: '10px',
      paddingRight: '20px',
      paddingBottom: '30px',
      paddingLeft: '20px',
    });

    expect(expandProp({ padding: '10px 20px 30px 40px' }, 'padding')).toEqual({
      paddingTop: '10px',
      paddingRight: '20px',
      paddingBottom: '30px',
      paddingLeft: '40px',
    });
  });

  test('expand borderRadius', () => {
    expect(expandProp({ borderRadius: 10 }, 'borderRadius')).toEqual({
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    });

    expect(expandProp({ borderRadius: '10px' }, 'borderRadius')).toEqual({
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '10px',
    });

    expect(expandProp({ borderRadius: '10px 20px' }, 'borderRadius')).toEqual({
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '20px',
    });

    expect(
      expandProp({ borderRadius: '10px 20px 30px' }, 'borderRadius'),
    ).toEqual({
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '30px',
      borderBottomLeftRadius: '20px',
    });

    expect(
      expandProp({ borderRadius: '10px 20px 30px 40px' }, 'borderRadius'),
    ).toEqual({
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '30px',
      borderBottomLeftRadius: '40px',
    });
  });
});
