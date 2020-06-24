import React, { forwardRef, ComponentType } from 'react';

import { mapPropsToStyledComponent } from '.';
import { useThemeUI } from '@theme-ui/core';
import styled from 'styled-components';
import { ThemedOptions, StyledProps } from './types';

function withBreakpointAndThemeProp<P>(Component: ComponentType<P>) {
  const WithBreakpointProp = forwardRef<
    typeof Component,
    Omit<P, 'breakpoint' | 'theme'>
  >(function WithBreakpointProp(props, ref) {
    const { theme } = useThemeUI();

    return <Component theme={theme} {...(props as P)} ref={ref} />;
  });

  WithBreakpointProp.displayName = `Themed.${
    Component.displayName ?? 'NoNameComponent'
  }`;

  return WithBreakpointProp;
}

console.log('chris weber!');
export function createThemedComponent<P>(
  Component: Parameters<typeof styled>[0],
  options: ThemedOptions = {}
) {
  console.log(
    '[web] creating themed component',
    'displayName' in (Component as any)
      ? (Component as any).displayName
      : 'no display name',
    options
  );
  return withBreakpointAndThemeProp(
    styled(Component)<StyledProps<P>>((props) =>
      mapPropsToStyledComponent(props, options)
    )
  );
}
