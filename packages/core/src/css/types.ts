import type { Theme, ThemeUICSSProperties } from '@theme-ui/css'
import type { ComponentType } from 'react'
import { DripsyCustomTheme, DripsyFinalTheme } from '../declarations'
// import { SxStyleProp } from 'theme-ui'

export type ThemedOptions<T = any> = {
  defaultStyle?: SxProp
  themeKey?: string
  defaultVariant?: string
  /**
   * List of multiple variants
   */
  defaultVariants?: string[]
}

// https://github.com/intergalacticspacehighway/react-native-styled-variants/blob/main/src/types.ts
// thank you @nishanbende!
// type Tokenize<Theme> = Extract<
//   keyof {
//     [Key in Extract<keyof Theme, string | number> as Theme[Key] extends
//       | string
//       | number
//       | ''
//       | never
//       | undefined
//       | null
//       ? `${Key}`
//       : // if we're iterating over the key of the theme
//         // for example, if key = 'colors'
//         // and colors: { primary: '...' }
//         // then we should allow either colors.primary, OR colors
//         `${Key}.${Tokenize<Theme[Key]>}`]: true
//   },
//   string | number
// >

type HiddenArrayKeys = Exclude<keyof [], number>

type SafeTokenized<
  Theme,
  IsFirstIteration extends boolean,
  Key extends Extract<keyof Theme, string | number>,
  AllowsRootKeys extends boolean = false,
  Tokenized extends Tokenize<Theme[Key], IsFirstIteration> = Tokenize<
    Theme[Key],
    IsFirstIteration
  >
> = IsFirstIteration extends true
  ? AllowsRootKeys extends false // exclude the first key from the options
    ? // for example: { colors: { primary: { 100: '' } } } would result in 'primary' or 'primary.100'
      Tokenize<Theme[Key], false>
    : Tokenize<Theme[Key], false> | `${Key}.${Tokenize<Theme[Key], false>}`
  : // we're not on the first iteration, so we can return colors or colors.${keyof colors}
    // this was created as a generic to make it only once
    Tokenized | `${Key}.${Tokenized}`
// IsFirstIteration extends true
//   ? Tokenized | `${Key}.${Tokenized}`
// : `${Key}.${Tokenize<Theme[Key], false>}`

type Tokenize<Theme, IsFirstIteration extends boolean> = Extract<
  keyof {
    [Key in Extract<keyof Theme, string | number> as Theme[Key] extends
      | string
      | number
      | ''
      | never
      | undefined
      | null
      ? Key extends HiddenArrayKeys
        ? `${number}`
        : `${Key}`
      : Theme[Key] extends undefined
      ? `${Key}`
      : // if we're iterating over the key of the theme
        // for example, if key = 'colors'
        // and colors: { primary: '...' }
        // then we should allow either colors.primary, OR colors
        // `${Key}.${Tokenize<Theme[Key]>}`
        SafeTokenized<Theme, IsFirstIteration, Key, true>]: true
  },
  string | number | '' | never | undefined | null
>

type ThemeWithoutIgnoredKeys = Omit<
  DripsyCustomTheme,
  | 'breakpoints'
  | 'customFonts'
  | 'useBodyStyles'
  | 'useLocalStorage'
  | 'useCustomProperties'
  | 'useColorSchemeMediaQuery'
>

// type RecursiveRequired<T> = NonNullable<
//   {
//     [P in keyof Required<T>]: NonNullable<RecursiveRequired<T[P]>>
//   }
// >

type RequiredTheme = Required<ThemeWithoutIgnoredKeys>

type Sx = {
  [key in keyof ThemeUICSSProperties]?:
    | Tokenize<RequiredTheme, true>
    | (ThemeUICSSProperties[key] & {})
}

// const sx: {
//   color: Tokenize<
//     {
//       hi: {
//         nice: {
//           one: 1
//           b: {
//             ok: ''
//           }
//         }
//       }
//     },
//     true
//   >
// } = {
//   color: 'nice.ok',
// }

type SxProp = Sx | ((theme: DripsyFinalTheme) => Sx)

export type StyledProps<P = any> = {
  as?: ComponentType<any>
  variant?: string
  themeKey?: string
  sx?: SxProp
  /**
   * Optional style value to pass react native styles that aren't available in the `sx` prop, such as shadows.
   */
  // TODO uhh fix this mess
  // @ts-ignore
  style?: P['style'] extends [] ? P['style'][number] : P['style']
  variants?: string[]
}
