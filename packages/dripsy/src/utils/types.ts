import type { Theme } from '@theme-ui/css'

export type DripsyTheme = Theme & {
  /**
   * Specify custom fonts you want to use.
   *
   * For context: https://github.com/nandorojo/dripsy/issues/51
   *
   * The key should be the name of the font you will use throughout your app. For example, `arial`.
   *
   * The value should be a dictionary whose keys correspond to font weights. The values should be font file names.
   *
   * @example
   * ```js
   * const theme = {
   *   customFonts: {
   *     arial: {
   *       bold: 'arialBold',
   *       '500': 'arialSemiBold',
   *     }
   *   }
   * }
   * ```
   *
   * A more elaborate example:
   *
   * ```jsx
   * const theme = {
   *   customFonts: {
   *     arial: {
   *       bold: 'arialBold',
   *       '400': 'arial',
   *       default: 'arial' // if no font family is specified, we use this, or fallback to 400
   *     }
   *   },
   *   fonts: {
   *     body: 'arial',
   *   },
   *   text: {
   *     body: {
   *       fontFamily: 'body',
   *       fontWeight: '400'
   *     }
   *   }
   * }
   * ```
   *
   *
   */
  customFonts?: {
    [key: string]: Record<string, unknown> | undefined
  }
}
