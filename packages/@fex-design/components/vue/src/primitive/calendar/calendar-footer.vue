<script setup lang="ts">
import { cn } from '@fex-design/utils'
import { normalizeClass, useAttrs, useTemplateRef  } from 'vue'
import { calendarFooterClassName } from '@fex-design/components-styles/calendar'


const attrs = useAttrs()
defineOptions({ name: 'CalendarFooter', inheritAttrs: false })


const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template><div v-bind="attrs" ref="element" data-slot="calendar-footer" :class="cn(calendarFooterClassName, normalizeClass(attrs.class))" ><slot  /></div></template>
