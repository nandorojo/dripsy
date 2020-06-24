import React, { forwardRef, ComponentType } from 'react';

import { useBreakpointIndex, mapPropsToStyledComponent } from '.';
import { useThemeUI } from '@theme-ui/core';
import styled from 'styled-components';
import { ThemedOptions, StyledProps } from './types';

function withBreakpointAndThemeProp<P>(Component: ComponentType<P>) {
  const WithBreakpointProp = forwardRef<
    typeof Component,
    Omit<P, 'breakpoint' | 'theme'>
  >(function WithBreakpointProp(props, ref) {
    const breakpoint = useBreakpointIndex();
    const { theme } = useThemeUI();

    return (
      <Component
        theme={theme}
        breakpoint={breakpoint}
        {...(props as P)}
        ref={ref}
      />
    );
  });

  WithBreakpointProp.displayName = `Themed.${
    Component.displayName ?? 'NoNameComponent'
  }`;

  return WithBreakpointProp;
}

export function createThemedComponent<P>(
  Component: Parameters<typeof styled>[0],
  options: ThemedOptions = {}
) {
  return withBreakpointAndThemeProp(
    styled(Component)<StyledProps<P>>((props) =>
      mapPropsToStyledComponent(props, options)
    )
  );
}
