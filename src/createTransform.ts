import {
  CSSMap,
  CSSProps,
  CSSTree,
  MapTransform,
  PropsTransform,
  TreeTransform,
} from './typings';
import { mapToTree, treeToMap } from './utils';

const wrapTransform = <T extends CSSProps | CSSTree | CSSMap>(
  type: string,
  transform: (style: T, ...args: any[]) => T,
) => (style: CSSMap, ...args: any[]) => {
  if (type === 'props') {
    return { ...style, '': (transform as PropsTransform)(style[''], ...args) };
  }
  if (type === 'tree') {
    return treeToMap((transform as TreeTransform)(mapToTree(style), ...args));
  }
  return (transform as MapTransform)(style, ...args);
};

export default Object.assign(
  (transform: PropsTransform) => wrapTransform('props', transform),
  {
    tree: (transform: TreeTransform) => wrapTransform('tree', transform),
    map: (transform: MapTransform) => wrapTransform('map', transform),
  },
);
