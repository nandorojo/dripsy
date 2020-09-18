import React from 'react'
import {
  View as rView,
  Text as rText,
  ScrollView as rScrollView,
  FlatList as rFlatList,
  ActivityIndicator as rActivityIndicator,
  SafeAreaView as rSafeAreaView,
  KeyboardAvoidingView as rKeyboardAvoidingView,
  Picker as rPicker,
  SectionList as rSectionList,
  StatusBar as rStatusBar,
  TouchableHighlight as rTouchableHighlight,
  TouchableOpacity as rTouchableOpacity,
  TouchableWithoutFeedback as rTouchableWithoutFeedback,
  VirtualizedList as rVirtualizedList,
  YellowBox as rYellowBox,
  Image as rImage,
  ImageBackground as rImageBackground,
  Button as rButton,
  Switch as rSwitch,
  ViewProps,
  TextInput as rTextInput,
} from 'react-native'
import { createThemedComponent } from '../css/create-themed-component'
import * as HTML from '@expo/html-elements'

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

export const P = createThemedComponent(HTML.P, {
  themeKey: 'text',
  defaultVariant: 'p',
})

export const Hr = createThemedComponent(HTML.HR, {
  themeKey: 'hr',
  defaultStyle: {
    color: 'gray',
    m: 0,
    my: 2,
    border: 0,
    borderBottom: '1px solid',
  },
})

export const View = createThemedComponent(rView)

export const Text = createThemedComponent(rText)

export const ScrollView = createThemedComponent(rScrollView)

export const FlatList = createThemedComponent(rFlatList)

export const ActivityIndicator = createThemedComponent(rActivityIndicator)

export const SafeAreaView = createThemedComponent(rSafeAreaView)

export const Picker = createThemedComponent(rPicker)

export const SectionList = createThemedComponent(rSectionList)

export const StatusBar = createThemedComponent(rStatusBar)

export const KeyboardAvoidingView = createThemedComponent(rKeyboardAvoidingView)

export const TouchableHighlight = createThemedComponent(rTouchableHighlight)

export const TouchableOpacity = createThemedComponent(rTouchableOpacity)

export const TouchableWithoutFeedback = createThemedComponent(
  rTouchableWithoutFeedback
)

export const VirtualizedList = createThemedComponent(rVirtualizedList)

export const YellowBox = createThemedComponent(rYellowBox)

export const Switch = createThemedComponent(rSwitch, {
  themeKey: 'switch',
  defaultStyle: {},
})

export const TextInput = createThemedComponent(rTextInput, {
  themeKey: 'input',
  defaultStyle: {},
})

export const Image = createThemedComponent(rImage, {
  themeKey: 'images',
  defaultStyle: {
    maxWidth: '100%',
    height: 'auto',
  },
})

export const Avatar = createThemedComponent(rImage, {
  defaultVariant: 'avatar',
  defaultStyle: {
    borderRadius: 9999,
  },
})

export const ImageBackground = createThemedComponent(rImageBackground, {
  themeKey: 'images',
  defaultVariant: 'background',
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

export const Flex = createThemedComponent(rView, {
  defaultStyle: {
    flexDirection: 'row',
  },
})

// TODO: Replace any with sx prop
export const Badge = createThemedComponent(
  ({
    text,
    textStyles,
    ...props
  }: ViewProps & { text?: string; textStyles: any }) => (
    <Flex {...props}>
      <Text sx={{ color: 'white', textStyles }}>{text}</Text>
    </Flex>
  ),
  {
    defaultVariant: 'primary',
    themeKey: 'badge',
    defaultStyle: {
      bg: 'primary',
      padding: 2,
    },
  }
)

export const Card = createThemedComponent(rView, {
  themeKey: 'card',
  defaultVariant: 'primary',
})

export const Row = Flex

export const Box = View

export const Divider = Hr

export const Link = A

export const Heading = H2
