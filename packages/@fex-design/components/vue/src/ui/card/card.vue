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
} from '@fex-design/vue/primitive/card'

export type CardClassNames = CardClassNamesBase
export type CardStyles = CardStylesBase<CSSProperties>
export interface CardProps {
  headerProps?: Omit<InstanceType<typeof CardHeader>['$props'], 'children'> | undefined
  titleProps?: Omit<InstanceType<typeof CardTitle>['$props'], 'children'> | undefined
  descriptionProps?: Omit<InstanceType<typeof CardDescription>['$props'], 'children'> | undefined
  extraProps?: Omit<InstanceType<typeof CardExtra>['$props'], 'children'> | undefined
  contentProps?: Omit<InstanceType<typeof CardContent>['$props'], 'children'> | undefined
  footerProps?: Omit<InstanceType<typeof CardFooter>['$props'], 'children'> | undefined
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
        v-bind="props.headerProps"
        v-if="$slots.title || $slots.description || $slots.extra"
        :class="[props.classNames?.header, props.headerProps?.class]"
        :style="[props.styles?.header, props.headerProps?.style]"
      >
        <CardTitle
          v-bind="props.titleProps"
          v-if="$slots.title"
          :class="[props.classNames?.title, props.titleProps?.class]"
          :style="[props.styles?.title, props.titleProps?.style]"
        >
          <slot name="title" />
        </CardTitle>
        <CardDescription
          v-bind="props.descriptionProps"
          v-if="$slots.description"
          :class="[props.classNames?.description, props.descriptionProps?.class]"
          :style="[props.styles?.description, props.descriptionProps?.style]"
        >
          <slot name="description" />
        </CardDescription>
        <CardExtra
          v-bind="props.extraProps"
          v-if="$slots.extra"
          :class="[props.classNames?.extra, props.extraProps?.class]"
          :style="[props.styles?.extra, props.extraProps?.style]"
        >
          <slot name="extra" />
        </CardExtra>
      </CardHeader>
    </slot>
    <CardContent
      v-bind="props.contentProps"
      :class="[props.classNames?.content, props.contentProps?.class]"
      :style="[props.styles?.content, props.contentProps?.style]"
    >
      <slot />
    </CardContent>
    <CardFooter
      v-bind="props.footerProps"
      v-if="$slots.footer"
      :class="[props.classNames?.footer, props.footerProps?.class]"
      :style="[props.styles?.footer, props.footerProps?.style]"
    >
      <slot name="footer" />
    </CardFooter>
  </PrimitiveCard>
</template>
