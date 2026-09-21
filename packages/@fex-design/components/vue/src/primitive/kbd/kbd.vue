<script setup lang="ts">
import { kbdClassName } from '@fex-design/components-styles/kbd'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'

defineOptions({ name: 'Kbd', inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <kbd v-bind="attrs" data-slot="kbd" :class="cn(kbdClassName, attrs.class as string | undefined)"
    ><slot
  /></kbd>
</template>
