import React from 'react'
import {
  View,
  DripsyProvider,
  Text as DripText,
  createThemedComponent,
  useResponsiveValue,
  H1,
  Button,
  Container,
  Text as DText,
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
  const squareColor = useResponsiveValue(theme => [
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
    <DripsyProvider theme={theme} options={{ ssr: true }}>
      <Container>
        <View
          sx={{
            backgroundColor: () => ['primary', 'white'],
            height: [400, 800],
          }}
        >
          <H1>Bonjour</H1>
          <Text>Does this complain?</Text>
          <DripText>joi</DripText>
          <DText>Test</DText>
          <G variant="primary">Hey</G>
          <T>Hi!</T>
          <ResponsiveSquare />
          <View>
            <Button
              sx={{ backgroundColor: 'green' }}
              title="Click Me!!!"
              onPress={() => console.log('Universal button')}
            />
          </View>
        </View>
      </Container>
    </DripsyProvider>
  )
}
