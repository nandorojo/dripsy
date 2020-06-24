import React from 'react';
import { View, Text, ThemeProvider } from '@nandorojo/dripsy';

const theme = {
  colors: {
    primary: '#41b87a',
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View
        sx={{
          backgroundColor: (theme) => [theme.colors.primary, 'green'],
          height: [400, 800],
        }}
      >
        <Text
          sx={{
            color: 'white',
            fontSize: [20, 30],
            variant: '',
          }}
        >
          Hey there!
        </Text>
      </View>
    </ThemeProvider>
  );
}
