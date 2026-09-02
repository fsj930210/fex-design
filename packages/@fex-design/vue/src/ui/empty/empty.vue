<script setup lang="ts">
import type { EmptyClassNames, EmptyStyles as EmptyStylesBase } from '@fex-design/core/empty/types'
import type { StyleValue } from 'vue'
import {
  Empty as PrimitiveEmpty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../../primitive/empty/empty'
import DefaultEmptyImage from './default-empty-image.vue'

export type EmptyStyles = EmptyStylesBase<StyleValue>
export interface EmptyProps {
  image?: string | null
  title?: string
  description?: string
  classNames?: EmptyClassNames
  styles?: EmptyStyles
}

defineOptions({ name: 'Empty', inheritAttrs: false })
const props = defineProps<EmptyProps>()
</script>

<template>
  <PrimitiveEmpty
    v-bind="$attrs"
    :class="[$attrs.class, props.classNames?.root]"
    :style="[$attrs.style, props.styles?.root]"
  >
    <EmptyHeader
      v-if="props.image !== null || props.title || props.description || $slots.image || $slots.title || $slots.description"
      :class="props.classNames?.header"
      :style="props.styles?.header"
    >
      <EmptyMedia
        v-if="props.image !== null || $slots.image"
        :class="props.classNames?.image"
        :style="props.styles?.image"
      >
        <slot name="image">
          <img v-if="typeof props.image === 'string'" :src="props.image" alt="" />
          <DefaultEmptyImage v-else />
        </slot>
      </EmptyMedia>
      <EmptyTitle
        v-if="props.title || $slots.title"
        :class="props.classNames?.title"
        :style="props.styles?.title"
      >
        <slot name="title">{{ props.title }}</slot>
      </EmptyTitle>
      <EmptyDescription
        v-if="props.description || $slots.description"
        :class="props.classNames?.description"
        :style="props.styles?.description"
      >
        <slot name="description">{{ props.description }}</slot>
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent v-if="$slots.default" :class="props.classNames?.content" :style="props.styles?.content">
      <slot />
    </EmptyContent>
  </PrimitiveEmpty>
</template>
