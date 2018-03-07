export { CSSProps, CSSTree, Style } from './typings';

import css from './css';
import { CSSProps, CSSMap, CSSTree, Obj, Style } from './typings';
import { isObject, mergeMaps, treeToMap } from './utils';

x => x as CSSProps;

const st = (styleMap: CSSMap): Style => ({
  ...styleMap[''],

  defaults: (...styleTrees) =>
    st(mergeMaps(...styleTrees.map(treeToMap), styleMap)),

  expandFor: (...props) =>
    st({ ...styleMap, '': css.expandFor(styleMap[''], ...props) }),

  filter: (...props) =>
    st({ ...styleMap, '': css.filter(styleMap[''], ...props) }),

  filterKeys: (...keys) => {
    if (keys.length === 0) return st({ '': styleMap[''] });
    return st(
      Object.keys(styleMap)
        .filter(key => (key ? key.split('.') : []).every(k => keys.includes(k)))
        .reduce((res, k) => ({ ...res, [k]: styleMap[k] }), {}),
    );
  },

  map: map => st({ ...styleMap, '': map(styleMap['']) }),

  merge: (...styleTrees: (CSSTree | undefined)[]) =>
    st(mergeMaps(styleMap, ...styleTrees.map(treeToMap))),

  mergeKeys: (...args: (string | Obj<boolean>)[]) => {
    const keys = isObject(args[0])
      ? Object.keys(args[0]).filter(k => args[0][k])
      : (args as string[]);
    return st(
      Object.keys(styleMap)
        .map(k => ({
          split: k ? k.split('.') : [],
          style: styleMap[k],
        }))
        .sort((a, b) => a.split.length - b.split.length)
        .map(({ split, style }) => ({
          newKey: split.filter(k => !keys.includes(k)).join('.'),
          style,
        }))
        .reduce(
          (res, { newKey, style }) => ({
            ...res,
            [newKey]: css.merge(res[newKey], style),
          }),
          {},
        ),
    );
  },

  numeric: (...props: string[]) => {
    const result = css.expandFor(styleMap[''], ...props);
    for (const k of props) result[k] = parseFloat(result[k] || 0);
    return st({ ...styleMap, '': result });
  },

  scale: (scales: Obj<number | Obj<number>> = {}) =>
    st({ ...styleMap, '': css.scale(styleMap[''], scales) }),
});

export default (style: Style | CSSTree | undefined): Style =>
  style && style.expandFor ? (style as Style) : st(treeToMap(style));
