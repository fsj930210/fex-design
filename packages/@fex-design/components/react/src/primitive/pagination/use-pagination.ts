import { createPaginationController } from '@fex-design/core/pagination/create-pagination-controller'
import type { PaginationOptions } from '@fex-design/core/pagination/types'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'

export function usePagination(options: PaginationOptions = {}) {
  const onChange = useMemoizedFn<NonNullable<PaginationOptions['onChange']>>((value, details) =>
    options.onChange?.(value, details),
  )
  const controller = useLazyRef(() => createPaginationController({ ...options, onChange })).current
  const snapshot = useCoreStore(controller)
  // Commit React props to the external core store; core deduplicates unchanged options.
  useIsomorphicLayoutEffect(() => controller.setOptions({ ...options, onChange }))
  return { controller, snapshot }
}
