<script setup lang="ts">
import { breadcrumbListClassName } from '@fex-design/components-styles/breadcrumb'
import { cn } from '@fex-design/utils'
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <ol
    v-bind="attrs"
    :class="cn(breadcrumbListClassName, attrs.class as string)"
    data-slot="breadcrumb-list"
  >
    <slot />
  </ol>
</template>
