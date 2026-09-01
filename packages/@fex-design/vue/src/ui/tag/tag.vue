<script setup lang="ts">
import type {
  TagClassNames,
  TagOptions,
  TagStyles,
} from '@fex-design/core/tag/types'
import { computed, type StyleValue, useAttrs } from 'vue'
import PrimitiveTag from '../../primitive/tag/tag.vue'
import TagClose from '../../primitive/tag/tag-close.vue'

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
    <TagClose
      v-if="closable && $slots.closeIcon"
      :disabled="disabled"
      :class="classNames?.close"
      :style="styles?.close"
      @click="emit('close', $event)"
    >
      <slot name="closeIcon" />
    </TagClose>
    <TagClose
      v-else-if="closable"
      :disabled="disabled"
      :class="classNames?.close"
      :style="styles?.close"
      @click="emit('close', $event)"
    />
  </PrimitiveTag>
</template>
