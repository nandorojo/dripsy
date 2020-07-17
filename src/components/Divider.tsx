import { HR } from '@expo/html-elements';
import { createThemedComponent } from '../css/create-themed-component';

export const Divider = createThemedComponent(HR, {
  themeKey: 'hr',
  defaultStyle: {
    color: 'gray',
    m: 0,
    my: 2,
    border: 0,
    borderBottom: '1px solid',
  },
});

// export const Divider = React.forwardRef((props, ref) => (
//   <Box
//     ref={ref}
//     as="hr"
//     variant="styles.hr"
//     {...props}
//     __css={{
//       color: 'gray',
//       m: 0,
//       my: 2,
//       border: 0,
//       borderBottom: '1px solid',
//     }}
//   />
// ));
