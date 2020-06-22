import { FlatList as RnFlatList } from 'react-native';

import { SxProps } from '@theme-ui/core';
import styled from 'styled-components/native';
import React, { ComponentType, forwardRef } from 'react';
import { css, useBreakpointIndex } from '../css';

/**
 * Export React Native components
 */

// HOC that makes each component responsive using a breakpoint
function withBreakpointProp<P>(Component: ComponentType<P>) {
  const WithBreakpointProp = forwardRef<
    typeof Component,
    Omit<P, 'breakpoint'>
  >(function WithBreakpointProp(props, ref) {
    const breakpoint = useBreakpointIndex();

    return <Component breakpoint={breakpoint} {...(props as P)} ref={ref} />;
  });

  WithBreakpointProp.displayName = `Themed.${
    Component.displayName ?? 'ComponentWithoutDisplayName'
  }`;

  return WithBreakpointProp;
}

export type StyledProps = SxProps & {
  breakpoint: number;
};

// inject styles into each component using the sx prop and the breakpoint
const mapResponsivePropsToStyle = ({ sx, breakpoint }: StyledProps) => {
  const style = css(sx, breakpoint);
  return style();
};

export function createThemedComponent<P>(Component: ComponentType<P>) {
  return withBreakpointProp(
    styled(Component)<StyledProps>(mapResponsivePropsToStyle)
  );
}

export const View = withBreakpointProp(
  styled.View<StyledProps>(mapResponsivePropsToStyle)
);

export const Text = withBreakpointProp(
  styled.Text<StyledProps>(mapResponsivePropsToStyle)
);

export const ScrollView = withBreakpointProp(
  styled.ScrollView<StyledProps>(mapResponsivePropsToStyle)
);

export const TextInput = withBreakpointProp(
  styled.TextInput<StyledProps>(mapResponsivePropsToStyle)
);

export const FlatList = createThemedComponent(RnFlatList);

export const Box = View;

export const Button = withBreakpointProp(
  styled.Button<StyledProps>(mapResponsivePropsToStyle)
);

export const Flex = withBreakpointProp(
  styled.View<StyledProps>((props) => {
    const style = mapResponsivePropsToStyle(props);

    return {
      flexDirection: 'row',
      ...style,
    };
  })
);

export const ActivityIndicator = withBreakpointProp(
  styled.ActivityIndicator<StyledProps>(mapResponsivePropsToStyle)
);
