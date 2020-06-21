import { FlatList as RnFlatList, PixelRatio } from 'react-native';

import { SxProps } from '@theme-ui/core';
import styled from 'styled-components/native';
import { ComponentType, forwardRef } from 'react';
import { css, useBreakpointIndex } from '../css';

// inject styles into each component using the sx prop and the breakpoint
const mapResponsivePropsToStyle = ({ sx, breakpoint }: Props) => {
  const style = css(sx, breakpoint);
  return style();
};

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

export type Props = SxProps & {
  breakpoint: number;
};

export function createThemedComponent<P>(Component: ComponentType<P>) {
  return withBreakpointProp(
    styled(Component)<Props>(mapResponsivePropsToStyle)
  );
}

export const View = withBreakpointProp(
  styled.View<Props>(mapResponsivePropsToStyle)
);

export const Text = withBreakpointProp(
  styled.Text<Props>(mapResponsivePropsToStyle)
);

export const ScrollView = withBreakpointProp(
  styled.ScrollView<Props>(mapResponsivePropsToStyle)
);

export const TextInput = withBreakpointProp(
  styled.TextInput<Props>(mapResponsivePropsToStyle)
);

export const FlatList = createThemedComponent(RnFlatList);

export const Box = View;

export const Button = withBreakpointProp(
  styled.Button<Props>(mapResponsivePropsToStyle)
);

export const Flex = withBreakpointProp(
  styled.View<Props>((props) => {
    const style = mapResponsivePropsToStyle(props);

    return {
      flexDirection: 'row',
      ...style,
    };
  })
);

export const ActivityIndicator = withBreakpointProp(
  styled.ActivityIndicator<Props>(mapResponsivePropsToStyle)
);
