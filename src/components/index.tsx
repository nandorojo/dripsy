import { createThemedComponent } from '../css/create-themed-component'
import {
  // TODO I could import * as Native, but would that break tree shaking?
  View as rView,
  Text as rText,
  ScrollView as rScrollView,
  TextInput as rTextInput,
  FlatList as rFlatList,
  ActivityIndicator as rActivityIndicator,
  Button as rButton,
  SafeAreaView as rSafeAreaView,
} from 'react-native'

import * as HTML from '@expo/html-elements'

export const View = createThemedComponent(rView)

export const Text = createThemedComponent(rText, {
  themeKey: 'text',
})

export const H1 = createThemedComponent(HTML.H1, {
  themeKey: 'text',
  defaultVariant: 'h1',
})

export const H2 = createThemedComponent(HTML.H2, {
  themeKey: 'text',
  defaultVariant: 'h2',
})

export const H3 = createThemedComponent(HTML.H3, {
  themeKey: 'text',
  defaultVariant: 'h3',
})

export const H4 = createThemedComponent(HTML.H4, {
  themeKey: 'text',
  defaultVariant: 'h4',
})

export const H5 = createThemedComponent(HTML.H5, {
  themeKey: 'text',
  defaultVariant: 'h5',
})

export const H6 = createThemedComponent(HTML.H6, {
  themeKey: 'text',
  defaultVariant: 'h6',
})

export const A = createThemedComponent(HTML.A, {
  themeKey: 'text',
  defaultVariant: 'a',
})

export const ScrollView = createThemedComponent(rScrollView)

export const TextInput = createThemedComponent(rTextInput)

export const Button = createThemedComponent(rButton, {
  themeKey: 'buttons',
})

export const FlatList = createThemedComponent(rFlatList)

export const ActivityIndicator = createThemedComponent(rActivityIndicator)

export const Flex = createThemedComponent(rView, {
  defaultStyle: {
    flexDirection: 'row',
  },
})

export const Container = createThemedComponent(rView, {
  defaultVariant: 'container',
  themeKey: 'layout',
  defaultStyle: {
    mx: 'auto',
    maxWidth: 'container',
    width: '100%',
  },
})

export const SafeAreaView = createThemedComponent(rSafeAreaView)

export const Row = Flex

export const Box = View
