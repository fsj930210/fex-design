import { defineComponent, onBeforeUnmount, provide, watchPostEffect } from 'vue'
import { getFormControlAttributes } from '@fex-design/core/form/control-binding'
import { createFormControlTarget } from '@fex-design/core/form/control-target'
import { nativeControlTargetKey } from '@fex-design/vue/composables/use-native-control-target'
import { useFieldPresentation } from './use-form-field'
import { useRootContext } from './context'
export const FormControl = defineComponent({
  name: 'FormControl',
  inheritAttrs: false,
  props: {},
  setup(_options, { slots }) {
    const scope = useFieldPresentation()
    const root = useRootContext()
    const registry = createFormControlTarget({
      onTarget: (element, originalId) => {
        const initial = scope.association.getSnapshot().controlId
        if (originalId) scope.association.setControlId(originalId)
        const detach = root.targets.register({
          name: () => String(scope.field.name),
          invalid: () => scope.presentation.value.invalid,
          element: () => element,
        })
        return () => {
          detach()
          scope.association.setControlId(initial)
        }
      },
    })
    provide(nativeControlTargetKey, registry.register)
    const update = () =>
      registry.update(
        getFormControlAttributes(
          scope.links.value,
          String(scope.field.name),
          scope.presentation.value.invalid,
        ),
      )
    // This watches only the DOM association/presentation boundary, never a business value.
    watchPostEffect(update)
    onBeforeUnmount(() => {
      registry.destroy()
    })
    return () => {
      return slots.default?.() ?? null
    }
  },
})
