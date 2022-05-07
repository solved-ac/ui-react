import {
  darken,
  lighten,
  readableColor as polishedReadableColor
} from 'polished'
import { SolvedTheme } from '../styles/Themes'

export const readableColor = (color: string, theme: SolvedTheme): string => {
  return polishedReadableColor(
    color,
    theme.color.text.primary.dark,
    theme.color.text.primary.light,
    false
  )
}

export const computeHoverColor = (
  backgroundColor: string,
  hoverColor?: string
): string => {
  if (typeof hoverColor === 'string') return hoverColor
  return polishedReadableColor(
    backgroundColor,
    darken(0.1, backgroundColor),
    lighten(0.2, backgroundColor),
    false
  )
}
