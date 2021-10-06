import { useDripsyTheme } from 'dripsy'

const useItemStyle = () => {
  const { theme } = useDripsyTheme()

  return {
    color: theme.colors.coolzie,
    shadow: theme.shadows.md,
  }
}
