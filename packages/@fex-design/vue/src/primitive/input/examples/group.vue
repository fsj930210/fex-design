<script setup lang="ts">
import { InputControl, InputGroup, InputRoot } from '@fex-design/vue/primitive/input'
import { Button } from '@fex-design/vue/primitive/button'
</script>
<template>
  <div class="grid w-full gap-3">
    <InputGroup
      ><InputRoot><InputControl placeholder="关键词" /></InputRoot><Button>提交</Button></InputGroup
    ><InputGroup
      ><InputRoot default-value="010"><InputControl /></InputRoot
      ><InputRoot><InputControl placeholder="电话号码" /></InputRoot
    ></InputGroup>
  </div>
</template>
