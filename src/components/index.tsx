import { createThemedComponent } from '../css/create-themed-component';
import * as Native from 'react-native';

export const View = createThemedComponent(Native.View);

export const Text = createThemedComponent(Native.Text, {
  themeKey: 'text',
});

export const ScrollView = createThemedComponent(Native.ScrollView);

export const TextInput = createThemedComponent(Native.TextInput);

export const Button = createThemedComponent(Native.Button, {
  themeKey: 'buttons',
});

export const FlatList = createThemedComponent(Native.FlatList);

export const ActivityIndicator = createThemedComponent(
  Native.ActivityIndicator
);

export const Flex = createThemedComponent(View, {
  defaultStyle: {
    flexDirection: 'row',
  },
});

export const Container = createThemedComponent(View, {
  defaultVariant: 'container',
  themeKey: 'layout',
  defaultStyle: {
    mx: 'auto',
    maxWidth: 'container',
    width: '100%',
  },
});

export const Row = Flex;

export const Box = View;
