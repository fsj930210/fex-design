<script setup lang="ts">import { Avatar } from '@fex-design/vue/ui/avatar'</script>
<template><Avatar fallback="FX" :class-names="{ root: 'ring-2 ring-primary', fallback: 'bg-primary text-primary-foreground' }" :styles="{ root: { boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary) 20%, transparent)' } }" /></template>
