import type { CSSObject } from '@theme-ui/css'
import { StyleSheet } from 'react-native'

const cache: Record<
  string,
  {
    dripsyStyle: Record<string, unknown>
  }
> = {}

/**
 * @deprecated
 */
export class StyleSheetCache {
  static get(style: CSSObject) {
    const string = JSON.stringify(style || {})
    if (!cache.hasOwnProperty(string) || !cache[string]) {
      cache[string] = StyleSheet.create({
        dripsyStyle: JSON.parse(string),
      })
    }
    return cache[string].dripsyStyle
  }
}
