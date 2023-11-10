export const resolveLocale = (
  localeString: string | undefined
): string | undefined => {
  if (!localeString) return undefined
  try {
    new Date().toLocaleString(localeString)
    return localeString
  } catch (error) {
    return undefined
  }
}
