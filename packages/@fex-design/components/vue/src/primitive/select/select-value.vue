<script setup lang="ts">
import { getSelectValueLayout } from '@fex-design/core/select/value-layout'
import { selectPlaceholderClassName, selectValueClassName } from '@fex-design/components-styles/select'
import Tag from '../tag/tag.vue'
import TagAction from '../tag/tag-action.vue'
import { computed, useTemplateRef } from 'vue'
import { useSelect } from './use-select'

defineOptions({ name: 'SelectValue' })
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
const props = withDefaults(defineProps<{ placeholder?: string | undefined; maxTagCount?: number | undefined }>(), { placeholder: '请选择' })
const select = useSelect('SelectValue')
const layout = computed(() => getSelectValueLayout(select.selectedOptions.value, {
  multiple: select.multiple.value, showSearch: select.showSearch.value,
  open: select.snapshot.value.open, searchValue: select.snapshot.value.searchValue,
  maxTagCount: props.maxTagCount,
}))
</script>
<template>
  <div ref="element" :class="selectValueClassName">
    <slot v-if="$slots.default" />
    <template v-else-if="layout.showTags">
      <template
        v-for="option in layout.visibleOptions"
        :key="option.value"
      >
        <slot name="tag" :option="option" :remove="() => select.removeValue(option.value)">
          <Tag size="sm" @pointerdown.capture.prevent>
            {{ option.label }}
            <TagAction
              :aria-label="`Remove ${String(option.label)}`"
              @click.stop="select.removeValue(option.value)"
            />
          </Tag>
        </slot>
      </template>
      <Tag
        v-if="layout.overflowCount > 0"
        size="sm"
        >+{{ layout.overflowCount }}</Tag
      >
    </template>
    <slot
      v-else-if="layout.showSingle"
      name="value"
      :option="select.selectedOptions.value[0]"
      >{{ select.selectedOptions.value[0]?.label }}</slot
    >
    <span v-else-if="layout.showPlaceholder" :class="selectPlaceholderClassName">{{
      props.placeholder
    }}</span>
  </div>
</template>
