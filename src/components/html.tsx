import * as HTML from '@expo/html-elements';
import { createThemedComponent } from '../css/create-themed-component';

export const H1 = createThemedComponent(HTML.H1, {
  themeKey: 'text',
  defaultVariant: 'h1',
});

export const H2 = createThemedComponent(HTML.H2, {
  themeKey: 'text',
  defaultVariant: 'h2',
});

export const H3 = createThemedComponent(HTML.H3, {
  themeKey: 'text',
  defaultVariant: 'h3',
});

export const H4 = createThemedComponent(HTML.H4, {
  themeKey: 'text',
  defaultVariant: 'h4',
});

export const H5 = createThemedComponent(HTML.H5, {
  themeKey: 'text',
  defaultVariant: 'h5',
});

export const H6 = createThemedComponent(HTML.H6, {
  themeKey: 'text',
  defaultVariant: 'h6',
});
