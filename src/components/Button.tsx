import { useDripsyTheme } from '../'
import { Text, View } from '.'
import React, { ComponentProps } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

type Props = {
	children: React.ReactNode | string
	variant?: string
	sx?: ComponentProps<typeof View>['sx']
	labelSx?: ComponentProps<typeof View>['sx']
	isText?: boolean
	onPress?: () => void
	labelProps?: ComponentProps<typeof Text>
	touchableProps?: ComponentProps<typeof TouchableWithoutFeedback>
} & ComponentProps<typeof View>

export function Button(props: Props) {
	const {
		children,
		variant = 'primary',
		sx = {},
		labelSx = {},
		isText = true,
		onPress,
		labelProps,
		touchableProps,
		...viewProps
	} = props

	const { theme } = useDripsyTheme()

	const { label: labelStyle = {}, ...variantStyle }: any = theme.buttons[
		variant
	] ?? {
		label: {},
	}

	return (
		<TouchableWithoutFeedback {...touchableProps} onPress={onPress}>
			<View {...viewProps} sx={{ ...variantStyle, ...sx }}>
				{isText ? (
					<Text {...labelProps} sx={{ ...labelStyle, ...labelSx }}>
						{children}
					</Text>
				) : (
					children
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}
