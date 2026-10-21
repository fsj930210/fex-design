<script setup lang="ts">
import { inject } from 'vue'
import { menuRootClassName, menuContentClassName } from '@fex-design/components-styles/menu'
import { menuLevelKey, useMenuContext } from './context'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { useMenuHost } from './use-menu-host'
defineOptions({ name: 'MenuContent' })
const dom = useMenuContext(),
  parent = inject(menuLevelKey, undefined)
const snapshot = useCoreStore(dom.controller)
const host = useMenuHost((element) => dom.bindContent(element, parent))
</script>
<template>
  <div
    :ref="host"
    :role="snapshot.layout === 'horizontal' ? 'menubar' : 'menu'"
    :dir="snapshot.dir"
    data-slot="menu-content"
    :class="[
      menuRootClassName({ size: snapshot.size }),
      menuContentClassName({ layout: snapshot.layout }),
    ]"
  >
    <slot />
  </div>
</template>
