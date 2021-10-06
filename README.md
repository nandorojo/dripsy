# 🍷 Dripsy

A **dead-simple**, **responsive** design system for Expo / React Native Web. Heavily inspired by React's [`theme-ui`](https://theme-ui.com/).

**Style once, run anywhere.**

```jsx
<Text
  sx={{
    fontSize: [14, 16, 20], // 14 on mobile, 16 on tablet, 20 on desktop
    color: ['primary', null, 'accent'], // `primary` on mobile & tablet, `accent` on desktop
  }}
>
  Responsive font size?? 🤯
</Text>
```

## **Dripsy v3 is now available**

Zero breaking changes, tons of new features. Check out the [upgrade guide](./docs/v3)

https://user-images.githubusercontent.com/13172299/136265481-4c93d5bb-15e7-4e5f-9464-64748ebf1214.mp4

# 🦦 Features

- [(New in 1.4.x!)](#using-custom-fonts-new-%EF%B8%8F) Custom fonts, edited globally
- TypeScript support (New! TypeScript support is better than ever 🥳)
- Responsive styles
- Universal (Android, iOS, Web, & more)
- Works with Expo
- Works with Vanilla React Native
- Works with Next.js
- Full theme support
- Custom theme variants
- Insanely simple API (themed, responsive designs in one line!)
- Works with Animated/Reanimated values
- Dark mode / custom color modes
- Memoized styles, even when written inline
- Atomic CSS classes, with `StyleSheet.create` under the hood
- Use with `@expo/vector-icons` ([example](https://github.com/nandorojo/dripsy/issues/112))

# 📚 Table of Contents

- [Motivation](#-why)
- [Installation](#-installation)
- [Setup](#-setup)
- [Create a custom theme](#-create-a-custom-theme)
  - [Shadows](#-shadows)
- Expo/React Native Web
- NextJS
- [TypeScript Guide](#typescript-guide)
- Animated Values
- Before & After
- Headless usage (`useSx`)
- API
  - `styled`
- [Custom Fonts](#using-custom-fonts-new-%EF%B8%8F)

# Examples

More examples coming soon!

- Create a browser mockup with Dripsy: [Snack](https://snack.expo.io/@nandorojo/dripsy-browser-mockup)

# 🤔 Why?

**Build once, deploy everywhere,** is a great philosophy made possible by Expo Web/React Native Web. A large impediment is responsive design.

React Native doesn't have media queries for styles, and trying to micmick it with JS turns into `useState` hell with a ton of conditionals (as you'll see [below](#-before--after).)

While React Native has some great component libraries, it lacks a good design system that is responsive and themed.

No longer. The goal of Dripsy is to let you go from idea to universal, themed styles without much effort.

[There](https://github.com/necolas/react-native-web/issues/1177) [is](https://blog.expo.io/media-queries-with-react-native-for-ios-android-and-web-e0b73ed5777b) [no](https://twitter.com/FernandoTheRojo/status/1143897833663270912) [shortage](https://medium.com/miquido/how-to-create-responsive-layouts-in-react-native-7c4cfa15f1de) [of](https://stackoverflow.com/questions/53465796/how-to-handle-responsive-layout-in-react-native) [discussion](https://dev.to/newbiebr/how-to-make-your-react-native-apps-responsive-45d8) [about](https://heartbeat.fritz.ai/handling-responsive-layouts-in-react-native-apps-1494b3f85984) [what](https://uxdesign.cc/implementing-responsive-design-system-to-react-native-238c0cb7503e) [responsive](https://www.npmjs.com/package/react-native-responsive-screen) [design](https://www.telerik.com/blogs/build-mobile-friendly-web-apps-with-react-native-web) [should](https://medium.com/react-native-training/build-responsive-react-native-views-for-any-device-and-support-orientation-change-1c8beba5bc23) [look](https://dzone.com/articles/how-to-add-responsivity-to-react-native-apps) like in React Native.

After trying many, many different ways, I'm convinced this approach is the answer. I'm curious to see if you'll think the same.

# 🙉 Installation

```sh
yarn add dripsy

# or
npm i dripsy
```

If you're using Next.js or another SSR app, scroll down to see how to configure it.

# 🛠 Set up

Technically, you don't have to do anything else!

However, you'll likely want to create a custom theme.

# 🎨 Create a custom theme

Wrap your entire app with the `DripsyProvider`, and pass it a `theme` object. Make sure you create your theme outside of the component to avoid re-renders.

If you're using Next.js, this goes in `pages/_app.js`.

`App.js`

```jsx
import { DripsyProvider, makeTheme } from 'dripsy'

// 1. make your theme
const theme = makeTheme({
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'tomato',
  },
  fonts: {
    root: 'circular',
  },
  // custom fonts are easy!
  customFonts: {
    circular: {
      default: 'Circular-StdBook',
      bold: 'Circular-StdBold',
      black: 'Circular-StdBlack',
    },
  },
  space: {
    // 4px spacing, with 0 first (recommended)
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
    $6: 128,
  },
  text: {
    thick: {
      fontFamily: 'root',
      fontWeight: 'black', // 'Circular-StdBlack'
    },
  },
})

// 2. add typescript support
type MyTheme = typeof theme

declare module 'dripsy' {
  interface DripsyCustomTheme extends MyTheme {}
}

// 3. pass your theme to the provider
export default function App() {
  return (
    <DripsyProvider theme={theme}>
      {/* Your app code goes here! */}
    </DripsyProvider>
  )
}
```

Follow the [docs from `theme-ui`](https://theme-ui.com/theme-spec) to see how to theme your app – we use the same API as them.

My personal preference is to have the entire theme object in one file.

_All theme values are optional. You don't have to use them if you don't want._

## 👻 Shadows

In addition to the values available in `theme-ui`, Dripsy has a few extra fields in the `theme` tailored to React Native's shadows:

### `theme.textShadows`

```ts
const theme = makeTheme({
  textShadows: {
    onImage: {
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 5,
      textShadowColor: '#00000099',
    },
  },
})
```

And in your component, you can reference that shadow with the `textShadow` field.

<img width="440" alt="Screen Shot 2021-09-29 at 10 24 49 AM" src="https://user-images.githubusercontent.com/13172299/135288785-5ec5074e-4fd4-4934-8675-d5c30419d2cb.png">

### `theme.shadows`

The `theme.shadows` is a bit different with Dripsy than `theme-ui`, since React Native doesn't share the web's shadow API.

```ts
const theme = makeTheme({
  shadows: {
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
})
```

In your component, you can use the `boxShadow` property (to reference shadow variants):

<img width="334" alt="Screen Shot 2021-09-29 at 10 25 03 AM" src="https://user-images.githubusercontent.com/13172299/135288783-ea3ed643-de09-4f2d-a538-7d121397a725.png">

## `theme.types`

To get more granular control over your types, you can use the `theme.types` option. Read more about this in the [TypeScript Guide](#typescript-guide).

# Expo / React Native Web

> If you're using Next.js, scroll down to that section.

If you're using Dripsy 1.4 or lower, you're done. However, starting v1.5, you need to customize webpack like so:

If you're using `expo start:web`, this section is for you. If you're using Expo + Next.js, skip to the next section.

`yarn add -D @expo/webpack-config`

Create a custom `webpack.config.js` file:

```js
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['dripsy', '@dripsy/core'],
      },
    },
    argv
  )

  return config
}
```

# Next.js

If you are using SSR without Next.js, skip down to #3 below.

Steps 1 & 2 are required for Next.js apps (for example, if you're using Expo + Next.js.)

**1. Install dependencies**

```sh
yarn add -D next-compose-plugins next-transpile-modules
```

**2. Edit your `next.config.js` file to look like this:**

```js
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'dripsy',
  '@dripsy/core',
  // you can add other packages here that need transpiling
])

const { withExpo } = require('@expo/next-adapter')

module.exports = withPlugins([withTM, [withExpo, { projectRoot: __dirname }]])
```

**3. Set `ssr={true}` on `DripsyProvider`**

```js
// pages/_app.js

export default function App({ pageProps, Component }) {
  return (
    <>
      <DripsyProvider
        ssr
        ssrPlaceholder={<LoadingScreen />} // optional
        theme={theme}
      >
        <Component {...pageProps} />
      </DripsyProvider>
    </>
  )
}
```

What does `ssr: true` do, exactly? All it does is return `null` until your app is mounted (on web). This is because Dripsy uses the `Dimensions` API from `react-native`, which isn't compatible with server-side rendering.

If your app already returns `null` on the first render, then you don't need to set `ssr: true`. For instance, using `react-native-safe-area-context`'s `SafeAreaProvider` already does this for you.

If you're curious how you can still leverage Next.js's great static generation feature for SEO with dynamic meta tags, check out the **SEO Recommendations** section on [this PR](https://github.com/nandorojo/dripsy/pull/101).

---

That's it! Btw, if you're using Expo + Next.js, check out my library, [expo-next-react-navigation](https://github.com/nandorojo/expo-next-react-navigation) to help with navigation.

# 👀 What does Dripsy look like

## Create a theme

```js
export const theme = makeTheme({
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'tomato',
  },
  // set 0 first, then double for consistent nested spacing
  space: {
    // 4px spacing, with 0 first (recommended)
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
    $6: 128,
    $7: 256,
  },
  fontSizes: {
    $0: 12,
    $1: 14,
    $2: 16,
    $3: 18,
    $4: 24,
    $5: 28,
    $6: 32,
  },
  text: {
    h1: {
      fontSize: '$2', // this is 16px, taken from `fontSize` above
    },
    p: {
      fontSize: '$0', // & this is 12px, taken from `fontSize` above
    },
  },
})
```

## ...and build a beautiful, responsive UI

```jsx
<Text
  sx={{
    color: 'primary',
    padding: ['$1', '$3'], // [4px, 16px] from theme.space
  }}
>
  Themed color!
</Text>
```

### ...you can even use "HTML" elements

```jsx
import { H1, H2, P } from 'dripsy'

const Header = () => (
  <H1
    sx={{
      color: 'text', // #000 from theme.colors
      fontSize: '$2', // 24px from theme.fontSizes
    }}
  >
    Header!
  </H1>
)
```

Credit to Evan Bacon for @expo/html-elements, used above!

---

_Todo: make the theme values show up in TS types for intelliesense._

# Usage

Dripsy is an almost-drop-in replacement for React Native's UI components.

Change your imports from `react-native` to `dripsy`

```diff
- import { View, Text } from 'react-native'
+ import { View, H1, P } from 'dripsy'
```

Use the `sx` prop instead of `style` to use themed and responsive styles:

```jsx
<View
  sx={{
    height: [100, 400],
    backgroundColor: 'primary',
    marginX: 10,
  }}
/>
```

Also, in addition to `marginHorizontal`, you can use `marginX` or `mx`, as seen on the `theme-ui` [docs](https://theme-ui.com/theme-spec/).

# 🤖 TypeScript Guide

Since Dripsy v3, you can get amazing autocomplete with Dripsy.

## Versions

Make sure you have at least TypeScript 4.4+:

```sh
yarn add -D typescript
```

## Add `makeTheme`

All you have to do to upgrade is wrap your `theme` with `makeTheme`, and then use module declaration.

```ts
import { makeTheme } from 'dripsy'

const theme = makeTheme({
  colors: { primary: 'blue' },
})

type MyTheme = typeof theme

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}
```

You now get intellisense 🥳

## Gotchas

If you don't see autocomplete, this might be why:

### Your theme uses non-strict objects:

```ts
// ⛔️ typescript doesn't know the types here
const colors = {
  primary: 'blue',
}

const theme = makeTheme({ colors })
```

To fix this, either use `as const` for colors, or write it inline:

```ts
// ✅ as const
const colors = {
  primary: 'blue',
} as const

const theme = makeTheme({ colors })

// ✅ better yet, write inline
const theme = makeTheme({
  colors: {
    primary: 'blue',
  },
})
```

### Still not getting intellisense?

If it still isn't working, please open an issue! But it should work now.

## Strict Types

If you want to enforce strict types for your `sx` prop, you can do so with the new `theme.types` field:

```ts
const theme = makeTheme({
  // ...your theme here
  types: {
    onlyAllowThemeValues: 'always', // default: 'never'
  },
})
```

By setting `types.onlyAllowThemeValues` to `always`, you restrict yourself to only using theme values in your `sx` prop. While this may feel like overkill, it is a good pattern of enforcing consistent design.

This will only apply to theme values that are set. For example, if you haven't set the `theme.space` property, then strict types won't enforce for `padding`, `margin`, etc.

## Incremental strict types

It's possible you want to implement strict types on a per-scale basis. The `types.onlyAllowThemeValues` also accepts an object with per-scale definitions.

```ts
const theme = makeTheme({
  space: {
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
      space: 'always',
    },
  },
})
```

Now, our `sx` prop's space-related properties (such as margin, padding, etc) will only accept one of the values in `theme.space`. To take full advantage of this feature, it is recommended that you don't use arrays, and instead make a dictionary with `$` prefixes, such as the `space` one above.

## TypeScript Recommendation

The strict types feature is especially useful if you want to upgrade to Dripsy 3, have no breaking changes with your types, but slowly transition your app to have stricter types.

It also makes changing your theme **much** easier. For example, imagine that you change your `space` from an array to a dictionary:

```ts
const theme = makeTheme({
  // before
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  // after
  space: {
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
})
```

After changing your `theme.space`, you likely have hundreds of invalid styles throughout your app. Finding them all would be a mess.

However, with incremental strict types, you could achieve this code refactor in seconds.

```ts
const theme = makeTheme({
  // before
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  // after
  space: {
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
      space: 'always',
    },
  },
})
```

Now, simply run your TypeScript type-checker (`yarn tsc --noEmit`) to see all the places you need to update. You'll get useful errors like this:

<img width="1120" alt="Screen Shot 2021-10-04 at 11 10 26 AM" src="https://user-images.githubusercontent.com/13172299/135876688-f1d3acfb-9710-4e6e-8d14-fa09208e401d.png">

> If you want an escape hatch that lets you style without theme keys without disabling strict types, use the `style` prop instead of `sx`.

## Enforce React Native types

default: `false`

```ts
const theme = makeTheme({
  // ... theme
  types: {
    reactNativeTypesOnly: true, // default false
  },
})
```

If you set this field to `true`, then you can only pass styles that fit a React Native style object.

For example, on web, you can set `fontWeight` as a number, like so: `fontWeight: 400`. With React Native, font weights must be strings (`fontWeight: '400'`). Using a number here would probably work with dripsy if you've utilized the `customFonts` feature in your theme.

I recommend setting this field to `true`. However, it will default to `false` to avoid breaking changes with users who are on v2 (like me) who don't want to refactor everywhere. If your app is just adding Dripsy, you should set this field to `true`. And it may work to set it to `true` either way. If it riddles your type checker with errors, then you can easily disable it.

To clarify: when this is `false`, it will allow either theme-ui types for a given field, _or_ React Native types. When it's set to `true`, it will _only_ allow React Native types (if they exist.)

Since React Native has no `cursor` property, for instance, using this field will always pull from the theme-ui web types.

To learn more, check out [the original PR for v3.](https://github.com/nandorojo/dripsy/pull/124)

# Animated Values

## With Moti

```tsx
import { styled } from 'dripsy'
import { MotiView } from 'moti'

const StyledMotiView = styled(MotiView)()

function App() {
  return (
    <StyledMotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{ px: '$2' }}
    />
  )
}
```

## With Reanimated

```jsx
import { styled } from 'dripsy'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

const StyledAnimatedView = styled(Animated.View)()

function App() {
  const style = useAnimatedStyle(() => {
    return {
      height: 10,
    }
  })
  return <StyledAnimatedView style={style} sx={{ px: '$2' }} />
}
```

# 🏆 Before & After

## Before Dripsy ☹️

This is what it took to make _one_ responsive style without Dripsy...

```jsx
import { useState } from 'react'
import { View } from 'react-native'

const ResponsiveBox = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const onResize = (event) => {
      setScreenWidth(event.window.width)
    }
    Dimensions.addEventListener('change', onResize)

    return () => Dimensions.removeEventListener('change', onResize)
  }, [])

  let width = '100%'
  if (screenWidth > 700) {
    width = '50%'
  }

  return <View style={{ width }} />
}
```

## With Dripsy 🤩

```jsx
import { View } from 'dripsy'

const ResponsiveBox = () => {
  return <View sx={{ width: ['100%', '50%'] }} />
}
```

# API

> 🚨 More docs coming here!!!

## `styled`

Turn any component into a Dripsy component.

```jsx
import { View } from 'react-native'
import { styled } from 'dripsy'

const StyledView = styled(View)({
  flex: 1,
  bg: 'primary',
})

// This uses the theme.layout.container styles!
const StyledView2 = styled(View, {
  // this lets you use theme.layout.container styles
  themeKey: 'layout',
  defaultVariant: 'container',
})({
  flex: 1,
  bg: 'primary',
})
```

You can also pass props like `styled-components`

```tsx
const DripsyView = styled(View)((props) => ({
  color: props.success ? 'success' : 'primary',
}))
```

And then use it in your component:

```tsx
return <DripsyView success />
```

Override the original styles with `sx`, if you'd like:

```tsx
return <DripsyView success sx={{ height: 300 }} />
```

You can also add TypeScript types with autocompletion:

```tsx
const DripsyView = styled(View)((props: { success: boolean }) => ({
  color: props.success ? 'success' : 'primary',
}))
```

<!-- ## `createThemedComponent`

> Prefer `styled`.

Currently, a bunch of the React Native components are supported. That said, I haven't added them all. If you want to add one, go to `src/components` and add one and submit a PR.

Or, you can use the `createThemedComponent` function in your own app.

```jsx
import { createThemedComponent } from 'dripsy'
import { View } from 'react-native'

const CustomView = createThemedComponent(View, {
  defaultStyle: {
    flex: 1,
  },
})
``` -->

## `useDripsyTheme`

```ts
import { useDripsyTheme } from 'dripsy'

const { theme } = useDripsyTheme()
```

https://user-images.githubusercontent.com/13172299/136262629-d2fde15a-87fb-4d37-a6ca-64c71aded495.mp4

# Headless Dripsy with `useSx`

```js
import { useSx } from 'dripsy'
```

If you want to use the `sx` prop with a custom component, such as from another library, try the `useSx` hook:

```jsx
import { Button } from 'react-native-paper'

export default function HeadlessButton() {
  const sx = useSx()

  return <Button style={sx({ color: 'primary' })} />
}
```

The `sx` function will return a memoized value.

# Using Custom Fonts [New! 🏄‍♂️]

Dripsy lets you globally control your fonts in React Native. Before Dripsy, this was a huge pain. You had to manually set the `fontFamily` name to a string that corresponds to your actual font file name. If you ever changed custom fonts, you'd need to edit all your files that had it, or create an unnecessary `CustomText` component.

No longer. All of your custom font definitions can live in a single `theme` variable. Once you add your fonts to your theme, you can load them with `expo-font` (or your loader of choice).

## 1. Add your font to your `theme.fonts`

There are two options for this:

**a)** Provide a single `root` font in your `theme.fonts` (easiest, recommended)

**b)** Provide multiple fonts (only use this if you're using multiple custom fonts)

### 1.a) Provide a single `root` in your `theme.fonts` (easiest, recommended)

```js
const fontName = 'arial'

const theme = {
  customFonts: {
    [fontName]: {
      // I recommend setting every weight here
      bold: 'arialBold',
      default: fontName,
      normal: fontName,
      400: fontName,
      500: 'arialMedium',
      600: 'arialBold',
      700: 'arialBold',
      800: 'arialBold',
      900: 'arialBlack',
    },
  },
  fonts: {
    root: fontName, // <- this string must match the key you set in custom fonts above!
  },
}
```

**Recommended** when using web, add a fallback for your fonts:

```ts
const webFont = (font: string) =>
  Platform.select({
    web: `${font}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
    default: font,
  })

const theme = {
  customFonts: {
    arial: {
      bold: webFont('arialBold'),
      default: webFont('arial'),
      normal: webFont('arial')',
      '400': webFont('arial')',
      '500': webFont('arialMedium'),
      '600': webFont('arialBold'),
      '700': webFont('arialBold'),
      '800': webFont('arialBold'),
      '900': webFont('arialBlack'),
    },
  },
}
```

You can also alias your `fontWeights` to make it easier, just like [`theme-ui`](https://theme-ui.com/theming/#typography):

```js
const theme = {
  customFonts: {
    arial: {
      bold: 'arialBold',
      default: 'arial',
      normal: 'arial',
      400: 'arial',
      500: 'arialMedium',
      600: 'arialBold',
      700: 'arialBold',
      800: 'arialBold',
      900: 'arialBlack',
    },
  },
  fonts: {
    root: 'arial',
  },
  // this is new here:
  fontWeights: {
    black: '900',
  },
}
```

Now that we've added the `black` shorthand to our `fontWeights`, we can use it anywhere in our app. The string `900` corresponds to `theme.customFonts.arial['900']`.

You can now style your fonts like so:

```jsx
import { Text } from 'dripsy'

const Black = () => (
  <Text sx={{ fontWeight: 'black' }}>This font weight is 900!</Text>
)
```

You can also use this shorthand when creating custom text variants in your theme. For instance, if you want to make a bold & caps text variant:

```js
const theme = {
  ...
  fontWeights: {
    black: '900'
  },
  text: {
    thickCaps: {
      fontWeight: 'black',
      textTransformation: 'uppercase'
    }
  }
}
```

```jsx
import { Text } from 'dripsy'

const BoldCaps = () => (
  <Text variant="thickCaps">This font weight is 900, & it's capitalized!</Text>
)
```

#### Considerations for naming conventions

Notice how the `theme.fonts.root` is `arial`. This tells Dripsy to check for `theme.customFonts.arial`. If you wanted to name it something different, you could. However, you can't name it `root`. That's the only exception.

There are 2 important details when it comes to the naming:

1. The name of your customFont **must** match the name you pass to `theme.fonts.root`. In the example above, I picked the name `arial`.
2. The name you use to load in your font at its default weight (often `400` or `default`) **must also match** the key you pass to `theme.customFonts`.

- **Explanation** In step 2, when you import your font using `expo-font`, you have to make sure you name the default font weight with the same name passed to `customFonts`.
- In the example above, we would import our font using `expo-font`, and name it `arial`. You can skip down to step #3 to see what I mean. We need to make these the same to ensure that we always fall back to the correct default font. If we don't do this, then React Native will raise an error, saying it could not find the custom font.

### 1b) Provide multiple fonts (only use this if you're using multiple custom fonts)

If you have multiple custom fonts you'd like to use, this step is for you.

1. Follow the same steps as step #2.a.
2. Add your other fonts to `theme.customFonts`, just like step #1a.

```js
const theme = {
  customFonts: {
    arial: {
      ... from step 2.a
    },
    // these are new
    sans: {
      bold: 'sansBold',
      default: 'sans',
      normal: 'sans',
      '400': 'sans',
      '500': 'sans',
      '600': 'sansBold',
      '700': 'sansBold',
      '800': 'sansBold',
      '900': 'sansBlack',
    },
  },
  fonts: {
    root: 'arial',
    heading: 'sans'
  },
  text: {
    h1: {
      // use sans here
      fontFamily: 'heading'
    },
    h2: {
      fontFamily: 'heading'
    },
    h3: {
      fontFamily: 'heading'
    },
  }
}
```

This tells Dripsy we have 2 custom fonts, named `arial` and `sans`. These are custom names made by you. They will be used in your app later to reference which font you're picking.

## 2. Loading in fonts with `expo-font` (or whatever loader you prefer)

As an added step (to include in docs later), you can use expo-font to actually load the fonts in:

```tsx
// fonts.tsx
import React from 'react'
import { useFonts } from 'expo-font'

export default function Fonts({ children }: { children: React.ReactNode }) {
  const [loaded] = useFonts({
    // 🚨🚨🚨 the name (`sans`) of the default weight here should equal the key from theme.customFonts
    // otherwise, you will need to explicitly set the fontWeight everywhere
    // since we have theme.customFonts.sans, we name this `sans`
    ['sans']: require('./public/fonts/sansBook.ttf'),
    ['sansBold']: require('./public/fonts/arialBlack.ttf'),

    // same goes here, load in the default font name with the one that matches your theme.customFonts
    ['arial']: require('./public/fonts/arialBook.ttf'),
    ['arialBold']: require('./public/fonts/arialBold.ttf'),
  })

  if (!loaded) return null

  return <>{children}</>
}
```

And then in your app:

```tsx
// App.tsx
import Fonts from './fonts'

export default function App() {
  return (
    <Fonts>
      <YourAppHere />
    </Fonts>
  )
}
```

Important note, mentioned in #2.a above. The name of the default font you use in `useFonts` must match the key for the font in your `theme.customFonts`. Otherwise, you will get errors, and errors suck.

Another caveat: you cannot name a font "root". Dripsy uses this field to identify your root font, so please do not name a font `root` when you load it in. Any other word works.

## 3. Using and customizing your custom fonts in your app

Now that we've defined our fonts in our theme, we can use them anywhere in our app. To globally style all text, you could add a `theme.text.body` field:

```js
const theme = {
  customFonts: {
    arial: {
      bold: 'arialBold',
      default: 'arial',
      normal: 'arial',
      400: 'arial',
      500: 'arialMedium',
      600: 'arialBold',
      700: 'arialBold',
      800: 'arialBold',
      900: 'arialBlack',
    },
  },
  fonts: {
    root: 'arial',
  },
  text: {
    body: {
      // this edits all <Text> components
      fontWeight: 'bold',
      color: 'cyan',
    },
    h1: {
      // this edits all <H1> components
      fontWeight: '900',
    },
  },
}
```

You can also style like normal throughout your app, and watch your font weights change elegantly:

```jsx
import { Text } from 'dripsy'

const Bold = () => (
  <Text>Whoa, this is a custom bold font (& it's color is cyan)</Text>
)
```

For context, without dripsy, you'd have to do this:

```jsx
import { Text } from 'react-native'

const Bold = () => (
  <Text style={{ fontFamily: 'arialBold' }}>Lame, this isn't easy.</Text>
)
```

You probably don't want to make your `text.body` bold, since this will style your entire app's `Text`, but you could make a custom variant in `theme.text`, like so:

```js
const theme = {
  ...,
  text: {
    thick: {
      fontWeight: 'bold'
    }
  }
}
```

In your component:

```jsx
import { Text } from 'react-native'

const Thick = () => (
  <Text variant="thick">Hey, this is bold. That's all it takes.</Text>
)
```

## Using custom fonts on web

To improve the performance of loading your fonts on web, you can add something like this to the `head` of your HTML:

```jsx
<link
  rel="preload"
  href="/fonts/arial-Book.ttf"
  as="font"
  crossOrigin=""
/>
<link
  rel="preload"
  href="/fonts/arial-Medium.ttf"
  as="font"
  crossOrigin=""
/>
```

Create a `link` for each font you're importing, and make sure to keep the `preload` prop to make it load early.

If you're using Next.js, this would go in your `pages/_document.js` file, inside of Next's `<Head>` component, and you'd put your `fonts` folder inside of `/public`.

# How it works

First, this library is super inspired by `theme-ui`, and uses many of its low-level functions and methodologies.

We track the screen width, generate styles based on the current width using a mobile-first approach, and return the regular React Native components. But it just feels like magic! Plus, you get all the awesome theming abilities baked in. Even if you don't need responsive design, the theming alone is a great use case.

## Contributing

This is a really new project. I'd love your help and contributions.

## License

MIT
