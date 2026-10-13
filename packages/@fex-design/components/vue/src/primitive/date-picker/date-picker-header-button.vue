<script setup lang="ts">
import type { DatePickerHeaderAction } from '@fex-design/core/date-picker/types'
import {
  datePickerHeaderDoubleIconClassName,
  datePickerHeaderNavigationClassName,
} from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@fex-design/vue/icons/chevron'
import Button from '../button/button.vue'
import { useCalendarContext } from '../calendar/context'

const props = defineProps<{ action: DatePickerHeaderAction; class?: string }>()
const calendar = useCalendarContext('DatePickerHeaderButton')
const isPrevious = computed(() => props.action.startsWith('previous'))
const isDouble = computed(() => props.action.includes('year') || props.action.includes('panel'))

function runAction(event: Event) {
  if (event.defaultPrevented) return
  calendar.controller.navigate(props.action)
}
</script>

<template>
  <Button
    data-slot="date-picker-header-button"
    :data-action="props.action"
    :class="cn(datePickerHeaderNavigationClassName, props.class)"
    @click="runAction"
  >
    <slot>
      <span class="flex items-center">
        <template v-if="isDouble">
          <ChevronLeftIcon v-if="isPrevious" class="size-4" />
          <ChevronLeftIcon
            v-if="isPrevious"
            :class="cn(datePickerHeaderDoubleIconClassName, 'size-4')"
          />
          <ChevronRightIcon v-if="!isPrevious" class="size-4" />
          <ChevronRightIcon
            v-if="!isPrevious"
            :class="cn(datePickerHeaderDoubleIconClassName, 'size-4')"
          />
        </template>
        <template v-else>
          <ChevronLeftIcon v-if="isPrevious" class="size-4" />
          <ChevronRightIcon v-else class="size-4" />
        </template>
      </span>
    </slot>
  </Button>
</template>
