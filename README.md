# Style Transform

### A toolkit for fast and flexible manipulation of css-in-js styles.

```
npm install --save style-transform
```

## Overview

Style Transform is a utility library for working with 'CSS in JS' style objects as simply as any other JS objects.

Specifically, these utilities smooth over the difficulties of working with CSS shorthand properties, as well as numeric properties provided as strings, which cause problems when working with style objects.

```js
// given the provided style object:
// style = { margin: 20, fontSize: '16px' }

// returns undefined, not 20
style.marginTop;

// returns NaN, not 24
style.fontSize * 1.5;
```
