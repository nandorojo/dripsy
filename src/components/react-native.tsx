import {
  View as rView,
  Text as rText,
  ScrollView as rScrollView,
  FlatList as rFlatList,
  ActivityIndicator as rActivityIndicator,
} from 'react-native';
import { createThemedComponent } from '../css/create-themed-component';

export const View = createThemedComponent(rView);

export const Text = createThemedComponent(rText, {
  themeKey: 'text',
});

export const ScrollView = createThemedComponent(rScrollView);

export const FlatList = createThemedComponent(rFlatList);

export const ActivityIndicator = createThemedComponent(rActivityIndicator);
