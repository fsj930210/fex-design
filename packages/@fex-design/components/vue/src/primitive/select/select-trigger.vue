<script setup lang="ts">
import {
  selectClearClassName,
  selectClearableIndicatorClassName,
  selectIndicatorClassName,
  selectInputClassName,
  selectSuffixClassName,
  selectTriggerClassName,
  selectValueContainerClassName,
} from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { computed, useSlots } from 'vue'
import type { InputClassNames, InputStyles } from '@fex-design/core/input/types'
import type { CSSProperties } from 'vue'
import { ChevronDownIcon } from '@fex-design/vue/icons/chevron'
import { CircleXIcon } from '@fex-design/vue/icons/circle-x'
import { LoadingIcon } from '@fex-design/vue/icons/loading'
import PopoverTrigger from '../popover/popover-trigger.vue'
import SelectValue from './select-value.vue'
import { useSelect } from './use-select'

defineOptions({ inheritAttrs: false })
const props = defineProps<{
  class?: string | undefined
  placeholder?: string | undefined
  maxTagCount?: number | undefined
  inputProps?: Record<string, unknown> | undefined
  classNames?: InputClassNames | undefined
  styles?: InputStyles<CSSProperties> | undefined
}>()
const select = useSelect('SelectTrigger')
const slots = useSlots()
const className = computed(() => cn(selectTriggerClassName(), props.classNames?.root, props.class))
const placeholder = computed(() => props.placeholder ?? '请选择')
const inputAttrs = computed(() => { const { class: _class, style: _style, ...attrs } = props.inputProps ?? {}; return attrs })
function keydown(event: KeyboardEvent) {
  if (event.defaultPrevented) return
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
    select.controller.open()
    select.controller.moveActive(event.key === 'ArrowDown' ? 1 : -1)
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    select.controller.moveActiveTo(event.key === 'Home' ? 'first' : 'last')
  } else if (event.key === 'Enter') {
    event.preventDefault()
    select.controller.selectActive()
  } else if (event.key === 'Backspace' && !select.snapshot.value.searchValue)
    select.controller.removeLastSelected()
  else if (event.key === 'Escape') select.controller.close()
}
function input(event: Event) {
  select.controller.setSearchValue((event.target as HTMLInputElement).value)
  select.controller.open()
}
function inputPointerdown() {
  select.controller.open()
}
</script>
<template>
  <PopoverTrigger v-slot="trigger">
    <div
      v-bind="{ ...$attrs, ...trigger.props }"
      :ref="trigger.ref"
      role="presentation"
      data-slot="select-trigger"
      :data-disabled="select.disabled.value || undefined"
      :data-clearable="select.clearable.value && select.selectedOptions.value.length ? 'true' : undefined"
      :data-status="select.status.value"
      :class="className"
      :style="[props.styles?.root, props.inputProps?.style]"
      @keydown="keydown"
    >
      <slot name="prefix" />
      <div :class="[selectValueContainerClassName, props.classNames?.control]">
        <SelectValue
          :placeholder="select.showSearch.value ? undefined : placeholder"
          :max-tag-count="props.maxTagCount"
          ><template v-if="$slots.tag" #tag="slotProps"><slot name="tag" v-bind="slotProps" /></template
          ><template #value="slotProps"
            ><slot name="value" v-bind="slotProps">{{ slotProps.option.label }}</slot></template
          ></SelectValue
        >
        <input
          v-bind="inputAttrs"
          role="combobox"
          :style="props.styles?.control"
          :aria-expanded="select.snapshot.value.open"
          :aria-controls="select.listId"
          :disabled="select.disabled.value"
          :readonly="!select.showSearch.value"
          :placeholder="
            select.showSearch.value && !select.selectedOptions.value.length
              ? placeholder
              : undefined
          "
          :value="select.snapshot.value.searchValue"
          :class="
            cn(
              selectInputClassName,
              props.inputProps?.class as string | undefined,
              props.classNames?.control,
              !select.showSearch.value && 'absolute size-px min-w-0 overflow-hidden opacity-0',
            )
          "
          @focus="select.controller.open()"
          @pointerdown="inputPointerdown"
          @click.stop
          @input="input"
        />
      </div>
      <span data-slot="select-suffix" :class="[selectSuffixClassName, props.classNames?.suffix]">
        <LoadingIcon v-if="select.loading.value" class="animate-spin" />
        <template v-else>
        <span :class="select.clearable.value && select.selectedOptions.value.length ? selectClearableIndicatorClassName : undefined">
          <slot v-if="slots.suffix" name="suffix" />
          <span v-else :data-state="select.snapshot.value.open ? 'open' : 'closed'" :class="selectIndicatorClassName"><ChevronDownIcon /></span>
        </span>
        <button
          v-if="select.clearable.value && select.selectedOptions.value.length"
          type="button"
          aria-label="Clear selection"
          :class="[selectClearClassName, props.classNames?.clear]"
          @pointerdown.prevent
          @click.stop="select.controller.clear()"
          ><slot name="clear"><CircleXIcon /></slot
        ></button>
        </template>
      </span>
    </div>
  </PopoverTrigger>
</template>
