import React from 'react'
import {
  View,
  Text as DripText,
  createThemedComponent,
  useResponsiveValue,
  DripsyProvider,
  Container,
  Pressable,
  makeTheme,
} from 'dripsy'
// Import from core
import { H4 } from '@dripsy/core'
import { Gradient } from '@dripsy/gradient'
import { Text } from 'react-native'

const theme = makeTheme({
  useBodyStyles: false,
  useLocalStorage: false,
  useCustomProperties: false,
  useColorSchemeMediaQuery: false,
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
    wide: {
      width: 199,
    },
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

  return (
    <View
      sx={{
        width: [100, 120, 150],
        height: [100, 120, 150],
        bg: squareColor,
        mt: 1,
      }}
    >
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
      <Container variants={['wide', 'narrow']}>
        <View
          sx={(theme) => ({
            backgroundColor: theme.colors.green,
            height: [400, 800],
            color: 'shadows.shadowRadius',
            bg: ['blue', null],
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
          <Gradient
            sx={{ height: 50, width: 50, my: 16 }}
            gradient=""
            colors={['primary', 'secondary', '#234fdf']}
          />
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
