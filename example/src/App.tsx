import React from 'react'
import {
  View,
  ThemeProvider,
  Text as DripText,
  createThemedComponent,
  useResponsiveValue,
  H1,
} from 'dripsy'
import { Text } from 'react-native'
import styled from 'styled-components'

const theme = {
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
      ':hover': {
        color: 'green',
      },
    },
  },
}

const T = styled(Text)(() => ({
  fontSize: 70,
}))
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
    <ThemeProvider theme={theme}>
      <View
        sx={{
          backgroundColor: () => ['primary', 'blue'],
          height: [400, 800],
        }}
      >
        <DripText as="p">joi</DripText>
        <G variant="primary">Hey</G>
        <T>Hi!</T>
        <ResponsiveSquare />
      </View>
    </ThemeProvider>
  )
}
