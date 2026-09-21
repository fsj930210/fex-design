<script setup lang="ts">
import { avatarBadgeClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <span
    v-bind="attrs"
    data-slot="avatar-badge"
    :class="cn(avatarBadgeClassName, attrs.class as string | undefined)"
    ><slot
  /></span>
</template>
