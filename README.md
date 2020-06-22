# 🍷 Dripsy

A **super-simple**, **responsive** design system for Expo / React Native Web. Heavily inspired by React's [`theme-ui`](https://theme-ui.com/home).

```jsx
<Text
  sx={{
    fontSize: [14, 16, 20] // 14 on mobile, 16 on tablet, 20 on desktop
  }}
>
  Responsive font size?? 🤯
</Text>
```

# Why?

Build once, deploy everywhere, is a great philosophy made possible by Expo Web/React Native Web. A big impediment is responsive design.

React Native doesn't have media queries for styles, and trying to micmick it with JS turns into `useState` hell with a ton of conditionals (as you'll see [below](#Before-&-After).)

React has great design systems and libraries for styling (`theme-ui`, `chakra-ui`, `rebasss`, `styled-system`, etc.)

While React Native has some nice component libraries (`react-native-elements`, `react-native-paper`, etc.), it lacks responsive styles.

The goal of this project is to build an unopinionated, responsive design system that looks great in React Native, on **all** devices.

# What does Dripsy look like?

## Create a theme!

```js
export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'tomato'
  },
  spacing: [10, 12, 14]
}
```

## ...and build a beautiful, responsive UI

```jsx
<Text
  sx={{
    color: 'primary',
    padding: [1, 3], // [10, 14] from theme!
  }}
>
  Themed color!
</Text>
```

_Todo: make the theme values show up in TS types for intelliesense._

# Before & After

## Before Dripsy ☹️

This is what it took to make _one_ responsive style...

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
import { View } from '@nandorojo/dripsy'

const ResponsiveBox = () => {
  return <View sx={{ width: ['100%', '50%'] }} />
}
```

# Installation

```sh
yarn add @nandorojo/dripsy

# or
npm i @nandorojo/dripsy
```

# Set up

Technically, you don't have to do anything else!

However, you'll likely want to create a custom theme.

## Custom theme

Wrap your entire app with the `ThemeProvider`, and pass it a `theme` object. Make sure you create your theme outside of the component to avoid re-renders. 

`App.js`

```jsx
import { ThemeProvider } from '@nandorojo/dripsy'

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'tomato'
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif'
  },
  spacing: [10, 12, 14]
}

export default function App() {
  return <ThemeProvider theme={theme}>{/* Your app code goes here! */}</ThemeProvider>
}
```

Follow the [docs from `theme-ui`](https://theme-ui.com/theme-spec) to see how to theme your app – we use the same API as them.

My personal preference is to have the entire theme object in one file.

Example theme: 

_All theme values are optional. You don't have to use them if you don't want._

### Expo + Next.js

If you're using the Expo + Next.js integration, you'll have to [follow the steps](https://docs.expo.io/guides/using-styled-components/#usage-with-nextjs) to use styled components with Next.js + Expo.

- However, there is a bug with this integration that I haven't figured out how to fix yet.

## Usage

Change your imports from `react-native` to `@nandorojo/dripsy`

```diff
- import { View } from 'react-native'
+ import { View } from '@nandorojo/dripsy'
```

## API

### `createThemedComponent`

Currently, a bunch of the React Native components are supported. That said, I haven't added them all. If you want to add one, go to `src/components` and add one.

Or, you can use the `createThemedComponent` function.

```jsx
import { createThemedComponent } from '@nandorojo/dripsy'
```

## Contributing

This is a really new project. I'd love your help and contributions.

Under the hood, this library uses `styled-components/native`.

## TODO

- Add theme variants for certain element types
- Add typing for theme values
  - Maybe add support for custom theme values to be typed too, with a CLI that edits the NPM package? 🧐
    - It could have a `postinstall` script in package.json.
- Add SSR support (for the Expo + Next.js integration.) Currently, the responsive style doesn't rehydrate on the client when the page loads.

## License

MIT
