<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
</script>
<template><Button @click="open = true">打开 Dialog</Button><Dialog v-model:open="open" title="CSS Variables"><p>Dialog css-variables 场景。</p></Dialog></template>
