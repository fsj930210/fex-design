<script setup lang="ts">
import { Skeleton } from '@fex-design/vue/ui/skeleton'
</script>
<template>
  <Skeleton
    animation="wave"
    :avatar="{ size: 'lg' }"
    :title="{ width: '45%' }"
    :paragraph="{ rows: 3, width: '70%' }"
    class="rounded-xl border border-dashed border-primary p-5 [--skeleton-gradient-from:#ede9fe] [--skeleton-gradient-to:#a78bfa] [--avatar-size-lg:56px] [--primary:#7c3aed]"
  />
</template>
