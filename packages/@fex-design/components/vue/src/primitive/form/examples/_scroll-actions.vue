<script setup lang="ts">
import { useFormActions } from '@fex-design/vue/primitive/form'
import { Button } from '@fex-design/vue/primitive/button'
defineOptions({ name: 'ScrollActions' })
const actions = useFormActions()
</script>
<template>
  <div class="flex flex-wrap gap-3">
    <Button type="submit" variant="solid" color="primary">校验并定位首错</Button
    ><Button type="button" @click="actions.scrollToField('notes')">定位备注错误</Button>
  </div>
</template>
