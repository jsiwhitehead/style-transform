# style-transform

Wrap style objects with a fluent API for easy manipulation.

## Installation

```
yarn add style-transform
```

## Table of contents

- [Overview](#overview)
  - [Example](#example)
  - [Nested styles](#nested-styles)
- [API](#api)
  - [Merging styles](#merging-styles)
    - [`defaults`](#defaultsstyles-css)
    - [`merge`](#mergestyles-css)
    - [`mergeKeys`](#mergekeyskeys-string--keys--key-boolean-)
  - [Manipulating values](#manipulating-values)
    - [`expandFor`](#expandforstylenames-string)
    - [`filter`](#filterstylenames-string)
    - [`map`](#mapmap-css--css)
    - [`numeric`](#numericstylenames-string)
    - [`scale`](#scalemultipliers--stylename-number---stylename-number--)

## Overview

When treated like plain JavaScript objects, 'CSS in JS' style objects don't always behave as you'd hope, due to shorthand properties, and numeric values sometimes being written as strings. For example:

```typescript
const style1 = { marginLeft: 10 };
const style2 = { margin: 20 };
const style3 = { ...style1, ...style2 };

// Output: { marginLeft: 10, margin: 20 }
// Intention: { margin: 20 }
```

This library wraps style objects with a fluent API of utilities for manipulating them while avoiding these difficulties. These wrapped style objects can still be passed directly to React components.

### Example

```typescript
import st from 'style-transform';

const style = st({
  background: 'orange',
  heading: {
    background: 'red',
  },
})
  .defaults({ fontSize: '20px', color: 'black', background: 'white' })
  .mergeKeys('heading')
  .scale({ fontSize: 1.5 });

// {
//   fontSize: 30,
//   color: 'black',
//   background: 'red',
// };
//
// Use in React: <p style={style}>Hello world!</p>
```

### Nested styles

As in the example above, any style object (the wrapped one or one passed to a method) can optionally be nested, and the names of these nested styles are referred to as keys (i.e. the example style has a key of 'heading').

This nesting can be of any depth.

## API

Once wrapped, the following methods will be available on the style object.

### Merging styles

Merging takes both shorthand properties and nested styles into account, allowing styles to be easily combined together.

#### `defaults(...styles: css[])`

Merge the wrapped style with the provided `styles`, with the wrapped style last.

```typescript
const style = st({ margin: 20 }).defaults({ marginTop: 10, color: 'black' });

// { margin: 20, color: 'black' };
```

#### `merge(...styles: css[])`

Merge the wrapped style with the provided `styles`, with the wrapped style first.

```typescript
const style = st({ margin: 20 }).merge({ marginTop: 10 });

// { marginTop: 10, marginRight: 20, marginBottom: 20, marginLeft: 20 };
```

#### `mergeKeys(...keys: string[] | keys: { [key]: boolean })`

Merge in the nested styles for the provided keys (given either as an array or a keyed object). For multiple keys, all paths covered will be merged, with more deeply nested styles overriding those below.

```typescript
const style = st({
  fontSize: 20,
  active: {
    fontSize: 30,
    color: 'orange'
    hover: {
      color: 'red',
    },
  },
}).mergeKeys('active', 'hover');

// { fontSize: 30, color: 'red' };
```

### Manipulating values

These utilities transform specified values, and don't affect nested styles.

#### `expandFor(...styleNames: string[])`

Expands any relevant shorthand styles to make the requested values available.

```typescript
const style = st({ margin: 20 }).expandFor('marginTop');

// { marginTop: 20, marginRight: 20, marginBottom: 20, marginLeft: 20 };
```

#### `filter(...styleNames: string[])`

Applies `expandFor` to make the requested values available, then clears all other values.

```typescript
const style = st({ margin: 20 }).filter('marginTop', 'marginBottom');

// { marginTop: 20, marginBottom: 20 };
```

#### `map(map: css => css)`

Applies `map` to the base styles, leaving nested styles unchanged.

```typescript
const style = st({ margin: 20, hover: { color: 'red' } }).map(({ margin }) => ({
  margin: margin * 2,
}));

// { margin: 40, hover: { color: 'red' } };
```

#### `numeric(...styleNames: string[])`

Applies `expandFor` to make the requested values available, then converts them to numeric values if required (e.g. `'16px'` becomes `16`).

```typescript
const style = st({ margin: '20px' }).numeric('marginTop', 'marginBottom');

// { marginTop: 20, marginRight: '20px', marginBottom: 20, marginLeft: '20px' };
```

#### `scale(multipliers: { [styleName]: number | { [styleName]: number } })`

Calculates values as multiples of other values. The provided multipliers can simply be numbers, in which case the value itself is scaled, or another map of values and numbers, in which case those are calculated and added together.

```typescript
const style = st({ margin: '20px' }).scale({
  marginTop: 2,
  marginBottom: { marginTop: 1, marginBottom: 2 },
});

// { marginTop: 40, marginRight: '20px', marginBottom: 60, marginLeft: '20px'  };
```
