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

# Features

- [(New in 1.4.x!)](#using-custom-fonts-new-%EF%B8%8F) Custom fonts, edited globally
- Responsive styles
- Universal (Android, iOS, Web, & more)
- Works with Expo
- Works with Vanilla React Native
- Works with Next.js / server-side rendering
- Full theme support
- Custom theme variants
- TypeScript support (TypeScript theme support is in the works too)
- Insanely simple API (themed, responsive designs in one line!)
- Works with Animated/Reanimated values
- Dark mode / custom color modes

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

If you're using Next.js or another SSR app, scroll down to see how to configure.

# 🛠 Set up

Technically, you don't have to do anything else!

However, you'll likely want to create a custom theme.

## Custom theme

Wrap your entire app with the `DripsyProvider`, and pass it a `theme` object. Make sure you create your theme outside of the component to avoid re-renders.

If you're using Next.js, this goes in `pages/_app.js`.

`App.js`

```jsx
import { DripsyProvider } from 'dripsy'

const theme = {
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
      black: 'Circular-StdBlack'
    }
  },
  space: [10, 12, 14],
  text: {
    thick: {
      fontFamily: 'root',
      fontWeight: 'black' // 'Circular-StdBlack'
    }
  }
}

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

## For Expo Web / React Native Web (non-SSR apps)

If you're using 1.4 or lower, you're done. However, starting v1.5, you need to customize webpack like so:

If you're using `expo start:web`, this section is for you. If you're using Expo + Next.js, skip to the next section.

`yarn add -D @expo/webpack-config`

Create a custom `webpack.config.js` file: 

```js
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: { dangerouslyAddModulePathsToTranspile: ['dripsy', '@dripsy'] },
    },
    argv
  )

  return config
}
```


## For SSR apps (Next.js, Gatsby, etc.)

If you are not using Next.js, skip down to #3 below.

Steps 1 & 2 are required for Next.js apps (for example, if you're using Expo + Next.js.)

**1. Install dependencies**

```sh
yarn add next-compose-plugins next-transpile-modules
```

**2. Edit your `next.config.js` file to look like this:**

```js
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'dripsy',
  '@dripsy/core'
  // you can add other packages here that need transpiling
])

const { withExpo } = require('@expo/next-adapter')

module.exports = withPlugins(
  [withTM],
  withExpo({
    projectRoot: __dirname,
  })
)
```

3. Add `SSRStyleReset` to the top of your `body`

Import `SSRStyleReset` and inject it at the top of your `body` HTML tag.

```jsx
import { SSRStyleReset } from 'dripsy'
;<body>
  <SSRStyleReset />
  <YourApp />
</body>
```

If you're using Next.js, this should go in `pages/_document.js`.

Your `pages/_document.js` should look something like [this](https://github.com/nandorojo/dripsy/blob/master/examples/next-example/pages/_document.js).

We'll add other library examples here too, such as Gatsby.

---

That's it! Btw, if you're using Expo + Next.js, check out my library, [expo-next-react-navigation](https://github.com/nandorojo/expo-next-react-navigation) to help with navigation.

# 👀 What does Dripsy look like

## Create a theme

```js
export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'tomato',
  },
  spacing: [10, 12, 14],
  fontSizes: [16, 20, 24],
  text: {
    h1: {
      fontSize: 3, // this is 24px, taken from `fontSize` above
    },
    p: {
      fontSize: 1, // & this is 16px, taken from `fontSize` above
    },
  },
}
```

## ...and build a beautiful, responsive UI

```jsx
<Text
  sx={{
    color: 'primary',
    padding: [1, 3], // [10px, 14px] from theme!
  }}
>
  Themed color!
</Text>
```

### ...you can even use "HTML" elements

```jsx
import { H1, H2, P } from 'dripsy'
;<H1
  sx={{
    color: 'text', // #000 from theme!
    fontSize: 2, // 24px from theme!
  }}
></H1>
```

Credit to Evan Bacon for @expo/html-elements, used above!

---

_Todo: make the theme values show up in TS types for intelliesense._

## Usage

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

Also, instead of `marginHorizontal`, use `marginX` or `mx`, as seen on the `theme-ui` [docs](https://theme-ui.com/theme-spec/).

### Animated Values

To use an animated view, simple use the `as` prop.

```js
import { View } from 'dripsy'
import Animated from 'react-native-reanimated'
import { useValue } from 'react-native-redash'

function App() {
  const height = useValue(0)

  return <View as={Animated.View} sx={{ height }} />
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

A big issue with using JS-only breakpoints like that is that it won't work on SSR apps using Expo + Next.js. The "solution" would be to lazy load the component, but then you lose the SEO benefits of Next.js. With Dripsy, SSR works fine!

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

```jsx
import { View } from 'react-native'
import { styled } from 'dripsy'

const StyledView = styled(View)({
  flex: 1,
  bg: 'primary',
})

// This uses the theme.layout.container styles!
const StyledView2 = styled(View, {
  themeKey: 'layout',
  defaultVariant: 'container',
})({
  flex: 1,
  bg: 'primary',
})
```

## `createThemedComponent`

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
```

# Using Custom Fonts [New! 🏄‍♂️]

Dripsy lets you globally control your fonts in React Native. Before Dripsy, this was a huge pain. You had to manually set the `fontFamily` name to a string that corresponds to your actual font file name. If you ever changed custom fonts, you'd need to edit all your files that had it, or create an unnecessary `CustomText` component.

No longer. All of your custom font definitions can live in a single `theme` variable. Once you add your fonts to your theme, you can load them with `expo-font` (or your loader of choice).

## 1. Add your font to your `theme.fonts`

There are two options for this:

**a)** Provide a single `root` font in your `theme.fonts` (easiest, recommended)

**b)** Provide multiple fonts (only use this if you're using multiple custom fonts)

### 1.a) Provide a single `root` in your `theme.fonts` (easiest, recommended)

```js
const theme = {
  customFonts: {
    arial: {
      // I recommend setting every weight here
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
    root: 'arial', // <- this string must match the key you set in custom fonts above!
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
    // 🚨🚨🚨 the name (`sans`) of the default weight here should equal the key from theme.customFonts!
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
  href="/fonts/circ/CircularStd-Book.ttf"
  as="font"
  crossOrigin=""
/>
<link
  rel="preload"
  href="/fonts/circ/CircularStd-Medium.ttf"
  as="font"
  crossOrigin=""
/> 
```

Create a `link` for each font you're importing, and make sure to keep the `preload` prop to make it load early.

If you're using Next.js, this would go in your `pages/_document.js` file, inside of Next's `<Head>` component.

# How it works

First, this library is super inspired by `theme-ui`, and uses many of its low-level functions and methodologies.

Practically speaking, this library uses the `Dimensions` api on Android & iOS, and uses actual CSS breakpoints on web. The CSS breakpoints are made possible by `@artsy/fresnel`. This means that you get actually-native web breakpoints. That matters, because server-size rendered apps will have startup issues if you use JS-based media queries that require React to rehydrate on when it opens.

On Native, there is nothing too fancy going on. We track the screen width, generate styles based on the current width using a mobile-first approach, and return the regular React Native components. But it just feels like magic! Plus, you get all the awesome theming abilities baked in. If you're using this in native, the theming alone is a great use case.

## Contributing

This is a really new project. I'd love your help and contributions.

## License

MIT
