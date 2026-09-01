<script setup lang="ts">
import PrimitiveBadge from '../../primitive/badge/badge.vue'
import PrimitiveBadgeDot from '../../primitive/badge/badge-dot.vue'
import {
  getBadgeOffsetTransform,
  type BadgeAttachmentOptions,
  type BadgeClassNames,
  type BadgeOptions,
  type BadgeStyles,
} from '@fex-design/core'
import { badgeRootClassName } from '@fex-design/styles/badge'
import { computed, type StyleValue } from 'vue'
defineOptions({ name: 'Badge', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    BadgeOptions &
      BadgeAttachmentOptions & {
        dot?: boolean
        size?: 'sm' | 'md' | 'lg'
        class?: string
        classNames?: BadgeClassNames
        styles?: BadgeStyles<StyleValue>
      }
  >(),
  { dot: false, showZero: false },
)
const indicatorStyle = computed(() => ({
  translate: props.offset ? 'none' : undefined,
  transform: getBadgeOffsetTransform(props.offset),
}))
const indicatorProps = computed(() => ({
  ...(props.color !== undefined ? { color: props.color } : {}),
  ...(props.size !== undefined ? { size: props.size } : {}),
  ...(props.count !== undefined ? { count: props.count } : {}),
  ...(props.showZero ? { showZero: true } : {}),
  ...(props.overflowCount !== undefined ? { overflowCount: props.overflowCount } : {}),
  style: indicatorStyle.value,
}))
const dotProps = computed(() => ({
  ...(props.color !== undefined ? { color: props.color } : {}),
  ...(props.size !== undefined ? { size: props.size } : {}),
  style: indicatorStyle.value,
}))
</script>
<template>
  <PrimitiveBadge
    v-if="!props.dot && props.count === undefined"
    v-bind="{ ...$attrs, ...indicatorProps }"
    :class="[props.class, props.classNames?.root]"
    :style="props.styles?.root"
    ><slot
  /></PrimitiveBadge>
  <span
    v-else-if="$slots.default"
    v-bind="$attrs"
    data-slot="badge-root"
    :class="[badgeRootClassName, props.class, props.classNames?.root]"
    :style="props.styles?.root"
  >
    <span
      data-slot="badge-content"
      :class="props.classNames?.content"
      :style="props.styles?.content"
      ><slot
    /></span>
    <PrimitiveBadgeDot
      v-if="props.dot"
      v-bind="dotProps"
      :class="props.classNames?.indicator"
      :style="[indicatorStyle, props.styles?.indicator]"
    />
    <PrimitiveBadge
      v-else
      v-bind="indicatorProps"
      :class="props.classNames?.indicator"
      :style="[indicatorStyle, props.styles?.indicator]"
    />
  </span>
  <PrimitiveBadgeDot
    v-else-if="props.dot"
    v-bind="{ ...$attrs, ...dotProps }"
    :class="[props.class, props.classNames?.indicator]"
    :style="[$attrs.style, indicatorStyle, props.styles?.indicator]"
  />
  <PrimitiveBadge
    v-else
    v-bind="{ ...$attrs, ...indicatorProps }"
    :class="[props.class, props.classNames?.indicator]"
    :style="[indicatorStyle, props.styles?.indicator]"
  />
</template>
