import React from 'react';
import { View, ThemeProvider, Text as DripText } from '@nandorojo/dripsy';
import * as Native from 'react-native';
import styled from 'styled-components';

const theme = {
  colors: {
    primary: '#41b87a',
    secondary: 'black',
    background: 'white',
  },
};

const T = styled(Native.Text)(() => ({
  fontSize: 70,
}));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View
        sx={{
          backgroundColor: () => ['primary', 'blue'],
          height: [400, 800],
        }}
      >
        <DripText
          sx={{
            color: 'secondary',
            margin: 100,
            // fontSize: [20, 30],
            // variant: '',
          }}
        >
          Hey
        </DripText>
        <T>Hi!</T>
      </View>
    </ThemeProvider>
  );
}
