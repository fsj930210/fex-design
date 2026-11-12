<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import { cn } from '@fex-design/utils'
import { CircleXIcon } from '@fex-design/vue/icons/circle-x'
import {
  InputAddonAfter,
  InputAddonBefore,
  InputControl,
  InputGroup,
  InputPrefix,
  InputRoot,
  InputSuffix,
} from '@fex-design/vue/primitive/input'
import type { InputProps } from './input.types'
import InputClearWhenAvailable from './input-clear.vue'

defineOptions({ name: 'Input', inheritAttrs: false })
const props = withDefaults(defineProps<InputProps>(), {
  defaultValue: '',
  size: 'md',
  variant: 'outlined',
  placeholder: undefined,
  clearable: false,
})
const emit = defineEmits<{ change: [event: Event]; clear: [] }>()
const attrs = useAttrs()
const control = useTemplateRef<{ focus: () => void; blur: () => void; select: () => void }>(
  'control',
)
const rootClass = computed(() => cn(props.classNames?.root, attrs?.class as string | undefined))
defineExpose({
  focus: () => control.value?.focus(),
  blur: () => control.value?.blur(),
  select: () => control.value?.select(),
})
</script>

<template>
  <InputGroup v-if="$slots.addonBefore || $slots.addonAfter">
    <InputAddonBefore
      v-if="$slots.addonBefore"
      :class="classNames?.addonBefore"
      :style="styles?.addonBefore"
      ><slot name="addonBefore"
    /></InputAddonBefore>
    <InputRoot
      :value="value"
      :default-value="defaultValue"
      :disabled="disabled"
      :read-only="readonly"
      :size="size"
      :variant="variant"
      :data-warning="
        typeof attrs?.['data-warning'] === 'string' ? attrs['data-warning'] : undefined
      "
      :class="rootClass"
      :style="[styles?.root, attrs?.style]"
      @change="emit('change', $event)"
      @clear="emit('clear')"
    >
      <InputPrefix v-if="$slots.prefix" :class="classNames?.prefix" :style="styles?.prefix"
        ><slot name="prefix"
      /></InputPrefix>
      <InputControl
        v-bind="attrs"
        :placeholder="placeholder ?? (attrs.placeholder as string | undefined)"
        ref="control"
        :class="classNames?.control"
        :style="styles?.control"
      />
      <InputClearWhenAvailable v-if="clearable" :class="classNames?.clear" :style="styles?.clear"
        ><slot name="clear"><CircleXIcon /></slot
      ></InputClearWhenAvailable>
      <InputSuffix v-if="$slots.suffix" :class="classNames?.suffix" :style="styles?.suffix"
        ><slot name="suffix"
      /></InputSuffix>
    </InputRoot>
    <InputAddonAfter
      v-if="$slots.addonAfter"
      :class="classNames?.addonAfter"
      :style="styles?.addonAfter"
      ><slot name="addonAfter"
    /></InputAddonAfter>
  </InputGroup>
  <InputRoot
    v-else
    :value="value"
    :default-value="defaultValue"
    :disabled="disabled"
    :read-only="readonly"
    :size="size"
    :variant="variant"
    :data-warning="typeof attrs?.['data-warning'] === 'string' ? attrs['data-warning'] : undefined"
    :class="rootClass"
    :style="[styles?.root, attrs?.style]"
    @change="emit('change', $event)"
    @clear="emit('clear')"
  >
    <InputPrefix v-if="$slots.prefix" :class="classNames?.prefix" :style="styles?.prefix"
      ><slot name="prefix"
    /></InputPrefix>
    <InputControl
      v-bind="attrs"
      :placeholder="placeholder ?? (attrs.placeholder as string | undefined)"
      ref="control"
      :class="classNames?.control"
      :style="styles?.control"
    />
    <InputClearWhenAvailable v-if="clearable" :class="classNames?.clear" :style="styles?.clear"
      ><slot name="clear"><CircleXIcon /></slot
    ></InputClearWhenAvailable>
    <InputSuffix v-if="$slots.suffix" :class="classNames?.suffix" :style="styles?.suffix"
      ><slot name="suffix"
    /></InputSuffix>
  </InputRoot>
</template>
