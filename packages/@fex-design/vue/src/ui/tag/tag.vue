<script setup lang="ts">
import type {
  TagClassNames,
  TagOptions,
  TagStyles,
} from '@fex-design/core/tag/types'
import { computed, type StyleValue, useAttrs } from 'vue'
import PrimitiveTag from '../../primitive/tag/tag.vue'
import TagAction from '../../primitive/tag/tag-action.vue'

defineOptions({ name: 'Tag', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    TagOptions & {
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
      v-if="closable && $slots.closeIcon"
      aria-label="Close"
      :disabled="disabled"
      :class="classNames?.close"
      :style="styles?.close"
      @click="emit('close', $event)"
    >
      <slot name="closeIcon" />
    </TagAction>
    <TagAction
      v-else-if="closable"
      aria-label="Close"
      :disabled="disabled"
      :class="classNames?.close"
      :style="styles?.close"
      @click="emit('close', $event)"
    />
  </PrimitiveTag>
</template>
