<script setup lang="ts">
import type { SelectOption } from '@fex-design/core/select/types'
import { getSelectValueLayout } from '@fex-design/core/select/value-layout'
import {
  selectPlaceholderClassName,
  selectValueClassName,
} from '@fex-design/components-styles/select'
import Tag from '../tag/tag.vue'
import TagAction from '../tag/tag-action.vue'
import { computed, useTemplateRef, type ButtonHTMLAttributes, type HTMLAttributes } from 'vue'
import { useSelect } from './use-select'

defineOptions({ name: 'SelectValue' })
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
type SelectedTagProps = Omit<InstanceType<typeof Tag>['$props'], 'disabled'> &
  Omit<HTMLAttributes, 'innerHTML' | 'textContent'>
type SelectedTagActionProps = Omit<ButtonHTMLAttributes, 'innerHTML' | 'textContent' | 'onClick'>
const props = withDefaults(
  defineProps<{
    tagProps?: SelectedTagProps | ((option: SelectOption) => SelectedTagProps) | undefined
    tagActionProps?:
      | SelectedTagActionProps
      | ((option: SelectOption) => SelectedTagActionProps)
      | undefined
    overflowTagProps?: SelectedTagProps | undefined
    placeholder?: string | undefined
    maxTagCount?: number | undefined
  }>(),
  { placeholder: '请选择' },
)
const select = useSelect('SelectValue')
const layout = computed(() =>
  getSelectValueLayout(select.selectedOptions.value, {
    multiple: select.multiple.value,
    showSearch: select.showSearch.value,
    open: select.snapshot.value.open,
    searchValue: select.snapshot.value.searchValue,
    maxTagCount: props.maxTagCount,
  }),
)
</script>
<template>
  <div ref="element" :class="selectValueClassName">
    <slot v-if="$slots.default" />
    <template v-else-if="layout.showTags">
      <template v-for="option in layout.visibleOptions" :key="option.value">
        <slot name="tag" :option="option" :remove="() => select.removeValue(option.value)">
          <Tag
            size="sm"
            v-bind="typeof props.tagProps === 'function' ? props.tagProps(option) : props.tagProps"
            :disabled="select.disabled.value || option.disabled"
            @pointerdown.capture.prevent
          >
            {{ option.label }}
            <TagAction
              v-bind="{
                ...(typeof props.tagActionProps === 'function'
                  ? props.tagActionProps(option)
                  : props.tagActionProps),
                onClick: undefined,
              }"
              :aria-label="`Remove ${String(option.label)}`"
              @click.stop="select.removeValue(option.value)"
            />
          </Tag>
        </slot>
      </template>
      <Tag v-if="layout.overflowCount > 0" v-bind="props.overflowTagProps" size="sm"
        >+{{ layout.overflowCount }}</Tag
      >
    </template>
    <slot v-else-if="layout.showSingle" name="value" :option="select.selectedOptions.value[0]">{{
      select.selectedOptions.value[0]?.label
    }}</slot>
    <span v-else-if="layout.showPlaceholder" :class="selectPlaceholderClassName">{{
      props.placeholder
    }}</span>
  </div>
</template>
