import { CSSObject, ThemeUIStyleObject } from '@theme-ui/css'
import { StyleSheet } from 'react-native'

const cache: Record<
  string,
  {
    dripsyStyle: Record<string, unknown>
  }
> = {}

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

const webContainerCache: Record<string, ThemeUIStyleObject> = {}

export const getWebContainerCachedStyle = (sx: ThemeUIStyleObject) => {
  const string = JSON.stringify(sx || {})
  if (!webContainerCache.hasOwnProperty(string) || !webContainerCache[string]) {
    webContainerCache[string] = sx
  }

  return webContainerCache[string]
}
