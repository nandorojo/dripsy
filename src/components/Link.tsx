import { createThemedComponent } from '../css/create-themed-component';
import { A } from '@expo/html-elements';

export const Link = createThemedComponent(A, {
  themeKey: 'text',
  defaultVariant: 'a',
});

// Theme-ui component
// export const Link = React.forwardRef((props, ref) => (
//   <Box ref={ref} as="a" variant="styles.a" {...props} __themeKey="links" />
// ));
