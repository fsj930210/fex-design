<script setup lang="ts">
import { menuGroupLabelClassName } from '@fex-design/components-styles/menu'
defineOptions({ name: 'MenuGroupLabel' })
</script>
<template>
  <div data-slot="menu-group-label" :class="menuGroupLabelClassName"><slot /></div>
</template>
