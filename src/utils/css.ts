import { CSSLength } from '../styles'
import { cssLength } from './length'

export const cssAdd = (a: CSSLength, b: CSSLength): CSSLength => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b
  }
  return `calc(${cssLength(a)} + ${cssLength(b)})`
}

export const cssSub = (a: CSSLength, b: CSSLength): CSSLength => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }
  return `calc(${cssLength(a)} - ${cssLength(b)})`
}

export const cssMul = (a: CSSLength, b: number): CSSLength => {
  if (typeof a === 'number') {
    return a * b
  }
  return `calc(${cssLength(a)} * ${b})`
}

export const cssDiv = (a: CSSLength, b: number): CSSLength => {
  if (typeof a === 'number') {
    return a / b
  }
  return `calc(${cssLength(a)} / ${b})`
}
