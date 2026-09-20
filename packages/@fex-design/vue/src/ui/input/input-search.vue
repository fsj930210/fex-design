<script setup lang="ts">
import type { InputSearchMeta } from '@fex-design/core/input/types'
import { inputActionClassName, inputSearchAddonClassName } from '@fex-design/styles/input'
import { computed, ref, useAttrs } from 'vue'
import { SearchIcon } from '../../icon/search'
import { LoadingIcon } from '../../icon/loading'
import { Button } from '../button/button'
import Input from './input.vue'
import type { InputProps } from './input.types'

defineOptions({ name: 'InputSearch', inheritAttrs: false })
const props = withDefaults(defineProps<InputProps & { loading?: boolean; addonAfter?: null }>(), {
  loading: false,
})
const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string, meta: InputSearchMeta]
}>()
const attrs = useAttrs()
const internalValue = ref(props.defaultValue ?? '')
const currentValue = computed(() => props.modelValue ?? internalValue.value)
const inputProps = computed(() => {
  const { loading: _loading, addonAfter: _addonAfter, ...rest } = props
  return { ...attrs, ...rest }
})
function update(value: string) {
  if (props.modelValue === undefined) internalValue.value = value
  emit('update:modelValue', value)
}
function search(source: InputSearchMeta['source']) {
  if (!props.loading) emit('search', currentValue.value, { source })
}
</script>

<template>
  <Input
    v-bind="inputProps"
    :model-value="currentValue"
    @update:model-value="update"
    @keydown.enter="search('enter')"
  >
    <template v-if="$slots.prefix" #prefix
      ><button
        type="button"
        aria-label="Search"
        :disabled="loading"
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
        :loading="loading"
        data-input-addon-fill
        aria-label="Search"
        :class="inputSearchAddonClassName"
        @click="search('addonBefore')"
        ><slot v-if="!loading" name="addonBefore" /></Button
    ></template>
    <template v-if="addonAfter !== null" #addonAfter
      ><Button
        variant="solid"
        color="primary"
        :loading="loading"
        data-input-addon-fill
        aria-label="Search"
        :class="inputSearchAddonClassName"
        @click="search('addonAfter')"
        ><slot v-if="!loading" name="addonAfter"><SearchIcon /></slot></Button
    ></template>
    <template v-if="$slots.clear" #clear><slot name="clear" /></template>
  </Input>
</template>
