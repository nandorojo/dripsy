import React from 'react'
import {
  View,
  Text as DripText,
  createThemedComponent,
  useResponsiveValue,
  DripsyProvider,
  Container,
  Theme,
} from 'dripsy'
// Import from core
import { H4 } from '@dripsy/core'
import { Text } from 'react-native'

const theme = {
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
}

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
    theme?.colors?.green,
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

export default function App() {
  return (
    <DripsyProvider theme={(theme as unknown) as Theme}>
      <Container>
        <View
          sx={{
            backgroundColor: () => ['primary', 'white'],
            height: [400, 800],
          }}
        >
          <H4 sx={{ color: 'text', mb: 2, mt: 0, fontSize: [5] }}>Test</H4>
          {/* <Pressable>
            {({ pressed }) => (
              <DripText sx={{ cursor: 'pointer' }}>
                {pressed ? 'Joi!' : 'Press Me'}
              </DripText>
            )}
          </Pressable> */}
          <G variant="primary">Hey</G>
          <G>Hi!</G>
          <View sx={{ bg: 'white', boxShadow: 'md' }}>
            <Text>Card</Text>
          </View>
          <ResponsiveSquare />
        </View>
      </Container>
    </DripsyProvider>
  )
}
