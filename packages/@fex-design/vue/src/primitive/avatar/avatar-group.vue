<script setup lang="ts">
import { avatarGroupClassName } from '@fex-design/styles/avatar'
import { cn } from '@fex/utils'
import { useAttrs } from 'vue'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
</script>
<template>
  <div
    v-bind="attrs"
    role="group"
    data-slot="avatar-group"
    :class="cn(avatarGroupClassName, attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
