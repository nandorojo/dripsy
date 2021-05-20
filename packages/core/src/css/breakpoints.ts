export let defaultBreakpoints = [576, 768, 992, 1200]

let hasSetBreakpoints = false

/**
 * Use this at the root of your app, before importing any other Dripsy code, if you want to set custom breakpoints.
 *
 * ```tsx
 * // App.js
 * import { setBreakpoints } from 'dripsy'
 * setBreakpoints([576, 768, 992, 1200])
 *
 * import { DripsyProvider } from 'dripsy'
 * ```
 */
export function setBreakpoints(breakpoints: typeof defaultBreakpoints) {
  if (hasSetBreakpoints) {
    console.error(
      '[Dripsy] You called setBreakpoints more than once. This function should only be called one time, before any other Dripsy imports.'
    )
  }
  if (breakpoints !== defaultBreakpoints) {
    hasSetBreakpoints = true
    defaultBreakpoints = breakpoints
  }
}
