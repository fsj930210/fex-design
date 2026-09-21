<script setup lang="ts">
import { anchorListClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { inject, useAttrs } from 'vue'
import { anchorContextKey } from './anchor-context'
defineOptions({ name: 'AnchorList', inheritAttrs: false })
const attrs = useAttrs()
const anchor = inject(anchorContextKey)
if (!anchor) throw new Error('AnchorList must be used inside AnchorRoot')
</script>
<template>
  <ul
    v-bind="attrs"
    data-slot="anchor-list"
    :class="
      cn(
        anchorListClassName({ orientation: anchor.orientation.value }),
        attrs.class as string | undefined,
      )
    "
  >
    <slot />
  </ul>
</template>
