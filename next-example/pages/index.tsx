import React from 'react';
import {
  View,
  ThemeProvider,
  createThemedComponent,
  Text,
} from '@nandorojo/dripsy';
import * as Native from 'react-native';

const theme = {
  colors: {
    primary: '#41b87a',
    secondary: 'black',
    background: 'white',
  },
  text: {
    primary: {
      fontSize: 40,
    },
    secondary: {
      fontSize: 32,
    },
  },
};

// you can create custom components too!
const ThemedText = createThemedComponent(Native.Text, {
  themeKey: 'text', // this lets them access the `text` variants from the theme
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View sx={{ height: 400, backgroundColor: ['green', 'purple'] }} />
      <Text variant="primary" sx={{ color: [null, 'purple'] }}>
        hello
      </Text>
      <View sx={{ height: 400, backgroundColor: ['primary', 'secondary'] }} />
    </ThemeProvider>
  );
}
