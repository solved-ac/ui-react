import Color from 'color'
import { SolvedTheme } from '../styles/Themes'

export function c(color: null): null
export function c(color: undefined): undefined
export function c(color: string | Color): Color
export function c(color: TemplateStringsArray): Color

export function c(
  color: null | undefined | string | Color | TemplateStringsArray
): null | undefined | Color {
  if (color === null || color === undefined) return color
  if (typeof color === 'string') return new Color(color)
  if (color instanceof Color) return color
  return c(color.join(''))
}

export const primaryTextOnBackground = (
  background: Color | string,
  theme: SolvedTheme
): Color => {
  const testColor = new Color(background)
  return testColor.isLight()
    ? theme.color.text.primary.dark
    : theme.color.text.primary.light
}

export const secondaryTextOnBackground = (
  background: Color | string,
  theme: SolvedTheme
): Color => {
  const testColor = new Color(background)
  return testColor.isLight()
    ? theme.color.text.secondary.dark
    : theme.color.text.secondary.light
}
