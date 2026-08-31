<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type {
  CardClassNames as CardClassNamesBase,
  CardStyles as CardStylesBase,
} from '@fex-design/core/card/types'
import {
  Card as PrimitiveCard,
  CardContent,
  CardDescription,
  CardExtra,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../primitive/card/card'

export type CardClassNames = CardClassNamesBase
export type CardStyles = CardStylesBase<CSSProperties>
export interface CardProps {
  classNames?: CardClassNames
  styles?: CardStyles
}

defineOptions({ inheritAttrs: false })
const props = defineProps<CardProps>()
</script>

<template>
  <PrimitiveCard
    v-bind="$attrs"
    :class="[$attrs.class, props.classNames?.root]"
    :style="[$attrs.style, props.styles?.root]"
  >
    <slot name="header">
      <CardHeader
        v-if="$slots.title || $slots.description || $slots.extra"
        :class="props.classNames?.header"
        :style="props.styles?.header"
      >
        <CardTitle
          v-if="$slots.title"
          :class="props.classNames?.title"
          :style="props.styles?.title"
        >
          <slot name="title" />
        </CardTitle>
        <CardDescription
          v-if="$slots.description"
          :class="props.classNames?.description"
          :style="props.styles?.description"
        >
          <slot name="description" />
        </CardDescription>
        <CardExtra
          v-if="$slots.extra"
          :class="props.classNames?.extra"
          :style="props.styles?.extra"
        >
          <slot name="extra" />
        </CardExtra>
      </CardHeader>
    </slot>
    <CardContent :class="props.classNames?.content" :style="props.styles?.content">
      <slot />
    </CardContent>
    <CardFooter
      v-if="$slots.footer"
      :class="props.classNames?.footer"
      :style="props.styles?.footer"
    >
      <slot name="footer" />
    </CardFooter>
  </PrimitiveCard>
</template>
