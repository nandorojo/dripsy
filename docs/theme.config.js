// theme.config.js
export default {
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
    </>
  ),
  unstable_faviconGlyph: '🍷',
}
