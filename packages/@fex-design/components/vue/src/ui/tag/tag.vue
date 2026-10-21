<script setup lang="ts">
import type { TagClassNames, TagOptions, TagStyles } from '@fex-design/core/tag/types'
import { computed, type ButtonHTMLAttributes, type StyleValue, useAttrs } from 'vue'
import PrimitiveTag from '@fex-design/vue/primitive/tag/tag.vue'
import TagAction from '@fex-design/vue/primitive/tag/tag-action.vue'

defineOptions({ name: 'Tag', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    TagOptions & {
      actionProps?:
        | Omit<ButtonHTMLAttributes, 'innerHTML' | 'textContent' | 'disabled' | 'onClick'>
        | undefined
      closable?: boolean
      classNames?: TagClassNames
      styles?: TagStyles<StyleValue>
    }
  >(),
  { variant: 'filled', size: 'md', disabled: false, closable: false },
)
const emit = defineEmits<{ close: [event: MouseEvent] }>()
const attrs = useAttrs()
const rootStyle = computed(() => [attrs.style, props.styles?.root])
</script>

<template>
  <PrimitiveTag
    v-bind="attrs"
    :variant="variant"
    :color="color"
    :size="size"
    :disabled="disabled"
    :class="[attrs.class, classNames?.root]"
    :style="rootStyle"
  >
    <slot />
    <TagAction
      v-bind="{ ...props.actionProps, onClick: undefined }"
      v-if="closable && $slots.closeIcon"
      :aria-label="props.actionProps?.['aria-label'] ?? 'Close'"
      :disabled="disabled"
      :class="[classNames?.close, props.actionProps?.class]"
      :style="[styles?.close, props.actionProps?.style]"
      @click="emit('close', $event)"
    >
      <slot name="closeIcon" />
    </TagAction>
    <TagAction
      v-bind="{ ...props.actionProps, onClick: undefined }"
      v-else-if="closable"
      :aria-label="props.actionProps?.['aria-label'] ?? 'Close'"
      :disabled="disabled"
      :class="[classNames?.close, props.actionProps?.class]"
      :style="[styles?.close, props.actionProps?.style]"
      @click="emit('close', $event)"
    />
  </PrimitiveTag>
</template>
