# Use Dripsy with Next.js

Once you've already completed the installation steps for `dripsy` & wrapped your app with `DripsyProvider`, you can do the final simple steps to get it ready for your Next.js app.

**Step 0. Install next with expo:**

I recommend using Expo's Next.js integration. This doesn't mean you have to use expo managed.

- Init: `expo init` (or `npx create-next-app`) if you don't have an app created yet

- Install: `yarn add @expo/next-adapter`

- Install next: `yarn add next`

- Configure: `yarn next-expo`

- Start: `yarn next dev`

_I recommend becoming familiar `next`'s architecture with `expo`. Follow the [Expo docs](https://docs.expo.io/versions/latest/guides/using-nextjs/) or see [this article](https://dev.to/evanbacon/next-js-expo-and-react-native-for-web-3kd9) by Evan Bacon if you're curious._

**1. Install dependencies**

```sh
yarn add next-compose-plugins next-transpile-modules
```

**2. Edit your `next.config.js` file to look something like this:**

```js
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'dripsy',
  // you can add other packages here that need transpiling
])

const { withExpo } = require('@expo/next-adapter')

module.exports = withPlugins(
  [withTM],
  withExpo({
    // <-- assuming you're using Expo + Next.js...
    projectRoot: __dirname,
  })
)
```

**3. Add `SSRStyleReset` to `pages/_document.js`**

Just import `SSRStyleReset`, and put it in at the bottom of your `head` tag in `pages/_document.js`.

Your `pages/_document.js` should look something like [this](https://github.com/nandorojo/dripsy/blob/master/next/pages/_document.js).
