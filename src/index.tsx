// export * from './components';
// export * from './css/create-themed-component';

// export { Styles, css } from './css';
// export { ThemeProvider } from '@theme-ui/core';
// export { InitializeColorMode } from 'theme-ui';
import React from 'react';
function Text(props: {
  sx?: { color: ('primary' | 'muted')[] };
  children?: React.ReactNode;
}) {
  return null;
}

export default function App() {
  return <Text sx={{ color: ['muted', 'primary'] }}></Text>;
}
