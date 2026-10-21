<script setup lang="ts">
import { computed, inject, provide, useAttrs, type StyleValue } from 'vue'
import { cn } from '@fex-design/utils'
import { getMenuBranchStore } from '@fex-design/core/menu/branch'
import { menuRootClassName, subMenuContentClassName } from '@fex-design/components-styles/menu'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { menuLevelKey, subMenuKey, useMenuContext } from './context'
import { useMenuHost } from './use-menu-host'
import type { MenuPopoverProps } from './popover-types'
import { subMenuBodyClassName } from '@fex-design/components-styles/menu'
defineOptions({ name: 'SubMenuContent', inheritAttrs: false })
const props = defineProps<{ container?: HTMLElement | null | undefined }>()
const attrs = useAttrs()
function nativeAttrs() {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
}
const dom = useMenuContext(),
  branch = inject(subMenuKey)
if (!branch) throw new Error('SubMenuContent requires SubMenu')
provide(menuLevelKey, branch)
const snapshot = useCoreStore(dom.controller),
  presence = useCoreStore(getMenuBranchStore(branch))
const popup = computed(() =>
  snapshot.value.layout === 'inline'
    ? undefined
    : (branch.popoverProps?.() as MenuPopoverProps | undefined),
)
const host = useMenuHost((element) =>
  dom.bindContent(element, branch, () => ({ container: props.container, managedPortal: true })),
)
</script>
<template>
  <Teleport
    :to="container ?? presence.container ?? 'body'"
    :disabled="snapshot.layout === 'inline'"
  >
    <div
      v-bind="nativeAttrs()"
      :ref="host"
      role="menu"
      data-slot="submenu-content"
      :dir="snapshot.dir"
      :hidden="presence.phase === 'closed'"
      :inert="!presence.open"
      :class="
        cn(
          snapshot.layout !== 'inline' && menuRootClassName({ size: snapshot.size }),
          subMenuContentClassName({ inline: snapshot.layout === 'inline' }),
          popup?.classNames?.root,
          attrs.class as string | undefined,
        )
      "
      :style="[popup?.styles?.root, attrs.style as StyleValue]"
    >
      <div
        v-if="presence.mounted"
        data-slot="popover-body"
        :class="[subMenuBodyClassName, popup?.classNames?.content]"
        :style="popup?.styles?.content"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
