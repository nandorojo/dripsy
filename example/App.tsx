import React from 'react'
import {
	View,
	Text as DripText,
	createThemedComponent,
	useResponsiveValue,
	DripsyProvider,
	setDripsyOptions,
} from 'dripsy'
import { Text } from 'react-native'

setDripsyOptions({ ssr: true })

const theme = {
	useBodyStyles: false,
	useLocalStorage: false,
	useCustomProperties: false,
	useColorSchemeMediaQuery: false,
	colors: {
		primary: '#41b87a',
		secondary: 'black',
		background: 'white',
		red: 'red',
		green: 'green',
		blue: 'blue',
	},
	text: {
		primary: {
			fontSize: 40,
		},
	},
}

const G = createThemedComponent(Text, {
	themeKey: 'text',
})

const ResponsiveSquare = () => {
	// Return literal values:
	const textColor = useResponsiveValue(['red', 'green', 'blue'])
	// Or provide a function to access theme values:
	const squareColor = useResponsiveValue((theme) => [
		theme?.colors?.blue,
		theme?.colors?.red,
		theme?.colors?.green,
	])

	return (
		<View
			sx={{
				width: [100, 120, 150],
				height: [100, 120, 150],
				bg: squareColor,
				mt: 1,
			}}
		>
			<DripText sx={{ color: textColor }}>Hello</DripText>
		</View>
	)
}

export default function App() {
	TestFunction()
	return (
		<DripsyProvider theme={theme} options={{ ssr: true }}>
			<View
				sx={{
					backgroundColor: () => ['primary', 'blue'],
					height: [400, 800],
				}}
			>
				<DripText>joi</DripText>
				<G variant="primary">Hey</G>
				<G>Hi!</G>
				<ResponsiveSquare />
			</View>
		</DripsyProvider>
	)
}
