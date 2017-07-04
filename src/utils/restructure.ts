import * as immutable from 'object-path-immutable';

import css from '../css';
import { CSSMap, CSSTree } from '../typings';

import { isObject } from './misc';

export const mapToTree = (styleMap: CSSMap): CSSTree => {
  let branchStyles = {} as any;

  for (const k of Object.keys(styleMap)) {
    if (k !== '') branchStyles = immutable.set(branchStyles, k, styleMap[k]);
  }

  return { ...styleMap[''], ...branchStyles };
};

export const treeToMap = (styleTree?: CSSTree): CSSMap => {
  if (!styleTree) return { '': {} };

  const result: CSSMap = { '': {} };
  for (const p of Object.keys(styleTree)) {
    if (isObject(styleTree[p])) {
      const flat = treeToMap(styleTree[p]);
      for (const k of Object.keys(flat)) {
        const key = k === '' ? p : [...p.split('.'), k].sort().join('.');
        if (result[key] || Object.keys(flat[k]).length > 0) {
          result[key] = css.merge(result[key], flat[k]);
        }
      }
    } else {
      result[''][p] = styleTree[p];
    }
  }

  return result;
};
