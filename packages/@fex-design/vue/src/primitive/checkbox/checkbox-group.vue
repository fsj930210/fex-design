<script setup lang="ts">
import { createCheckboxGroupController } from '@fex-design/core/checkbox/create-checkbox-group-controller'
import type { CheckboxGroupChangeMeta, CheckboxValue } from '@fex-design/core/checkbox/types'
import { checkboxGroupClassName, type CheckboxGroupStyleProps } from '@fex-design/styles/checkbox'
import { cn } from '@fex/utils'
import { computed, provide, reactive, useAttrs } from 'vue'
import { useCoreStore } from '../../composables/use-core-store'
import { checkboxGroupKey } from './context'
defineOptions({ name: 'CheckboxGroup', inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    value?: CheckboxValue[]
    defaultValue?: CheckboxValue[]
    disabled?: boolean
    orientation?: CheckboxGroupStyleProps['orientation']
  }>(),
  { orientation: 'vertical' },
)
const emit = defineEmits<{ change: [value: CheckboxValue[], meta: CheckboxGroupChangeMeta] }>()
const attrs = useAttrs()
const options = reactive({
  get value() {
    return props.value
  },
  get defaultValue() {
    return props.defaultValue
  },
  get disabled() {
    return props.disabled
  },
  onChange: (value: CheckboxValue[], meta: CheckboxGroupChangeMeta) => emit('change', value, meta),
})
const controller = createCheckboxGroupController(options)
const snapshot = useCoreStore(controller)
provide(checkboxGroupKey, {
  value: computed(() => props.value ?? snapshot.value.value),
  disabled: computed(() => props.disabled === true),
  toggle: controller.toggle,
})
</script>
<template>
  <div
    v-bind="attrs"
    role="group"
    data-slot="checkbox-group"
    :data-orientation="props.orientation"
    :class="
      cn(
        checkboxGroupClassName({ orientation: props.orientation }),
        attrs.class as string | undefined,
      )
    "
  >
    <slot />
  </div>
</template>
