export const getBreakpointIndex = ({
  width,
  breakpoints,
}: {
  width: number
  breakpoints: number[]
}) => {
  const breakpointPixels = [...breakpoints]
    .reverse()
    .find((breakpoint) => width >= breakpoint)

  let breakpointIndex = breakpoints.findIndex(
    (breakpoint) => breakpointPixels === breakpoint
  )
  breakpointIndex = breakpointIndex === -1 ? 0 : breakpointIndex + 1

  return breakpointIndex
}
