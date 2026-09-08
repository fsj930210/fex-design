<script setup lang="ts">
import { Input, InputGroup } from '@fex-design/vue/ui/input'
import { Button } from '@fex-design/vue/ui/button'
</script>
<template>
  <div class="grid w-full gap-3">
    <InputGroup><Input placeholder="关键词" /><Button>提交</Button></InputGroup
    ><InputGroup><Input default-value="010" /><Input placeholder="电话号码" /></InputGroup>
  </div>
</template>
