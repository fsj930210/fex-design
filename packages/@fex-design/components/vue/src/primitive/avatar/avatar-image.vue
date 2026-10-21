<script setup lang="ts">
import { avatarImageClassName } from '@fex-design/components-styles/avatar'
import { cn } from '@fex-design/utils'
import { inject, ref, useAttrs, watch } from 'vue'
import { avatarContext } from './context'
defineOptions({ name: 'AvatarImage', inheritAttrs: false })
const props = defineProps<{
  src?: string
  crossorigin?: '' | 'anonymous' | 'use-credentials'
  referrerpolicy?: ReferrerPolicy
}>()
const attrs = useAttrs()
const context = inject(avatarContext)
const status = context?.status ?? ref('idle')
// Preloading is an external browser operation; track every image request option.
watch(
  () => [props.src, props.crossorigin, props.referrerpolicy] as const,
  ([src, crossOrigin, referrerPolicy]) =>
    src
      ? context?.controller.load({
          src,
          ...(crossOrigin === undefined ? {} : { crossOrigin }),
          ...(referrerPolicy === undefined ? {} : { referrerPolicy }),
        })
      : context?.controller.reset(),
  { immediate: true },
)
</script>
<template>
  <img
    v-bind="attrs"
    :src="src"
    :crossorigin="crossorigin"
    :referrerpolicy="referrerpolicy"
    v-if="status === 'loaded'"
    data-slot="avatar-image"
    :class="cn(avatarImageClassName, attrs.class as string | undefined)"
  />
</template>
