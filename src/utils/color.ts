import Color from 'color'
import { SolvedTheme } from '../styles/Themes'

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
