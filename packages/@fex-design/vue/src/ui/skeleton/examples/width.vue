<script setup lang="ts">import { Skeleton } from '@fex-design/vue/ui/skeleton'</script>
<template><div class="grid w-full max-w-xl gap-8"><Skeleton avatar :title="{ width: '35%' }" :paragraph="{ rows: 4, width: ['100%', '90%', '75%', '55%'] }" /><Skeleton :title="{ width: 180 }" :paragraph="{ rows: 4, width: '60%' }" /></div></template>
