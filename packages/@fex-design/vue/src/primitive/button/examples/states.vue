<script setup lang="ts">
import { Button } from '@fex-design/vue/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Button :class="buttonClassName()">Default</Button>
    <Button :class="buttonClassName()">Hover / Focus</Button>
    <Button :class="buttonClassName()" disabled>Disabled</Button>
    <Button :class="buttonClassName()" aria-pressed="true">Pressed</Button>
  </div>
</template>
