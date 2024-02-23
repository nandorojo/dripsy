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
  ActivityIndicator,
  styled,
  H4,
  ScrollView,
  Sx,
} from 'dripsy'
// Import from core
import { Gradient } from 'dripsy/gradient'
import {
  Text,
  TextInput,
  View as NativeView,
  KeyboardAvoidingView,
} from 'react-native'

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
    nested: {
      one: '',
    },
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
      colors: 'always',
      space: 'always',
    },
    // strictVariants: true,
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
  buttons: {
    primary: {
      backgroundColor: 'primary',
    },
  },
  radii: {
    niceBorderRadius: 10,
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
  aliases: {
    www: 'color',
  },
})

const G = createThemedComponent(Text, {
  themeKey: 'text',
  defaultVariant: 'primary',
})

const WithVariant = styled(Text, {
  themeKey: 'text',
})()

const WithSecondVariant = styled(WithVariant, {
  themeKey: 'buttons',
})()

const FinalWithVariant = () => <WithSecondVariant variant="primary" />

export const MyView = styled(NativeView)({})
export type MyViewElement = React.ElementRef<typeof MyView>
export type TestElement = MyViewElement extends never ? never : 'ok'
// should not have TS errors because element type should not be never ✅
export const testElement: { el: TestElement } = { el: 'ok' }

export const ExtendedComp = styled(KeyboardAvoidingView)({})

export const ExtendedCompWithExtraProps = styled<
  React.ComponentProps<typeof KeyboardAvoidingView> & { custom?: boolean }
>(KeyboardAvoidingView)({})

export const ExtendedCompWithExtraProps2 = styled(KeyboardAvoidingView)<
  React.ComponentProps<typeof KeyboardAvoidingView> & { custom?: boolean }
>({})

export const ExtendA = () => (
  <ExtendedComp
    /* @ts-expect-error behavior cannot be 'test' */
    behavior="test"
  />
)
/* should not error */
export const ExtendB = () => <ExtendedComp behavior="padding" />
export const ExtendC = () => (
  <ExtendedComp
    /* @ts-expect-error custom does not exist */
    custom="test"
  />
)
export const ExtendE = () => (
  <ExtendedCompWithExtraProps
    /* @ts-expect-error behavior cannot be 'test' */
    behavior="test"
  />
)
/* should not error */
export const ExtendF = () => <ExtendedCompWithExtraProps behavior="padding" />
export const ExtendG = () => (
  <ExtendedCompWithExtraProps
    /* @ts-expect-error custom cannot be string */
    custom="test"
  />
)
/* should not error */
export const ExtendH = () => <ExtendedCompWithExtraProps custom={false} />
export const ExtendI = () => <ExtendedCompWithExtraProps2 behavior="height" />

/* should not error */
export const ExtendJ = () => <ExtendedCompWithExtraProps2 behavior="padding" />

export const ExtendK = () => (
  <ExtendedCompWithExtraProps2
    /* @ts-expect-error custom cannot be string */
    custom="test"
  />
)

/* should not error */
export const ExtendL = () => <ExtendedCompWithExtraProps2 custom />

const sx: Sx = {}

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
        bg: 'background',
        padding: ['$3'],
        pb: (theme) => 0,
        paddingHorizontal: '$4',
        marginVertical: '$0',
        variant: 'buttons.primary',
        // use default aliases
        br: 'niceBorderRadius',
        // and your own
        www: 'accent',
        ...sx,
      }}
      variant="buttons.primary"
    >
      <View ref={ref} />
      <DripsyInput ref={input} placeholderTextColor="accent" />
      <DripText
        sx={{ color: 'accent', px: '$0' }}
        variants={['primary']}
        variant="primary"
      >
        Hello
      </DripText>
      <ActivityIndicator color="callout" />
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
      <ScrollView variant="buttons.primary" />
      <Container variant="narrow">
        <View
          sx={{
            color: 'primary',
          }}
          variant="shadows.md"
        >
          <H4
            sx={{
              boxShadow: [null, 'md'],
              textShadow: 'onImage',
              variant: 'text.primary',
              fontWeight: 400,
              transform: [
                {
                  translateX: 1,
                },
              ],
              flex: 1,
            }}
            variant="primary"
          >
            Intellisense for shadows!
          </H4>
          <G variant="primary">Hey</G>
          <G>Hi!</G>

          <View sx={{ p: '$1' }}>
            <Text>Card</Text>
          </View>

          <ResponsiveSquare />
          <Gradient
            sx={{ height: 50, w: 50, my: '$3' }}
            gradient="strong"
            variant="layout.wide"
            colors={['accent', 'nested.one']}
          />
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
