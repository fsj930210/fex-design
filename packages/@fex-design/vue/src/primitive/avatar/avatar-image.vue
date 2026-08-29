<script setup lang="ts">
import { avatarImageClassName } from '@fex-design/styles/avatar'
import { cn } from '@fex/utils'
import { inject, ref, useAttrs, watch } from 'vue'
import { avatarContext } from './context'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const context = inject(avatarContext)
const status = context?.status ?? ref('idle')
watch(() => String(attrs.src ?? ''), (src) => src ? context?.controller.load({ src }) : context?.controller.reset(), { immediate: true })
</script>
<template>
  <img
    v-bind="attrs"
    v-if="status === 'loaded'"
    data-slot="avatar-image"
    :class="cn(avatarImageClassName, attrs.class as string | undefined)"
  />
</template>
