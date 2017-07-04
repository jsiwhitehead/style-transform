import { CSSProps, Obj } from '../typings';
import { flatten, isObject, unique } from '../utils';

import expandFor from './expandFor';

const dirProps = {
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  borderWidth: [
    'borderWidthTop',
    'borderWidthRight',
    'borderWidthBottom',
    'borderWidthLeft',
  ],
};
const dirs = ['Top', 'Right', 'Bottom', 'Left'];

const round = (value: number) =>
  value > 0 ? Math.round(value) : -Math.round(-value);

export default function scale(
  style: CSSProps | undefined,
  scales: Obj<number | Obj<number>> = {},
): CSSProps {
  const scaleProps = Object.keys(scales);
  const allProps = unique(
    [
      ...scaleProps,
      ...flatten(
        scaleProps
          .filter(k => isObject(scales[k]))
          .map(k => Object.keys(scales[k])),
      ),
    ].map(k => dirProps[k] || k),
  );

  const expanded = expandFor(style, ...allProps);
  const result = { ...expanded };

  for (const key of scaleProps) {
    if (!dirProps[key]) {
      if (typeof scales[key] === 'number') {
        result[key] = round(
          parseFloat(expanded[key] || 0) * (scales[key] as number),
        );
      } else {
        result[key] = round(
          Object.keys(scales[key]).reduce(
            (res, k) => res + parseFloat(expanded[k] || 0) * scales[key][k],
            0,
          ),
        );
      }
    } else {
      for (const d of dirs) {
        const dKey = `${key}${d}`;
        if (typeof scales[key] === 'number') {
          result[dKey] = round(
            parseFloat(expanded[dKey] || 0) * (scales[key] as number),
          );
        } else {
          result[dKey] = round(
            Object.keys(scales[key]).reduce(
              (res, k) =>
                res +
                parseFloat(expanded[dirProps[k] ? `${k}${d}` : k] || 0) *
                  scales[key][k],
              0,
            ),
          );
        }
      }
    }
  }

  return result;
}
