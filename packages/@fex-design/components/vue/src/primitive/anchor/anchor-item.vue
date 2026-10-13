<script setup lang="ts">
import type { AnchorRegisteredItem, AnchorTarget } from '@fex-design/core/anchor/types'
import { resolveAnchorTarget } from '@fex-design/core/anchor/dom'
import { anchorItemClassName } from '@fex-design/components-styles/anchor'
import { cn } from '@fex-design/utils'
import { inject, isRef, onMounted, provide, useAttrs, watchEffect, type Ref } from 'vue'
import { anchorContextKey, anchorItemContextKey } from './anchor-context'
defineOptions({ name: 'AnchorItem', inheritAttrs: false })
const props = defineProps<{
  value: string
  target: AnchorTarget | Ref<HTMLElement | null>
  targetOffset?: number
}>()
const attrs = useAttrs()
const anchor = inject(anchorContextKey)
const parent = inject(anchorItemContextKey, null)
if (!anchor) throw new Error('AnchorItem must be used inside AnchorRoot')
const item: AnchorRegisteredItem = {
  get key() { return props.value },
  target: () => (isRef(props.target) ? props.target.value : resolveAnchorTarget(props.target)),
  get targetOffset() { return props.targetOffset },
  get parentKey() { return parent?.key },
}
provide(anchorItemContextKey, item)
onMounted(() => {
  // Synchronize the external item registry after mounting and clean up replaced entries.
  watchEffect((cleanup) => {
    void props.target
    cleanup(anchor.registerItem({ ...item }))
  })
})
</script>
<template>
  <li
    v-bind="attrs"
    data-slot="anchor-item"
    :data-active="anchor.activeKeys.value.includes(value) || undefined"
    :data-highlighted="anchor.highlightedKeys.value.has(value) || undefined"
    :class="cn(anchorItemClassName, attrs.class as string | undefined)"
  >
    <slot />
  </li>
</template>
