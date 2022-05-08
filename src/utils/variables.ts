import { transparentize } from 'polished'
import { computeHoverColor as h } from './color'
import { cssVariables } from './styles'

export const buttonVariables = cssVariables(
  {
    backgroundColor: (theme) => theme.color.background.card.main,
    textColor: (theme) => theme.color.text.primary.main,
    hoverBackgroundColor: (theme) => h(theme.color.background.card.main),
    hoverTextColor: (theme) => theme.color.text.primary.main,
    hoverShadow: (theme) =>
      theme.styles.shadow(h(theme.color.background.card.main), 8),
    activeShadow: (theme) =>
      theme.styles.shadow(h(theme.color.background.card.main), 4),
  },
  'button'
)

export const cardVariables = cssVariables(
  {
    backgroundColor: (theme) => theme.color.background.card.main,
    textColor: (theme) => theme.color.text.primary.main,
    hoverBackgroundColor: (theme) => h(theme.color.background.card.main),
    hoverTextColor: (theme) => theme.color.text.primary.main,
  },
  'button'
)

export const chipVariables = cssVariables(
  {
    backgroundColor: (theme) => theme.color.background.card.dark,
    textColor: (theme) => theme.color.text.primary.main,
  },
  'chip'
)

export const paginationItemVariables = cssVariables(
  {
    backgroundColor: (theme) =>
      transparentize(1, theme.color.background.card.main),
    textColor: (theme) => theme.color.text.primary.main,
    hoverBackgroundColor: (theme) => h(theme.color.text.primary.main),
    hoverTextColor: (theme) => theme.color.text.primary.inverted,
    activeBackgroundColor: (theme) => h(theme.color.text.primary.main),
    activeTextColor: (theme) => theme.color.text.primary.inverted,
  },
  'pagination-item'
)

export const tabVariables = cssVariables(
  {
    backgroundColor: (theme) =>
      transparentize(1, theme.color.background.card.main),
    textColor: (theme) => theme.color.text.primary.main,
    hoverBackgroundColor: (theme) => h(theme.color.background.card.main),
    hoverTextColor: (theme) => theme.color.text.primary.main,
    accentColor: (theme) => h(theme.color.background.table.header),
  },
  'tab'
)
