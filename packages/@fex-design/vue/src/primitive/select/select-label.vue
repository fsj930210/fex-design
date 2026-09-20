<script setup lang="ts">
import { selectGroupLabelClassName } from '@fex-design/styles/select'
defineOptions({ name: 'SelectLabel' })
</script>
<template><div :class="selectGroupLabelClassName"><slot /></div></template>
