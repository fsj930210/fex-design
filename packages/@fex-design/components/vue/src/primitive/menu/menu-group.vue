<script setup lang="ts">
import { menuGroupClassName } from '@fex-design/components-styles/menu'
defineOptions({ name: 'MenuGroup' })
</script>
<template>
  <div role="group" data-slot="menu-group" :class="menuGroupClassName"><slot /></div>
</template>
