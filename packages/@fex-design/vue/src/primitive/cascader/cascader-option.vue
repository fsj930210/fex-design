<script setup lang="ts">
import type { CascaderNode } from '@fex-design/core/cascader/types'
import {
  cascaderOptionClassName,
  cascaderOptionIconClassName,
  cascaderOptionLabelClassName,
} from '@fex-design/styles/cascader'
import {
  checkboxCheckIconClassName,
  checkboxControlClassName,
  checkboxIndicatorClassName,
  checkboxMinusIconClassName,
} from '@fex-design/styles/checkbox'
import { computed } from 'vue'
import { CheckIcon } from '../../icon/check'
import { ChevronRightIcon } from '../../icon/chevron'
import { LoadingIcon } from '../../icon/loading'
import { MinusIcon } from '../../icon/minus'
import { CheckboxControl, CheckboxIndicator, CheckboxRoot } from '../checkbox/checkbox'
import { useCascader } from './use-cascader'

const props = defineProps<{ node: CascaderNode; label?: string }>()
const cascader = useCascader('CascaderOption')
const state = computed(() => ({
  active: cascader.snapshot.value.activePath.includes(props.node.key),
  selected: cascader.snapshot.value.selectedPathKeys.includes(props.node.key),
  checked: cascader.snapshot.value.checkedKeys.includes(props.node.key),
  indeterminate: cascader.snapshot.value.indeterminateKeys.includes(props.node.key),
  loading: cascader.snapshot.value.loadingKeys.includes(props.node.key),
}))
function enter() {
  if (cascader.expandTrigger.value === 'hover' && !props.node.leaf)
    cascader.controller.expand(props.node.key)
}
</script>

<template>
  <div
    role="option"
    :aria-selected="state.selected"
    :aria-disabled="node.disabled || undefined"
    :data-active="state.active || undefined"
    :data-selected="state.selected || undefined"
    :data-disabled="node.disabled || undefined"
    :class="cascaderOptionClassName"
    @pointerenter="enter"
    @click="cascader.controller.select(node.key)"
  >
    <slot :node="node" :state="state"
      ><CheckboxRoot
        v-if="cascader.multiple.value"
        :disabled="node.disabled"
        ><CheckboxControl :checked="state.checked" :indeterminate="state.indeterminate" :class="checkboxControlClassName" @click.stop @change="cascader.controller.toggleCheck(node.key)" /><CheckboxIndicator
          :class="checkboxIndicatorClassName"
          ><CheckIcon :class="checkboxCheckIconClassName" /><MinusIcon
            :class="checkboxMinusIconClassName" /></CheckboxIndicator></CheckboxRoot
      ><span :class="cascaderOptionLabelClassName">{{ label ?? node.label }}</span
      ><span :class="cascaderOptionIconClassName"
        ><LoadingIcon v-if="state.loading" class="animate-spin" /><ChevronRightIcon
          v-else-if="!node.leaf" /><CheckIcon v-else-if="state.selected" /></span
    ></slot>
  </div>
</template>
