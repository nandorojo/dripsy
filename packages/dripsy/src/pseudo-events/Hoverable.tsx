// https://gist.github.com/ianmartorell/32bb7df95e5eff0a5ee2b2f55095e6a6

import React, { useCallback, ReactNode } from 'react'
import { Platform } from 'react-native'

import { isHoverEnabled } from './HoverState'

export interface HoverableProps {
  onHoverIn?: () => void
  onHoverOut?: () => void
  children: ((props: { isHovered: boolean }) => ReactNode) | ReactNode
  /**
   * Set this to `false` if there are no hover styles.
   *
   * This way, we avoid even setting up hover states.
   */
  isHoverable: boolean
  /**
   * If `isHoverable` is false, it will return this node instead.
   *
   * Maybe we should deprecate this. Not sure TBH.
   *
   * The only real reason to keep this is to avoid having a function component in render...
   */
  //   nonHoverableNode: React.ReactNode
}

export default function Hoverable({
  onHoverIn,
  onHoverOut,
  children,
  isHoverable,
}: //   nonHoverableNode
HoverableProps) {
  const [isHovered, setHovered] = React.useState(false)
  const [showHover, setShowHover] = React.useState(true)

  const handleMouseEnter = useCallback(() => {
    if (isHoverEnabled() && !isHovered) {
      if (onHoverIn) onHoverIn()
      setHovered(true)
    }
  }, [isHovered, onHoverIn])

  const handleMouseLeave = useCallback(() => {
    if (isHovered) {
      if (onHoverOut) onHoverOut()
      setHovered(false)
    }
  }, [isHovered, onHoverOut])

  const handleGrant = useCallback(() => {
    setShowHover(false)
  }, [])

  const handleRelease = useCallback(() => {
    setShowHover(true)
  }, [])

  const child =
    typeof children === 'function'
      ? children({ isHovered: isHoverable && showHover && isHovered })
      : children

  if (!isHoverable || Platform.OS !== 'web') return <>{child}</>

  return React.cloneElement(React.Children.only(child), {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    // prevent hover showing while responder
    onResponderGrant: handleGrant,
    onResponderRelease: handleRelease,
    // if child is Touchable
    onPressIn: handleGrant,
    onPressOut: handleRelease,
  })
}
