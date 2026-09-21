<script setup lang="ts">
import { masonryViewportClassName } from '@fex-design/components-styles/masonry'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { useMasonryContext } from './context'
defineOptions({ inheritAttrs: false })
const attrs = useAttrs(),
  { controller } = useMasonryContext('MasonryViewport'),
  snapshot = useCoreStore(controller)
const rest = computed(() => {
  const { class: _class, style: _style, ...value } = attrs
  return value
})
</script>
<template>
  <div
    v-bind="rest"
    data-slot="masonry-viewport"
    :class="cn(masonryViewportClassName, attrs.class as string | undefined)"
    :style="[attrs.style, { height: `${snapshot.height}px` }]"
  >
    <slot />
  </div>
</template>
