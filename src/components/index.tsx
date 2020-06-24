import { createThemedComponent } from '../css/create-themed-component';
import {
  View as rView,
  Text as rText,
  ScrollView as rScrollView,
  TextInput as rTextInput,
  FlatList as rFlatList,
  ActivityIndicator as rActivityIndicator,
  Button as rButton,
} from 'react-native';

export const View = createThemedComponent(rView);

export const Text = createThemedComponent(rText, {
  themeKey: 'text',
});

export const ScrollView = createThemedComponent(rScrollView);

export const TextInput = createThemedComponent(rTextInput);

export const Button = createThemedComponent(rButton, {
  themeKey: 'buttons',
});

export const FlatList = createThemedComponent(rFlatList);

export const ActivityIndicator = createThemedComponent(rActivityIndicator);

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
