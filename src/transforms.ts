import createTransform from './createTransform';
import css from './css';
import { CSSMap, CSSTree, Obj } from './typings';
import { isObject, treeToMap, unique } from './utils';

const mergeMaps = (...styleMaps: CSSMap[]): CSSMap => {
  const keys = unique(styleMaps.map(m => Object.keys(m)));
  return keys.reduce(
    (res, k) => ({ ...res, [k]: css.merge(...styleMaps.map(m => m[k])) }),
    {},
  );
};

export default {
  defaults: createTransform.map(
    (styleMap, ...styleTrees: (CSSTree | undefined)[]) =>
      mergeMaps(...styleTrees.map(treeToMap), styleMap),
  ),

  expandFor: createTransform(css.expandFor),

  filter: createTransform(css.filter),

  filterKeys: createTransform.map((styleMap: CSSMap, ...keys: string[]) => {
    if (keys.length === 0) return { '': styleMap[''] };
    return Object.keys(styleMap)
      .filter(key => (key ? key.split('.') : []).every(k => keys.includes(k)))
      .reduce((res, k) => ({ ...res, [k]: styleMap[k] }), {});
  }),

  merge: createTransform.map(
    (styleMap, ...styleTrees: (CSSTree | undefined)[]) =>
      mergeMaps(styleMap, ...styleTrees.map(treeToMap)),
  ),

  mergeKeys: createTransform.map(
    (styleMap, ...args: (string | Obj<boolean>)[]) => {
      const keys = isObject(args[0])
        ? Object.keys(args[0]).filter(k => args[0][k])
        : args as string[];
      return Object.keys(styleMap)
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
        );
    },
  ),

  numeric: createTransform((style, ...props: string[]) => {
    const result = css.expandFor(style, ...props);
    for (const k of props) result[k] = parseFloat(result[k] || 0);
    return result;
  }),

  scale: createTransform(css.scale),
};
