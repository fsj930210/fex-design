<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/ui/button'
const open = ref(false)
</script>
<template><Button @click="open = true">打开 Dialog</Button><Dialog v-model:open="open" title="自定义 Footer"><p>Dialog custom-footer 场景。</p><template #footer><Button>取消</Button><Button>保存草稿</Button><Button variant="solid" color="primary">确定</Button></template></Dialog></template>
