<script setup lang="ts">
defineOptions({ name: 'SelectGroup' })
defineProps<{ label?: string }>()
</script>
<template><div role="group" :aria-label="label"><slot /></div></template>
