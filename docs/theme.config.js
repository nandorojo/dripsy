// theme.config.js
export default {
  github: 'https://github.com/nandorojo/dripsy',
  projectLink: 'https://github.com/nandorojo/dripsy', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/nandorojo/dripsy/blob/master', // base URL for the docs repository
  titleSuffix: ' – Dripsy',
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: (
    <>
      MIT {new Date().getFullYear()} ©{' '}
      <a target="_blank" rel="noreferrer" href="https://fernandorojo.co">
        Fernando Rojo
      </a>
    </>
  ),
  footerEditLink: `Edit this page on GitHub ⚡️`,
  logo: (
    <>
      <strong style={{ marginRight: 4 }}>Dripsy 🍷</strong>
      <span>by Fernando Rojo</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Unstyled UI primitives for React Native (+ Web)"
      />
      <meta name="og:title" content="Dripsy by Fernando Rojo" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta
        name="description"
        content="Unstyled UI primitives for React Native (+ Web)"
      />
      <meta
        name="og:description"
        content="Unstyled UI primitives for React Native (+ Web)"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://dripsy.xyz/og.png" />
      <meta name="twitter:site:domain" content="dripsy.xyz" />
      <meta name="twitter:url" content="https://dripsy.xyz" />
      <meta name="og:title" content="Dripsy by Fernando Rojo" />
      <meta name="og:image" content="https://dripsy.xyz/og.png" />
    </>
  ),
  unstable_faviconGlyph: '🍷',
}
