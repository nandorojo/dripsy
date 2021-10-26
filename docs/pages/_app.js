import 'nextra-theme-docs/style.css'

import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-bash.min')
require('prismjs/components/prism-diff.min')

export default function Nextra({ Component, pageProps }) {
  return <Component {...pageProps} />
}
