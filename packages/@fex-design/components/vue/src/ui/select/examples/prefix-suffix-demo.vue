<script setup lang="ts">import { Select } from '@fex-design/vue/ui/select'; const options=[{value:'react',label:'React'},{value:'vue',label:'Vue'}]</script>
<template><Select class="w-72" :options="options" placeholder="请选择"><template #prefix>框架</template><template #suffix>⌘K</template></Select></template>
