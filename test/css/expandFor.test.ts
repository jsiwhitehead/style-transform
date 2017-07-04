import expandFor from '../../src/css/expandFor';

describe('css: expandFor', () => {
  test('expand empty style', () => {
    expect(expandFor(undefined, 'padding')).toEqual({});
  });

  test('expand padding', () => {
    expect(expandFor({ padding: 10 }, 'paddingTop')).toEqual({
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
    });

    expect(expandFor({ padding: '10px 20px' }, 'paddingTop')).toEqual({
      paddingTop: '10px',
      paddingRight: '20px',
      paddingBottom: '10px',
      paddingLeft: '20px',
    });
  });

  test('expand font', () => {
    expect(
      expandFor({ font: 'bold 13px/150% Arial, sans-serif' }, 'fontSize'),
    ).toEqual({
      fontFamily: '"Arial", sans-serif',
      fontSize: '13px',
      lineHeight: '150%',
      fontWeight: 'bold',
    });
  });

  test('expand border', () => {
    expect(
      expandFor(
        {
          border: '2px solid red',
          borderColor: 'yellow',
          borderRight: '5px dashed green',
        },
        'borderTop',
      ),
    ).toEqual({
      borderTopWidth: '2px',
      borderTopStyle: 'solid',
      borderTopColor: 'yellow',
      borderRightWidth: '5px',
      borderRightStyle: 'dashed',
      borderRightColor: 'green',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'yellow',
      borderLeftWidth: '2px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'yellow',
    });
  });
});
