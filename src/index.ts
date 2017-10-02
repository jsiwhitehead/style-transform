export { default as createTransform } from './createTransform';
export { CSSProps, CSSTree, StyleTransforms, TransformConfig } from './typings';

import coreTransforms from './transforms';
import { CSSMap, CSSTree, StyleTransforms, TransformConfig } from './typings';
import { mapToTree, memoizeFunc, treeToMap } from './utils';

const run = memoizeFunc((transforms?: StyleTransforms) => {
  const allTransforms = { ...coreTransforms, ...transforms || {} };
  return memoizeFunc(
    (config: TransformConfig[]) =>
      memoizeFunc(
        (style?: CSSTree) =>
          mapToTree(
            config.reduce<CSSMap>((res, t) => {
              if (!t) return res;
              if (!Array.isArray(t)) return treeToMap(t);
              return allTransforms[t[0]](res, ...t.slice(1));
            }, treeToMap(style)),
          ),
        true,
      ),
    true,
  );
});

export default function(
  style: CSSTree | undefined,
  config: TransformConfig[],
  transforms?: StyleTransforms,
) {
  return run(transforms)(config)(style);
}
