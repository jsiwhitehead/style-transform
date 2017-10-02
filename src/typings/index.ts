import CSSProps from './cssProperties';

export type Falsy = null | undefined | false;

export type Obj<T = any> = { [key: string]: T };

export { default as CSSProps } from './cssProperties';
export type CSSTree<T extends string = any> = CSSProps &
  { [P in T]?: CSSTree<T> };
export type CSSMap = { [k: string]: CSSProps };

export type PropsTransform = (style: CSSProps, ...args: any[]) => CSSProps;
export type TreeTransform = (style: CSSTree, ...args: any[]) => CSSTree;
export type MapTransform = (style: CSSMap, ...args: any[]) => CSSMap;

export type TransformConfig = any[] | CSSTree | Falsy;

export type StyleTransforms = Obj<MapTransform>;
