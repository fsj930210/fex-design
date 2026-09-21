<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Input } from '@fex-design/vue/ui/input'
import { Button } from '@fex-design/vue/ui/button'
const control = useTemplateRef<{ focus: () => void; blur: () => void; select: () => void }>(
  'control',
)
</script>
<template>
  <div class="grid w-full gap-3">
    <Input ref="control" default-value="通过 ref 控制" />
    <div class="flex gap-2">
      <Button @click="control?.focus()">聚焦</Button><Button @click="control?.blur()">失焦</Button
      ><Button @click="control?.select()">全选</Button>
    </div>
  </div>
</template>
