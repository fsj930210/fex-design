<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { inputActionClassName } from '@fex-design/styles/input'
import { EyeIcon } from '../../icon/eye'
import { EyeOffIcon } from '../../icon/eye-off'
import Input from './input.vue'
import type { InputProps } from './input.types'

defineOptions({ name: 'InputPassword', inheritAttrs: false })
const props = withDefaults(defineProps<InputProps & { visibilityToggle?: boolean }>(), {
  visibilityToggle: true,
})
const visible = ref(false)
const attrs = useAttrs()
const inputProps = computed(() => {
  const { visibilityToggle: _visibilityToggle, ...rest } = props
  return { ...attrs, ...rest }
})
</script>

<template>
  <Input v-bind="inputProps" :type="visible ? 'text' : 'password'">
    <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
    <template v-if="$slots.addonBefore" #addonBefore><slot name="addonBefore" /></template>
    <template v-if="$slots.addonAfter" #addonAfter><slot name="addonAfter" /></template>
    <template v-if="$slots.clearIcon" #clearIcon><slot name="clearIcon" /></template>
    <template #suffix>
      <slot name="suffix" />
      <button
        v-if="visibilityToggle"
        type="button"
        data-slot="input-action"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        :aria-pressed="visible"
        :class="inputActionClassName"
        @click="visible = !visible"
      >
        <EyeOffIcon v-if="visible" /><EyeIcon v-else />
      </button>
    </template>
  </Input>
</template>
