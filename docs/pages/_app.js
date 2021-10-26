import 'nextra-theme-docs/style.css'

import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
require('prismjs/components/prism-bash.min')
require('prismjs/components/prism-diff.min')
import splitbee from '@splitbee/web'

splitbee.init({
  token: '77UUK3L5TK3F',
})

export default function Nextra({ Component, pageProps }) {
  return <Component {...pageProps} />
}
