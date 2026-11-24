<script setup lang="ts">
import { computed, shallowRef, useAttrs, watch } from 'vue'
import { menuContentClassName, menuRootClassName } from '@fex-design/components-styles/menu'
import { popoverMenuContentClassName } from '@fex-design/components-styles/popover'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { PopoverContent } from '../popover'
import { useDropdownContext } from './context'

defineOptions({ name: 'DropdownContent', inheritAttrs: false })
const attrs = useAttrs()
const context = useDropdownContext()
const { controller } = context
const snapshot = useCoreStore(controller.menu)
const content = shallowRef<InstanceType<typeof PopoverContent> | null>(null)
const element = computed(() => content.value?.element ?? null)
defineExpose({ element })
// Register the committed floating host with Menu, and unregister when Vue replaces it.
watch(
  element,
  (host, _, onCleanup) => {
    if (host instanceof HTMLElement) onCleanup(controller.bindContent(host))
  },
  { flush: 'post' },
)
</script>
<template>
  <PopoverContent
    ref="content"
    v-bind="attrs"
    role="menu"
    :aria-labelledby="
      attrs['aria-labelledby'] ?? (attrs['aria-label'] ? undefined : context.triggerId)
    "
    :class="[
      popoverMenuContentClassName,
      menuRootClassName({ size: snapshot.size, color: 'none' }),
      menuContentClassName({ layout: 'vertical', background: 'none' }),
      attrs.class,
    ]"
  >
    <slot />
  </PopoverContent>
</template>
