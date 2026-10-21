import { useLatest } from '@fex-design/react/hooks/use-latest'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { useMenuContext } from './context'

export function useMenuHost(bind: (element: HTMLElement) => () => void) {
  const dom = useMenuContext()
  const current = useLatest(bind)
  const ref = useMemoizedFn((element: HTMLElement | null) => {
    if (element) return current.current(element)
  })
  // Consumer props can update a registered host without remounting it.
  useIsomorphicLayoutEffect(() => dom.refresh())
  return ref
}
