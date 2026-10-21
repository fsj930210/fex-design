<script setup lang="ts">
import type { InputSearchMeta } from '@fex-design/core/input/types'
import {
  inputActionClassName,
  inputSearchAddonClassName,
} from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
import { computed, ref, useAttrs } from 'vue'
import { SearchIcon } from '@fex-design/vue/icons/search'
import { LoadingIcon } from '@fex-design/vue/icons/loading'
import { Button } from '../button'
import Input from './input.vue'
import type { InputProps } from './input.types'

defineOptions({ name: 'InputSearch', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    InputProps & {
      loading?: boolean
      addonAfter?: null
      addonBeforeButtonProps?: Omit<
        InstanceType<typeof Button>['$props'],
        'loading' | 'disabled' | 'onClick'
      >
      addonAfterButtonProps?: Omit<
        InstanceType<typeof Button>['$props'],
        'loading' | 'disabled' | 'onClick'
      >
    }
  >(),
  {
    loading: false,
  },
)
const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string, meta: InputSearchMeta]
}>()
const attrs = useAttrs()
const internalValue = ref(props.defaultValue ?? '')
const currentValue = computed(() => props.modelValue ?? internalValue.value)
const inputProps = computed(() => {
  const {
    loading: _loading,
    addonAfter: _addonAfter,
    addonBeforeButtonProps: _before,
    addonAfterButtonProps: _after,
    ...rest
  } = props
  return rest
})
function update(value: string) {
  if (props.modelValue === undefined) internalValue.value = value
  emit('update:modelValue', value)
}
function search(source: InputSearchMeta['source']) {
  if (!props.loading && !props.disabled) emit('search', currentValue.value, { source })
}
function keydown(event: KeyboardEvent) {
  const handlers = attrs.onKeydown
  for (const handler of Array.isArray(handlers) ? handlers : [handlers]) {
    if (typeof handler === 'function') handler(event)
  }
  if (event.key === 'Enter' && !event.defaultPrevented) search('enter')
}
</script>

<template>
  <Input
    v-bind="{ ...attrs, ...inputProps, onKeydown: undefined }"
    :model-value="currentValue"
    @update:model-value="update"
    @keydown="keydown"
  >
    <template v-if="$slots.prefix" #prefix
      ><button
        type="button"
        aria-label="Search"
        :disabled="loading || props.disabled"
        :class="inputActionClassName"
        @click="search('prefix')"
      >
        <LoadingIcon v-if="loading" class="animate-spin" /><slot v-else name="prefix" /></button
    ></template>
    <template v-if="$slots.suffix" #suffix
      ><button
        type="button"
        aria-label="Search"
        :disabled="loading"
        :class="inputActionClassName"
        @click="search('suffix')"
      >
        <LoadingIcon v-if="loading" class="animate-spin" /><slot v-else name="suffix" /></button
    ></template>
    <template v-if="$slots.addonBefore" #addonBefore
      ><Button
        variant="solid"
        color="primary"
        v-bind="addonBeforeButtonProps"
        :disabled="loading"
        :loading="loading"
        data-input-addon-fill
        aria-label="Search"
        :class="cn(inputSearchAddonClassName, addonBeforeButtonProps?.class as string | undefined)"
        @click="search('addonBefore')"
        ><slot v-if="!loading" name="addonBefore" /></Button
    ></template>
    <template v-if="addonAfter !== null" #addonAfter
      ><Button
        variant="solid"
        color="primary"
        v-bind="addonAfterButtonProps"
        :disabled="loading"
        :loading="loading"
        data-input-addon-fill
        aria-label="Search"
        :class="cn(inputSearchAddonClassName, addonAfterButtonProps?.class as string | undefined)"
        @click="search('addonAfter')"
        ><slot v-if="!loading" name="addonAfter"><SearchIcon /></slot></Button
    ></template>
    <template v-if="$slots.clear" #clear><slot name="clear" /></template>
  </Input>
</template>
