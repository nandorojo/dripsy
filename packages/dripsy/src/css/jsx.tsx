/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, ReactChild } from 'react'
import { createThemedComponent } from './create-themed-component'

export function jsx(
	type: FunctionComponent,
	props: Record<string, any>,
	...children: ReactChild[]
) {
	return React.createElement.apply(null, [
		createThemedComponent(type),
		props,
		...children,
	])
}
