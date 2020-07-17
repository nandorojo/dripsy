import { Image } from './Image';
import { createThemedComponent } from '../css/create-themed-component';

export const Avatar = createThemedComponent(Image, {
  defaultVariant: 'avatar',
  defaultStyle: {
    borderRadius: 9999,
  },
});

// export const Avatar = React.forwardRef(({ size = 48, ...props }, ref) => (
//   <Image
//     ref={ref}
//     width={size}
//     height={size}
//     variant="avatar"
//     {...props}
//     __css={{
//       borderRadius: 9999,
//     }}
//   />
// ))
