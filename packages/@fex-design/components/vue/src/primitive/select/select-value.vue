<script setup lang="ts">
import { selectPlaceholderClassName, selectValueClassName } from '@fex-design/components-styles/select'
import Tag from '../tag/tag.vue'
import TagAction from '../tag/tag-action.vue'
import { computed } from 'vue'
import { useSelect } from './use-select'

const props = defineProps<{ placeholder?: string | undefined; maxTagCount?: number | undefined }>()
const select = useSelect('SelectValue')
const visibleOptions = computed(() =>
  props.maxTagCount === undefined
    ? select.selectedOptions.value
    : select.selectedOptions.value.slice(0, Math.max(0, props.maxTagCount)),
)
</script>
<template>
  <div :class="selectValueClassName">
    <template v-if="select.multiple.value">
      <template
        v-for="option in visibleOptions"
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
        v-if="
          props.maxTagCount !== undefined && select.selectedOptions.value.length > props.maxTagCount
        "
        size="sm"
        >+{{ select.selectedOptions.value.length - props.maxTagCount }}</Tag
      >
    </template>
    <slot
      v-else-if="select.selectedOptions.value[0]"
      name="value"
      :option="select.selectedOptions.value[0]"
      >{{ select.selectedOptions.value[0]?.label }}</slot
    >
    <span v-else-if="!select.snapshot.value.searchValue" :class="selectPlaceholderClassName">{{
      props.placeholder
    }}</span>
  </div>
</template>
