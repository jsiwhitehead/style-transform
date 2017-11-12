import { CSSMap, CSSProps, CSSTree, Transform } from './typings';
import { mapToTree, treeToMap } from './utils';

const wrapTransform = (type: string, transform: Transform) => (
  style: CSSMap,
  ...args: any[]
) => {
  if (type === 'props') {
    return { ...style, '': transform(style[''], ...args) };
  }
  if (type === 'tree') {
    return treeToMap(transform(mapToTree(style), ...args));
  }
  return transform(style, ...args);
};

export default Object.assign(
  (transform: Transform<CSSProps>) => wrapTransform('props', transform),
  {
    tree: (transform: Transform<CSSTree>) => wrapTransform('tree', transform),
    map: (transform: Transform<CSSMap>) => wrapTransform('map', transform),
  },
);
