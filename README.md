# 🍷 Dripsy

A **dead-simple**, **responsive** design system for Expo / React Native Web. Heavily inspired by React's [`theme-ui`](https://theme-ui.com/home).

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

- Responsive styles
- Universal (Android, iOS, Web)
- Works with Expo
- Works with Next.js / server-side rendering (experimental)
- Full theme support
- Custom theme variants
- TypeScript support (TypeScript theme support is in the works too)
- Insanely simple API (themed, responsive designs in one line!)
- Works with Animated/Reanimated values
- Dark mode / custom color modes

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

# 🛠 Set up

Technically, you don't have to do anything else!

However, you'll likely want to create a custom theme.

## Custom theme

🚨 Please know that this section's API will have breaking changes soon.

Wrap your entire app with the `ThemeProvider`, and pass it a `theme` object. Make sure you create your theme outside of the component to avoid re-renders.

_If you're using Next.js, this goes in `pages/_app.js`. Also, you should pass the `options={{ ssr: true }}` prop to the `ThemeProvider`._

`App.js`

```jsx
import { ThemeProvider } from 'dripsy';

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'tomato',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
  },
  spacing: [10, 12, 14],
  breakpoints: ['640px', '960px', '1280px'],
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app code goes here! */}
    </ThemeProvider>
  );
}
```

Follow the [docs from `theme-ui`](https://theme-ui.com/theme-spec) to see how to theme your app – we use the same API as them.

My personal preference is to have the entire theme object in one file.

_All theme values are optional. You don't have to use them if you don't want._

## For Next.js apps

If you're using the expo + next.js integration, there are a few extra steps.

**1. Install dependencies**

```sh
yarn add next-compose-plugins next-transpile-modules
```

**2. Edit your `next.config.js` file to look like this:**

```js
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'dripsy',
  // you can add other packages here that need transpiling
]);

const { withExpo } = require('@expo/next-adapter');

module.exports = withPlugins(
  [withTM],
  withExpo({
    projectRoot: __dirname,
  })
);
```

**3. (Optional) add `InitializeColorMode` to `pages/_document.js`**

If you're using a color mode (such as dark mode) in your app, you'll probably want to add `InitializeColorMode` to avoid a flash of unstyled text.

Just import `InitializeColorMode`, and put it in at the top of your `body` tag in `pages/_document.js`.

Your `pages/_document.js` should look something like [this](https://github.com/nandorojo/dripsy/blob/master/next/pages/_document.js).

---

That's it! Btw, if you're using Expo + Next.js, check out my library, [expo-next-react-navigation](https://github.com/nandorojo/expo-next-react-navigation).

# 👀 What does Dripsy look like?

## Create a theme!

```js
export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'tomato',
  },
  spacing: [10, 12, 14],
  fontSize: [16, 20, 24],
  text: {
    h1: {
      fontSize: 3, // this is 24px, taken from `fontSize` above
    },
    p: {
      fontSize: 1, // & this is 16px, taken from `fontSize` above
    },
  },
};
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
import { View } from 'dripsy';
import Animated from 'react-native-reanimated';
import { useValue } from 'react-native-redash';

function App() {
  const height = useValue(0);

  return <View as={Animated.View} sx={{ height }} />;
}
```

# 🏆 Before & After

## Before Dripsy ☹️

This is what it took to make _one_ responsive style without Dripsy...

```jsx
import { useState } from 'react';
import { View } from 'react-native';

const ResponsiveBox = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width
  );

  useEffect(() => {
    const onResize = (event) => {
      setScreenWidth(event.window.width);
    };
    Dimensions.addEventListener('change', onResize);

    return () => Dimensions.removeEventListener('change', onResize);
  }, []);

  let width = '100%';
  if (screenWidth > 700) {
    width = '50%';
  }

  return <View style={{ width }} />;
};
```

A big issue with using JS-only breakpoints like that is that it won't work on SSR apps using Expo + Next.js. The "solution" would be to lazy load the component, but then you lose the SEO benefits of Next.js. With Dripsy, SSR works fine!

## With Dripsy 🤩

```jsx
import { View } from 'dripsy';

const ResponsiveBox = () => {
  return <View sx={{ width: ['100%', '50%'] }} />;
};
```

### Expo + Next.js

If you're using the Expo + Next.js integration, you'll have to [follow the steps](https://docs.expo.io/guides/using-styled-components/#usage-with-nextjs) to use styled components with Next.js + Expo.

# API

## `createThemedComponent`

Currently, a bunch of the React Native components are supported. That said, I haven't added them all. If you want to add one, go to `src/components` and add one and submit a PR.

Or, you can use the `createThemedComponent` function in your own app.

```jsx
import { createThemedComponent } from 'dripsy';
import { View } from 'react-native';

const CustomView = createThemedComponent(View, {
  defaultStyle: {
    flex: 1,
  },
});
```

# How it works

First, this library is super inspired by `theme-ui`, and uses many of its low-level functions and methodologies.

Practically speaking, this library uses the `Dimensions` api on Android & iOS, and uses actual CSS breakpoints on web. The CSS breakpoints are made possible by `styled-components`. This means that you get actually-native web breakpoints. That matters, because server-size rendered apps will have startup issues if you use JS-based media queries that require React to rehydrate on when it opens.

On Native, there is nothing too fancy going on. We track the screen width, generate styles based on the current width using a mobile-first approach, and return the regular React Native components. But it just feels like magic!

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
