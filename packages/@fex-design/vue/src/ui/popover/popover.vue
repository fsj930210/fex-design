<script setup lang="ts">
import { computed, useAttrs, type CSSProperties } from 'vue'
import type {
  PopoverChangeInfo,
  PopoverClassNames,
  PopoverOptions,
  PopoverSemanticPart,
} from '@fex-design/core/popover/types'
import { splitPopoverOptions } from '@fex-design/core/popover/options'
import { cn } from '@fex/utils'
import {
  Popover as PrimitivePopover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
} from '../../primitive/popover/popover'
import { TriggerSlot } from './trigger-slot'

defineOptions({ name: 'Popover', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    Omit<PopoverOptions, 'onOpenChange'> & {
      title?: string
      content?: string
      classNames?: PopoverClassNames
      styles?: Partial<Record<PopoverSemanticPart, CSSProperties>>
    }
  >(),
  {
    open: undefined,
    defaultOpen: undefined,
    arrow: undefined,
    disabled: undefined,
    avoidCollisions: undefined,
    hideWhenDetached: undefined,
    lazyMount: undefined,
    destroyOnHidden: undefined,
    matchReferenceWidth: undefined,
  },
)
const attrs = useAttrs()
const options = computed(() => splitPopoverOptions(props)[0])
const emit = defineEmits<{
  'update:open': [open: boolean]
  openChange: [open: boolean, info: PopoverChangeInfo]
}>()
function onOpenChange(open: boolean, info: PopoverChangeInfo) {
  emit('update:open', open)
  emit('openChange', open, info)
}
</script>

<template>
  <PrimitivePopover v-bind="options" @open-change="onOpenChange" v-slot="state">
    <PopoverTrigger v-slot="trigger">
      <TriggerSlot v-bind="trigger.props" :ref="trigger.ref"><slot /></TriggerSlot>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        v-bind="attrs"
        :class="cn(attrs.class as string | undefined, classNames?.root)"
        :style="[attrs.style as CSSProperties | undefined, styles?.root]"
      >
        <PopoverArrow :class="classNames?.arrow" :style="styles?.arrow" />
        <PopoverHeader v-if="title != null || $slots.title">
          <PopoverTitle :class="classNames?.title" :style="styles?.title">
            <slot name="title">{{ title }}</slot>
          </PopoverTitle>
        </PopoverHeader>
        <div data-slot="popover-body" :class="classNames?.content" :style="styles?.content">
          <slot name="content" v-bind="state">{{ content }}</slot>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PrimitivePopover>
</template>
