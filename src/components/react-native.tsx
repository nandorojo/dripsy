import {
  View as rView,
  Text as rText,
  ScrollView as rScrollView,
  FlatList as rFlatList,
  ActivityIndicator as rActivityIndicator,
  SafeAreaView as rSafeAreaView,
  KeyboardAvoidingView as rKeyboardAvoidingView,
  Picker as rPicker,
  SectionList as rSectionList,
  StatusBar as rStatusBar,
  TouchableHighlight as rTouchableHighlight,
  TouchableOpacity as rTouchableOpacity,
  TouchableWithoutFeedback as rTouchableWithoutFeedback,
  VirtualizedList as rVirtualizedList,
  YellowBox as rYellowBox,
} from 'react-native'
import { createThemedComponent } from '../css/create-themed-component'

export const View = createThemedComponent(rView)

export const Text = createThemedComponent(rText, {
  themeKey: 'text',
})

export const ScrollView = createThemedComponent(rScrollView)

export const FlatList = createThemedComponent(rFlatList)

export const ActivityIndicator = createThemedComponent(rActivityIndicator)

export const SafeAreaView = createThemedComponent(rSafeAreaView)

export const Picker = createThemedComponent(rPicker)

export const SectionList = createThemedComponent(rSectionList)

export const StatusBar = createThemedComponent(rStatusBar)

export const KeyboardAvoidingView = createThemedComponent(rKeyboardAvoidingView)

export const TouchableHighlight = createThemedComponent(rTouchableHighlight)

export const TouchableOpacity = createThemedComponent(rTouchableOpacity)

export const TouchableWithoutFeedback = createThemedComponent(
  rTouchableWithoutFeedback
)

export const VirtualizedList = createThemedComponent(rVirtualizedList)

export const YellowBox = createThemedComponent(rYellowBox)
