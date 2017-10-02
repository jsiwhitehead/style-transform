import { CSSProps, Obj } from '../typings';

(...x) => x as CSSProps | Obj;

import expandFor from './expandFor';
import filter from './filter';
import merge from './merge';
import scale from './scale';

export default {
  expandFor,
  filter,
  merge,
  scale,
};
