import React from 'react';
import {
  View,
  ThemeProvider,
  Text as DripText,
  createThemedComponent,
} from '@nandorojo/dripsy';
import * as Native from 'react-native';
import styled from 'styled-components';

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
  },
};

const T = styled(Native.Text)(() => ({
  fontSize: 70,
}));
const G = createThemedComponent(Native.Text, {
  themeKey: 'text',
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View
        sx={{
          backgroundColor: () => ['primary', 'blue'],
          height: [400, 800],
        }}
      >
        <DripText></DripText>
        <G variant="primary">Hey</G>
        <T>Hi!</T>
      </View>
    </ThemeProvider>
  );
}
