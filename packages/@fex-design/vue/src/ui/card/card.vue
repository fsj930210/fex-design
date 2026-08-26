<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type {
  CardClassNames as CardClassNamesBase,
  CardOptions,
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
  title?: unknown
  description?: unknown
  extra?: unknown
  footer?: unknown
  classNames?: CardClassNames
  styles?: CardStyles
}

// Vue SFC 的 Props 分析器无法解析 Omit<imported generic>；公共字段契约仍由 core 持有。
type CardContract = Omit<CardOptions<unknown, CSSProperties>, 'header'>

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
        v-if="title || description || extra || $slots.extra"
        :class="props.classNames?.header"
        :style="props.styles?.header"
      >
      <CardTitle v-if="title" :class="props.classNames?.title" :style="props.styles?.title">{{
        title
      }}</CardTitle>
      <CardDescription
        v-if="description"
        :class="props.classNames?.description"
        :style="props.styles?.description"
      >
        {{ description }}
      </CardDescription>
      <CardExtra v-if="extra || $slots.extra" :class="props.classNames?.extra" :style="props.styles?.extra">
        <slot name="extra">{{ extra }}</slot>
      </CardExtra>
      </CardHeader>
    </slot>
    <CardContent :class="props.classNames?.content" :style="props.styles?.content">
      <slot />
    </CardContent>
    <CardFooter
      v-if="$slots.footer || footer"
      :class="props.classNames?.footer"
      :style="props.styles?.footer"
    >
      <slot name="footer">{{ footer }}</slot>
    </CardFooter>
  </PrimitiveCard>
</template>
