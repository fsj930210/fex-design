<script setup lang="ts">
import { avatarFallbackClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import { inject, useAttrs } from 'vue'
import { avatarContext } from './context'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const context = inject(avatarContext)
</script>
<template>
  <span
    v-if="context?.status.value !== 'loaded'"
    v-bind="attrs"
    data-slot="avatar-fallback"
    :class="cn(avatarFallbackClassName, attrs.class as string | undefined)"
    ><slot
  /></span>
</template>
