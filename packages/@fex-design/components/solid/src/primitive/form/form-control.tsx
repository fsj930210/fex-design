import { createEffect, onCleanup, type JSX } from 'solid-js'
import { getFormControlAttributes } from '@fex-design/core/form/control-binding'
import { createFormControlTarget } from '@fex-design/core/form/control-target'
import { NativeControlTargetContext } from '@fex-design/solid/primitives/native-control-target'
import { createFormBinding } from './create-form-binding'
import { useRootContext } from './context'

export type FormControlProps = { children?: JSX.Element }

export function FormControl(props: FormControlProps) {
  const scope = createFormBinding()
  const root = useRootContext()
  const registry = createFormControlTarget({
    onTarget: (element, originalId) => {
      const initial = scope.association.getSnapshot().controlId
      if (originalId) scope.association.setControlId(originalId)
      const detach = root.targets.register({
        name: () => String(scope.field().name),
        invalid: () => scope.presentation().invalid,
        element: () => element,
      })
      return () => {
        detach()
        scope.association.setControlId(initial)
      }
    },
  })
  createEffect(() => {
    registry.update(
      getFormControlAttributes(
        scope.links(),
        String(scope.field().name),
        scope.presentation().invalid,
      ),
    )
  })
  onCleanup(() => registry.destroy())
  return (
    <NativeControlTargetContext.Provider value={registry.register}>
      {props.children}
    </NativeControlTargetContext.Provider>
  )
}
