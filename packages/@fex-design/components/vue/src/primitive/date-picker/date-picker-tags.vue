<script setup lang="ts">
import { usePickerAppearance } from './appearance-context'
const appearance = usePickerAppearance()
import { computed, normalizeClass, useAttrs } from 'vue'
import { getDatePickerTagItems } from '@fex-design/core/date-picker/input'
import { formatDatePickerValue } from '@fex-design/core/date-picker/value'
import { datePickerMultipleTagsClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { Tag, TagAction } from '../tag'
import { useDatePickerContext } from './context'
defineOptions({ name: 'DatePickerTags', inheritAttrs: false })
const props = defineProps<{ maxCount?: number }>()
const attrs = useAttrs()
const context = useDatePickerContext('DatePickerTags')
const tags = computed(() =>
  getDatePickerTagItems(context.calendarValues.value, props.maxCount ?? context.maxCount),
)
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="date-picker-tags"
    :class="
      cn(
        datePickerMultipleTagsClassName,
        appearance().classNames?.tags,
        normalizeClass(attrs.class),
      )
    "
    :style="[appearance().styles?.tags, attrs.style]"
  >
    <Tag
      v-for="item in tags.items"
      :key="item.key"
      size="sm"
      data-slot="date-picker-tag"
      :class="appearance().classNames?.tag"
      :style="appearance().styles?.tag"
    >
      {{ formatDatePickerValue(item.value, context) }}
      <TagAction
        :class="appearance().classNames?.tagRemove"
        :style="appearance().styles?.tagRemove"
        aria-label="移除日期"
        :disabled="context.disabled"
        @pointerdown.stop.prevent
        @click.stop="
          (event) => {
            if (!event.defaultPrevented) context.remove(item.value)
          }
        "
      />
    </Tag>
    <Tag
      v-if="tags.overflowCount > 0"
      size="sm"
      data-slot="date-picker-tag-overflow"
      :class="appearance().classNames?.tagOverflow"
      :style="appearance().styles?.tagOverflow"
      >+{{ tags.overflowCount }}</Tag
    >
  </div>
</template>
