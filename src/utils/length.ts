import { CSSLength } from '../styles'

export const cssLength = (cssLength?: CSSLength | null | undefined): string => {
  if (typeof cssLength === 'number') {
    return `${cssLength}px`
  }
  return cssLength || '0px'
}
