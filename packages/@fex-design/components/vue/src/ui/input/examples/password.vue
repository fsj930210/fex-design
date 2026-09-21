<script setup lang="ts">
import { InputPassword } from '@fex-design/vue/ui/input'
</script>
<template>
  <div class="grid w-full gap-3">
    <InputPassword default-value="secret" /><InputPassword
      placeholder="无切换按钮"
      :visibility-toggle="false"
    /><InputPassword clearable aria-invalid="true" default-value="wrong-password" />
  </div>
</template>
