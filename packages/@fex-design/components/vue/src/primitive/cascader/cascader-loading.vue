<script setup lang="ts">
import { cascaderLoadingClassName } from '@fex-design/components-styles/cascader'
import { LoadingIcon } from '@fex-design/vue/icons/loading'
</script>
<template>
  <div :class="cascaderLoadingClassName">
    <LoadingIcon class="animate-spin" /><slot>Loading...</slot>
  </div>
</template>
