<script setup lang="ts">
import { ref } from 'vue'
import { inputActionClassName } from '@fex-design/styles/input'
import { EyeIcon } from '@fex-design/vue/icon/eye'
import { EyeOffIcon } from '@fex-design/vue/icon/eye-off'
import { InputClear, InputControl, InputRoot, InputSuffix } from '@fex-design/vue/primitive/input'
const firstVisible = ref(false)
const invalidVisible = ref(false)
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot default-value="secret"
      ><InputControl :type="firstVisible ? 'text' : 'password'" /><InputSuffix
        ><button
          type="button"
          :class="inputActionClassName"
          :aria-pressed="firstVisible"
          aria-label="Toggle password"
          @click="firstVisible = !firstVisible"
        >
          <EyeOffIcon v-if="firstVisible" /><EyeIcon v-else /></button></InputSuffix></InputRoot
    ><InputRoot><InputControl type="password" placeholder="无切换按钮" /></InputRoot
    ><InputRoot default-value="wrong-password"
      ><InputControl
        :type="invalidVisible ? 'text' : 'password'"
        aria-invalid="true" /><InputClear /><InputSuffix
        ><button
          type="button"
          :class="inputActionClassName"
          :aria-pressed="invalidVisible"
          aria-label="Toggle password"
          @click="invalidVisible = !invalidVisible"
        >
          <EyeOffIcon v-if="invalidVisible" /><EyeIcon v-else /></button></InputSuffix
    ></InputRoot>
  </div>
</template>
