<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/vue/primitive/dropdown'
import { MenuItems, type MenuItemData } from '@fex-design/vue/ui/menu'
import { Button } from '@fex-design/vue/primitive/button'
import type { DropdownRootOptions } from '@fex-design/vue/primitive/dropdown'

defineOptions({ name: 'Dropdown' })
const props = defineProps({
  items: { type: Array as () => readonly MenuItemData[], required: true },
  open: { type: Boolean, default: undefined },
  defaultOpen: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: undefined },
  closeOnSelect: { type: Boolean, default: undefined },
  popoverProps: Object as () => DropdownRootOptions['popoverProps'],
  menuProps: Object as () => DropdownRootOptions['menuProps'],
})
const rootProps = computed(() => {
  const { items, ...rest } = props
  return rest
})
const portalContainer = computed(() => props.popoverProps?.getPopupContainer?.(null) ?? undefined)
const emit = defineEmits<{
  'update:open': [open: boolean]
  openChange: [open: boolean, info: unknown]
  activate: [info: unknown]
}>()
</script>
<template>
  <DropdownRoot
    v-bind="rootProps"
    @update:open="(open) => emit('update:open', open)"
    @open-change="(open, info) => emit('openChange', open, info)"
    @activate="(info) => emit('activate', info)"
  >
    <DropdownTrigger v-slot="trigger">
      <Button v-bind="trigger.props" :ref="trigger.ref"><slot /></Button>
    </DropdownTrigger>
    <DropdownPortal :container="portalContainer"
      ><DropdownContent
        ><MenuItems :items="items"
          ><template v-if="$slots.item" #item="binding"
            ><slot name="item" v-bind="binding" /></template></MenuItems></DropdownContent
    ></DropdownPortal>
  </DropdownRoot>
</template>
