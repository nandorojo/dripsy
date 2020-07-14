import React, { ComponentType, ComponentProps } from 'react';
import { ThemedOptions, StyledProps } from './types';
import { useThemeUI } from '@theme-ui/core';
import { useBreakpointIndex, mapPropsToStyledComponent } from '.';

// type Props<P> = SxProps & {
//   as?: ComponentType<P>;
//   variant?: string;
//   /**
//    * Optional style value to pass react native styles that aren't available in the `sx` prop, such as shadows.
//    */
//   // @ts-ignore
//   nativeStyle?: P['style'];
// };

type Props<P> = Omit<StyledProps<P>, 'theme' | 'breakpoint'>;

export function createThemedComponent<P>(
  Component: ComponentType<P>,
  options: ThemedOptions = {}
) {
  // without styled-components...
  const WrappedComponent = React.forwardRef<
    typeof Component,
    Props<P> & ComponentProps<typeof Component>
  >(function Wrapped(prop, ref) {
    const { sx, as: SuperComponent, variant, style, ...props } = prop;

    const { theme } = useThemeUI();
    const breakpoint = useBreakpointIndex();

    const styles = mapPropsToStyledComponent(
      { theme, breakpoint, variant, sx, style },
      options
    )();

    const TheComponent = SuperComponent || Component;

    return (
      <TheComponent {...((props as unknown) as P)} ref={ref} style={styles} />
    );
  });

  WrappedComponent.displayName = `Themed.${
    Component.displayName ?? 'NoNameComponent'
  }`;

  return WrappedComponent;
}
