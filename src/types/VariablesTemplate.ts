import { SolvedTheme } from '../styles/Themes'

export interface VariableTemplate {
  readonly [key: string]: string | ((theme: SolvedTheme) => string)
}
