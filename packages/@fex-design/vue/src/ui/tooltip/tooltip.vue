<script setup lang="ts">
import { computed, useAttrs, type CSSProperties } from 'vue'
import type {
  TooltipClassNames,
  TooltipOptions,
  TooltipSemanticPart,
} from '@fex-design/core/tooltip/create-tooltip'
import { cn } from '@fex/utils'
import { splitTooltipOptions } from '@fex-design/core/tooltip/options'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '../../primitive/tooltip/tooltip'
import { TriggerSlot } from '../popover/trigger-slot'

defineOptions({ name: 'Tooltip', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    Omit<TooltipOptions, 'onOpenChange'> & {
      title?: string
      color?: string
      arrow?: boolean
      classNames?: TooltipClassNames
      styles?: Partial<Record<TooltipSemanticPart, CSSProperties>>
    }
  >(),
  { open: undefined, defaultOpen: undefined, disabled: undefined, arrow: true },
)
const attrs = useAttrs()
const options = computed(() => splitTooltipOptions(props)[0])
const emit = defineEmits<{
  'update:open': [open: boolean]
  openChange: [open: boolean, info: Parameters<NonNullable<TooltipOptions['onOpenChange']>>[1]]
}>()
const rootStyle = computed(() => [attrs.style as CSSProperties | undefined, props.styles?.root])
</script>

<template>
  <TooltipRoot
    v-bind="options"
    @open-change="
      (open, info) => {
        emit('update:open', open)
        emit('openChange', open, info)
      }
    "
  >
    <TooltipTrigger v-slot="trigger">
      <TriggerSlot v-bind="trigger.props" :ref="trigger.ref"><slot /></TriggerSlot>
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent
        v-bind="attrs"
        :color="color"
        :class="cn(attrs.class as string | undefined, classNames?.root)"
        :style="rootStyle"
      >
        <slot name="title">{{ title }}</slot>
        <TooltipArrow v-if="arrow" :class="classNames?.arrow" :style="styles?.arrow" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
