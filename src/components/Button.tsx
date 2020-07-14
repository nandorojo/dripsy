import { Button as rButton } from 'react-native';
import { createThemedComponent } from '@create-themed-component';

export const Button = createThemedComponent(rButton, {
  themeKey: 'buttons',
  defaultVariant: 'primary',
  defaultStyle: {
    appearance: 'none',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: 'inherit',
    textDecoration: 'none',
    fontSize: 'inherit',
    px: 3,
    py: 2,
    color: 'white',
    bg: 'primary',
    border: 0,
    borderRadius: 4,
  },
});

// export const Button = React.forwardRef((props, ref) => (
//   <Box
//     ref={ref}
//     as="button"
//     variant="primary"
//     {...props}
//     __themeKey="buttons"
//     __css={{
//       appearance: 'none',
//       display: 'inline-block',
//       textAlign: 'center',
//       lineHeight: 'inherit',
//       textDecoration: 'none',
//       fontSize: 'inherit',
//       px: 3,
//       py: 2,
//       color: 'white',
//       bg: 'primary',
//       border: 0,
//       borderRadius: 4,
//     }}
//   />
// ));
