import React from 'react'
import {
  View,
  Text as DripText,
  createThemedComponent,
  useResponsiveValue,
  DripsyProvider,
  Container,
  styled,
  makeTheme,
} from 'dripsy'
import { Text } from 'react-native'

// recursive use of styled() 🥸
const Blue = styled(
  styled(View)((props: { blue: boolean[]; size: number }) => ({
    bg: props.blue.map((blue) => (blue ? 'blue' : 'green')),
    size: props.size,
  }))
)()

// works with memo, just not in-line
const MemoBlue = React.memo(Blue)

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
    <DripsyProvider theme={theme}>
      <Container>
        <MemoBlue size={200} blue={[false, false, true]} />
        <View
          sx={{
            backgroundColor: () => ['primary', 'white'],
            height: [400, 800],
          }}
        >
          <DripText>joi</DripText>
          <G variant="primary">Hey</G>
          <G>Hi!</G>
          <View
            sx={{ bg: 'white' }}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              // elevation: 5,
            }}
          >
            <Text>Card</Text>
          </View>
          <ResponsiveSquare />
        </View>
      </Container>
    </DripsyProvider>
  )
}
