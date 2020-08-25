import { SxProps } from '@theme-ui/core'

declare module 'react' {
  // tslint:disable-next-line: no-empty-interface
  type DOMAttributes<T> = SxProps
}

declare global {
  namespace JSX {
    // tslint:disable-next-line: no-empty-interface
    type IntrinsicAttributes = SxProps
  }
}
