import { View } from 'react-native';
import { createThemedComponent } from '@create-themed-component';

export const Container = createThemedComponent(View, {
  defaultVariant: 'container',
  themeKey: 'layout',
  defaultStyle: {
    mx: 'auto',
    maxWidth: 'container',
    width: '100%',
  },
});

// Theme-ui component
// export const Container = React.forwardRef((props, ref) => (
//   <Box
//     ref={ref}
//     variant="container"
//     {...props}
//     __themeKey="layout"
//     __css={{
//       width: "100%",
//       maxWidth: "container",
//       mx: "auto",
//     }}
//   />
// ));
