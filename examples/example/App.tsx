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

const theme = makeTheme({
  colors: {
    primary: '#41b87a',
    secondary: 'black',
    background: 'white',
    red: 'red',
    green: 'green',
    blue: 'blue',
  },
  text: {
    primary: {
      fontSize: 40,
      color: 'green',
    },
    secondary: {
      fontSize: 60,
      color: 'blue',
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
  linearGradients: {
    strong: ['primary', 'secondary'],
    light: ['red', 'green'],
  },
  layout: {
    wide: {},
    narrow: {},
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
        bg: squareColor,
        mt: 1,
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
          sx={(theme) => ({
            backgroundColor: theme.colors['primary'],
            height: [400, 800],
          })}
        >
          <H4
            variants={['secondary']}
            sx={{ color: 'text', mb: 2, mt: 0, fontSize: [5] }}
          >
            Test
          </H4>
          <G variant="primary">Hey</G>
          <G>Hi!</G>
          <View sx={{ bg: 'white', boxShadow: 'md' }}>
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
