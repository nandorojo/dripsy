import { SxProps } from '@theme-ui/core';
import { Theme } from '@theme-ui/css';
import { ComponentType } from 'react';

export type ThemedOptions = {
  defaultStyle?: SxProps['sx'];
  themeKey?: string;
  defaultVariant?: string;
};

export type StyledProps<P> = SxProps & {
  as?: ComponentType<P>;
  variant?: string;
  /**
   * Optional style value to pass react native styles that aren't available in the `sx` prop, such as shadows.
   */
  // @ts-ignore
  nativeStyle?: P['style'];
  breakpoint: number;
  theme: Theme;
};
