import { useMemo } from 'react'
import hash from 'stable-hash'

export function useStableMemo<T>(factory: () => T, deps: any[]) {
  return useMemo(factory, [hash(deps)])
}
