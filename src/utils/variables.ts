import { transparentize } from 'polished'
import { SolvedTheme } from '../styles'
import { computeHoverColor as h } from './color'

export const cardHoverTemplate = {
  backgroundColor: (theme: SolvedTheme) => theme.color.background.card.main,
  textColor: (theme: SolvedTheme) => theme.color.text.primary.main,
  hoverBackgroundColor: (theme: SolvedTheme) =>
    h(theme.color.background.card.main),
  hoverTextColor: (theme: SolvedTheme) => theme.color.text.primary.main,
}

export const transparentHoverTemplate = {
  backgroundColor: (theme: SolvedTheme) =>
    transparentize(1, theme.color.background.card.main),
  textColor: (theme: SolvedTheme) => theme.color.text.primary.main,
  hoverBackgroundColor: (theme: SolvedTheme) =>
    theme.color.background.card.main,
  hoverTextColor: (theme: SolvedTheme) => theme.color.text.primary.main,
}
