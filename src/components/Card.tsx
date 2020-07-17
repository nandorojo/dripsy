import { View } from './react-native';
import { createThemedComponent } from '../css/create-themed-component';

export const Card = createThemedComponent(View, {
  themeKey: 'card',
  defaultVariant: 'primary',
});

// export const Card = React.forwardRef((props, ref) => (
//   <Box ref={ref} variant="primary" {...props} __themeKey="cards" />
// ));
