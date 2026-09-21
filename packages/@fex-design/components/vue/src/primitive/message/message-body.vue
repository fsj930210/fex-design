<script setup lang="ts">
import { messageBodyClassName } from '@fex-design/components-styles/message'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="message-body"
    :class="cn(messageBodyClassName, attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
