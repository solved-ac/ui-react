import { CSSLength } from '../types/length'

export const cssLength = (cssLength?: CSSLength | null | undefined): string => {
  if (typeof cssLength === 'number') {
    return `${cssLength}px`
  }
  return cssLength || '0px'
}
