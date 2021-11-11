import React, { useRef } from 'react'
import {
  View,
  Text as DripText,
  createThemedComponent,
  DripsyProvider,
  Container,
  Pressable,
  makeTheme,
  TextInput as DripsyInput,
  useResponsiveValue,
} from 'dripsy'
// Import from core
import { H4 } from '@dripsy/core'
import { Gradient } from '@dripsy/gradient'
import { Text, TextInput, View as NativeView } from 'react-native'

const theme = makeTheme({
  colors: {
    primary: 'orange',
    secondary: 'black',
    background: 'white',
    callout: 'pink',
    accent: 'green',
    muted: 'gray',
    warning: 'yellow',
    error: 'red',
    gray: '#888',
  },
  space: {
    $none: 0,
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
    $6: 128,
    $7: 256,
    $8: 512,
  },
  types: {
    onlyAllowThemeValues: {
      // let's only restrict colors!
      // colors: 'always',
    },
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
      shadowColor: 'background',
    },
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
  textShadows: {
    onImage: {
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      textShadowColor: 'gray',
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
  // space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  // space: {
  //   $0: 0,
  //   $1: 4,
  //   $2: 8,
  //   $3: 16,
  //   $4: 32,
  //   $5: 64,
  //   $6: 128,
  //   $7: 256,
  //   $8: 512,
  // },
  fontWeights: {
    black: '500',
  },
  // types: {
  //   onlyAllowThemeValues: {
  //     // space: 'always',
  //     // colors: 'always',
  //   },
  //   reactNativeTypesOnly: false,
  // },
})

const G = createThemedComponent(Text, {
  themeKey: 'text',
})

const ResponsiveSquare = () => {
  // Return literal values:
  const textColor = useResponsiveValue(['red', 'green', 'blue'])
  // Or provide a function to access theme values:
  const squareColor = useResponsiveValue((theme) => [theme?.colors?.background])

  const ref = useRef<NativeView>(null)
  const input = useRef<TextInput>(null)

  return (
    <View
      sx={{
        bg: 'cool',
        padding: ['$3'],
      }}
      variant="colors.gray"
      variants={['secondary.fontSize']}
    >
      <View ref={ref} />
      <DripsyInput ref={input} />
      <DripText
        sx={{ color: 'accent' }}
        variants={['primary']}
        variant="primary"
      >
        Hello
      </DripText>
    </View>
  )
}

type MyTheme = typeof theme

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}

export default function App() {
  const [state, toggleState] = React.useReducer((s) => !s, true)
  return (
    <DripsyProvider theme={theme}>
      <Container>
        <View
          sx={{
            textShadowColor: 'accent',
          }}
          variant="colors.cool"
        >
          <H4
            sx={(theme) => ({
              boxShadow: [null, 'md'],
              textShadow: 'onImage',
              variant: 'primary',
              fontWeight: 400,
            })}
          >
            Intellisense for shadows!
          </H4>
          <G variant="secondary">Hey</G>
          <G>Hi!</G>

          <View sx={{ p: '$1' }}>
            <Text>Card</Text>
          </View>

          <ResponsiveSquare />
          <Gradient sx={{ height: 50, width: 50, my: '$3' }} gradient="light" />
          <Pressable
            onPress={toggleState}
            style={({ hovered, pressed }) => ({
              backgroundColor: pressed ? 'green' : hovered ? 'cyan' : 'white',
            })}
            // sx={(theme) => ({
            //   bg: theme.colors.primary,
            // })}
          >
            {({ pressed }) => (
              <View
                sx={{
                  flex: 1,
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
