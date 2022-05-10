# `useResponsiveValue()`

Get a responsive value for a specific breakpoint.

```ts
import { useResponsiveValue } from 'dripsy'

const columns = useResponsiveValue([1, 2, 3]) // 1 on mobile, 2 on tablet, 3 on greater
```

You can also access theme values directly:


```ts
import { useResponsiveValue } from 'dripsy'

const padding = useResponsiveValue(theme => [theme.space.$1, theme.space.$2])
```

Note that this hook doesn't work on pages that are server-side rendered. If you set `ssr={true}` on DripsyProvider, then this doesn't matter.
