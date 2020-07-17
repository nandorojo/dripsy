import { Image as rImage } from 'react-native';
import { createThemedComponent } from '../css/create-themed-component';

export const Image = createThemedComponent(rImage, {
  themeKey: 'images',
  defaultStyle: {
    maxWidth: '100%',
    height: 'auto',
  },
});

// export const Image = React.forwardRef((props, ref) => (
//   <Box
//     ref={ref}
//     as="img"
//     {...props}
//     __themeKey="images"
//     __css={{
//       maxWidth: '100%',
//       height: 'auto',
//       ...props.__css,
//     }}
//   />
// ))
