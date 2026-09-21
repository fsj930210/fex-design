<script setup lang="ts">
import type { SelectOption } from '@fex-design/core/select/types'
import { selectOptionClassName, selectOptionIndicatorClassName, selectOptionLabelClassName } from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'
import { CheckIcon } from '@fex-design/vue/icons/check'
import { useSelect } from './use-select'
defineOptions({ name: 'SelectItem', inheritAttrs: false })
const props = defineProps<{ item: SelectOption; class?: string }>()
const select = useSelect('SelectItem')
const selected = computed(() => select.controller.selection.isSelected(props.item.value))
const disabled = computed(() => props.item.disabled === true || select.controller.selection.isDisabled(props.item.value))
</script>
<template>
  <div v-bind="$attrs" role="option" :aria-selected="selected" :aria-disabled="disabled || undefined"
    :data-selected="selected || undefined" :data-active="select.snapshot.value.activeValue === item.value || undefined"
    :data-disabled="disabled || undefined" :class="cn(selectOptionClassName, props.class)"
    @pointermove="select.controller.setActiveValue(item.value, 'pointer')" @pointerdown.prevent
    @click="!disabled && select.controller.selectValue(item.value)">
    <span :class="selectOptionLabelClassName"><slot>{{ item.label }}</slot></span>
    <span :class="selectOptionIndicatorClassName"><slot name="indicator"><CheckIcon /></slot></span>
  </div>
</template>
