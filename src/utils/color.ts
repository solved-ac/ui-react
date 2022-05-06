import { readableColor as polishedReadableColor } from 'polished'
import { SolvedTheme } from '../styles/Themes'

export const readableColor = (color: string, theme: SolvedTheme): string => {
  return polishedReadableColor(
    color,
    theme.color.text.primary.dark,
    theme.color.text.primary.light,
    false
  )
}
