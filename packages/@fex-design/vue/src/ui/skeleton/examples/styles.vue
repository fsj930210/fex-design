<script setup lang="ts">import { Skeleton } from '@fex-design/vue/ui/skeleton'</script>
<template><Skeleton :avatar="{ size: 'lg' }" :title="{ width: '45%' }" :paragraph="{ rows: 3, width: '70%' }" :class-names="{ root: 'rounded-xl border border-dashed border-primary p-5', avatar: 'bg-blue-300', title: 'bg-blue-400', paragraph: 'bg-blue-200' }" :styles="{ avatar: { width: '56px', height: '56px' }, title: { height: '20px' } }" /></template>

