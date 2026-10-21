<script setup lang="ts">
import { menuSeparatorClassName } from '@fex-design/components-styles/menu'
defineOptions({ name: 'MenuSeparator' })
</script>
<template>
  <div role="separator" data-slot="menu-separator" :class="menuSeparatorClassName"><slot /></div>
</template>
