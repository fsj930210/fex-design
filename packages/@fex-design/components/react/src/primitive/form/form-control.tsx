import type { ReactNode } from 'react'
import { useLazyRef } from '../../hooks/use-lazy-ref'
import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect'
import { useMemoizedFn } from '../../hooks/use-memoized-fn'
import { NativeControlTargetContext } from '@fex-design/react/hooks/use-native-control-target'
import { createFormControlTarget } from '@fex-design/core/form/control-target'
import { getFormControlAttributes } from '@fex-design/core/form/control-binding'
import { useFieldPresentation } from './use-form-field'
import { useRootContext } from './context'

export interface FormControlProps {
  children?: ReactNode
}

/** Semantic control bridge; callers provide the control value and change event explicitly. */
export function FormControl({ children }: FormControlProps) {
  const { field, association, links, invalid } = useFieldPresentation()
  const root = useRootContext()
  const readName = useMemoizedFn(() => String(field.name))
  const readInvalid = useMemoizedFn(() => invalid)
  const registry = useLazyRef(() =>
    createFormControlTarget({
      onTarget: (element, originalId) => {
        const initial = association.getSnapshot().controlId
        if (originalId) association.setControlId(originalId)
        const detach = root.targets.register({
          name: readName,
          invalid: readInvalid,
          element: () => element,
        })
        return () => {
          detach()
          association.setControlId(initial)
        }
      },
    }),
  ).current
  const register = useMemoizedFn((element: HTMLElement | null) =>
    element ? registry.register(element) : undefined,
  )
  const attributes = getFormControlAttributes(links, String(field.name), invalid)
  useIsomorphicLayoutEffect(() => {
    registry.update(attributes)
  }, [registry, attributes])
  useIsomorphicLayoutEffect(() => () => registry.destroy(), [registry])
  return <NativeControlTargetContext value={register}>{children}</NativeControlTargetContext>
}
