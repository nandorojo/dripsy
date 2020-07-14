import { createThemedComponent } from '../css/create-themed-component';
import { View } from 'react-native';

export const Flex = createThemedComponent(View, {
  defaultStyle: {
    flexDirection: 'row',
  },
});

// Theme-ui component
// export const Flex = styled(Box)({
//   display: 'flex',
// })
