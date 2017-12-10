import CSSProps from './cssProperties';

export type Falsy = null | undefined | false;

export type Obj<T = any> = { [key: string]: T };

export { default as CSSProps } from './cssProperties';
export type CSSTree<T extends string = any> =
  | CSSProps
  | (CSSProps & { [P in T]: CSSTree<T> });
export type CSSMap = { [k: string]: CSSProps };

export type Transform<T = CSSProps | CSSTree | CSSMap> = (
  style: T,
  ...args: any[]
) => T;

export type TransformConfig = any[] | CSSTree | Falsy;

export type StyleTransforms = Obj<Transform<CSSMap>>;
