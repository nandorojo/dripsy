import React, { useRef } from 'react'
import {
  View,
  Text as DripText,
  createThemedComponent,
  useResponsiveValue,
  DripsyProvider,
  Container,
  Pressable,
  makeTheme,
  TextInput as DripsyInput,
} from 'dripsy'
// Import from core
import { H4 } from '@dripsy/core'
import { Gradient } from '@dripsy/gradient'
import { Text, TextInput, View as NativeView } from 'react-native'
import { MaybeTokenizedValue } from '../../packages/core/src/css/types'

const theme = makeTheme({
  colors: {
    primary: 'orange',
    secondary: 'black',
    background: 'white',
    gray: 'green',
    accent: 'green',
    cool: 'gray',
  },
  text: {
    primary: {
      fontSize: 40,
    },
    secondary: {
      fontSize: 60,
    },
  },
  sizes: {
    container: 700,
  },
  shadows: {
    md: {
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.8,
      shadowRadius: 14,
      elevation: 25,
    },
  },
  textShadows: {
    onImage: {
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      textShadowColor: '#00000099',
    },
  },
  linearGradients: {
    strong: ['primary', 'secondary'],
    light: ['red', 'green'],
  },
  layout: {
    wide: {},
    narrow: {},
  },
  space: {
    0: '0',
    1: '4',
  },
  // space: [0, 1, 2],
  fontWeights: {
    big: 'bold',
  },
})

const G = createThemedComponent(Text, {
  themeKey: 'text',
})

const ResponsiveSquare = () => {
  // Return literal values:
  const textColor = useResponsiveValue(['red', 'green', 'blue'])
  // Or provide a function to access theme values:
  const squareColor = useResponsiveValue((theme) => [
    theme?.colors?.blue,
    theme?.colors?.red,
    theme?.colors?.background,
  ])

  const ref = useRef<NativeView>(null)
  const input = useRef<TextInput>(null)

  return (
    <View
      sx={{
        width: [100, 120, 150],
        height: [100, 120, 150],
        mt: 1,
        color: '',
        fontWeight: 'big',
        padding: '1',
        bg: 'accent',
      }}
    >
      <View ref={ref} />
      <DripsyInput ref={input} />
      <DripText sx={{ color: textColor }}>Hello</DripText>
    </View>
  )
}

type MyTheme = typeof theme
declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}

export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <Container>
        <View
          sx={{
            textShadow: ['onImage'],
            textShadowColor: '',
            bg: 'primary',
          }}
          variant="colors.cool"
        >
          <H4
            sx={{
              boxShadow: 'md',
              textShadow: '',
            }}
          >
            Intellisense for shadows!
          </H4>
          <G variant="secondary">Hey</G>
          <G>Hi!</G>
          <View sx={{ p: '' }}>
            <Text>Card</Text>
          </View>
          <ResponsiveSquare />
          <Gradient sx={{ height: 50, width: 50, my: 16 }} gradient="light" />
          <Pressable
            sx={{
              height: 50,
            }}
          >
            {({ pressed }) => (
              <View
                sx={{
                  flex: 1,
                  backgroundColor: pressed ? 'green' : 'red',
                }}
              >
                <Text>You can press me!</Text>
              </View>
            )}
          </Pressable>
        </View>
      </Container>
    </DripsyProvider>
  )
}
