<script setup lang="ts">
import type {
  SwitchClassNames,
  SwitchShape,
  SwitchSize,
  SwitchStyles,
} from '@fex-design/core/switch/types'
import { computed, useAttrs, useTemplateRef, type PropType, type StyleValue } from 'vue'
import { SwitchRoot, SwitchContent, SwitchThumb } from '../../primitive/switch/switch'
import { Spinner } from '../../primitive/spinner/spinner'
defineOptions({ name: 'Switch', inheritAttrs: false })
const props = defineProps({
  checked: { type: Boolean, default: undefined },
  defaultChecked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  size: { type: String as PropType<SwitchSize>, default: 'md' },
  shape: { type: String as PropType<SwitchShape>, default: 'rounded' },
  classNames: { type: Object as PropType<SwitchClassNames>, default: () => ({}) },
  styles: { type: Object as PropType<SwitchStyles<StyleValue>>, default: () => ({}) },
})
const emit = defineEmits<{
  change: [checked: boolean, event: MouseEvent]
  'update:checked': [checked: boolean]
  click: [event: MouseEvent]
}>()
const root = useTemplateRef<InstanceType<typeof SwitchRoot>>('root')
const attrs = useAttrs()
const element = computed(() => root.value?.element)
const rootStyle = computed(() => [attrs.style, props.styles.root])
defineExpose({ element })
</script>
<template>
  <SwitchRoot
    v-bind="$attrs"
    ref="root"
    :checked="props.checked"
    :default-checked="props.defaultChecked"
    :disabled="props.disabled"
    :loading="props.loading"
    :size="props.size"
    :shape="props.shape"
    :class="[attrs.class, props.classNames.root]"
    :style="rootStyle"
    @change="(checked, event) => emit('change', checked, event)"
    @click="emit('click', $event)"
    @update:checked="emit('update:checked', $event)"
  >
    <SwitchContent
      v-if="$slots.checkedContent"
      state="checked"
      :class="props.classNames.content"
      :style="props.styles.content"
      ><slot name="checkedContent"
    /></SwitchContent>
    <SwitchContent
      v-if="$slots.uncheckedContent"
      state="unchecked"
      :class="props.classNames.content"
      :style="props.styles.content"
      ><slot name="uncheckedContent"
    /></SwitchContent>
    <SwitchThumb :class="props.classNames.thumb" :style="props.styles.thumb"
      ><Spinner v-if="props.loading" aria-hidden="true"
    /></SwitchThumb>
  </SwitchRoot>
</template>
