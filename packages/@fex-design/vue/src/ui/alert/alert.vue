<script setup lang="ts">
import type { AlertClassNames, AlertOptions, AlertStyles } from '@fex-design/core/alert/types'
import {
  alertActionClassName,
  alertCloseClassName,
  alertContentClassName,
  alertDescriptionClassName,
  alertIconClassName,
  alertTitleClassName,
} from '@fex-design/styles/alert'
import { cn } from '@fex/utils'
import { computed, ref, type StyleValue, useAttrs } from 'vue'
import { CircleCheckIcon } from '../../icon/circle-check'
import { XIcon } from '../../icon/x'
import { CircleXIcon } from '../../icon/circle-x'
import { InfoIcon } from '../../icon/info'
import { TriangleAlertIcon } from '../../icon/triangle-alert'
import PrimitiveAlert from '../../primitive/alert/alert-root.vue'

defineOptions({ name: 'Alert', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    AlertOptions & {
      title?: string
      description?: string
      showIcon?: boolean
      closable?: boolean
      classNames?: AlertClassNames
      styles?: AlertStyles<StyleValue>
    }
  >(),
  { type: 'info', variant: 'filled', showIcon: false, closable: false },
)
const emit = defineEmits<{ close: [event: MouseEvent] }>()
const attrs = useAttrs()
const visible = ref(true)
const builtinIcon = computed(
  () =>
    ({ success: CircleCheckIcon, info: InfoIcon, warning: TriangleAlertIcon, error: CircleXIcon })[
      props.type
    ],
)
function close(event: MouseEvent) {
  emit('close', event)
  if (!event.defaultPrevented) visible.value = false
}
</script>

<template>
  <PrimitiveAlert
    v-if="visible"
    v-bind="attrs"
    :type="type"
    :variant="variant"
    :class="[attrs.class, classNames?.root]"
    :style="[attrs.style, styles?.root]"
  >
    <span
      v-if="showIcon"
      aria-hidden="true"
      data-slot="alert-icon"
      :class="cn(alertIconClassName, classNames?.icon)"
      :style="styles?.icon"
    >
      <slot name="icon"><component :is="builtinIcon" /></slot>
    </span>
    <div
      data-slot="alert-content"
      :class="cn(alertContentClassName, classNames?.content)"
      :style="styles?.content"
    >
      <div
        v-if="title || $slots.title"
        data-slot="alert-title"
        :class="cn(alertTitleClassName, classNames?.title)"
        :style="styles?.title"
      >
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="description || $slots.default"
        data-slot="alert-description"
        :class="cn(alertDescriptionClassName, classNames?.description)"
        :style="styles?.description"
      >
        <slot>{{ description }}</slot>
      </div>
    </div>
    <div
      v-if="$slots.action"
      data-slot="alert-action"
      :class="cn(alertActionClassName, classNames?.action)"
      :style="styles?.action"
    >
      <slot name="action" />
    </div>
    <button
      v-if="closable"
      type="button"
      aria-label="Close alert"
      data-slot="alert-close"
      :class="cn(alertCloseClassName, classNames?.close)"
      :style="styles?.close"
      @click="close"
    >
      <slot name="closeIcon"><XIcon /></slot>
    </button>
  </PrimitiveAlert>
</template>
