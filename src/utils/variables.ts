import { SolvedTheme } from '../styles'
import { computeHoverColor as h } from './color'

export const cardTemplate = {
  backgroundColor: (theme: SolvedTheme) => theme.color.background.card.main,
  textColor: (theme: SolvedTheme) => theme.color.text.primary.main,
  hoverBackgroundColor: (theme: SolvedTheme) =>
    h(theme.color.background.card.main),
  hoverTextColor: (theme: SolvedTheme) => theme.color.text.primary.main,
}