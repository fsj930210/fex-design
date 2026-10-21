<script setup lang="ts">
import {
  InputRoot,
  InputPrefix,
  InputControl,
  InputClear,
  InputSuffix,
  InputGroup,
  InputAddonAfter,
} from '@fex-design/vue/primitive/input'
import { Button } from '@fex-design/vue/primitive/button'
import {
  inputActionClassName,
  inputSearchAddonClassName,
} from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
import { EyeIcon } from '@fex-design/vue/icons/eye'
import { EyeOffIcon } from '@fex-design/vue/icons/eye-off'
import { SearchIcon } from '@fex-design/vue/icons/search'
import { ref } from 'vue'
const value = ref('structured')
const visible = ref(false)
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot
      :value="value"
      @value-change="value = $event"
      class="border-violet-300 hover:border-violet-400 focus-within:border-violet-600 focus-within:ring-violet-600/20"
      ><InputPrefix class="text-violet-500">@</InputPrefix
      ><InputControl class="font-medium" /><InputClear
        v-if="value"
        class="hover:text-violet-700" /></InputRoot
    ><InputRoot default-value="secret"
      ><InputControl :type="visible ? 'text' : 'password'" /><InputSuffix
        ><button
          type="button"
          data-slot="input-action"
          :class="cn(inputActionClassName, 'text-violet-500')"
          :aria-label="visible ? 'Hide password' : 'Show password'"
          :aria-pressed="visible"
          @click="visible = !visible"
        >
          <EyeOffIcon v-if="visible" /><EyeIcon v-else /></button></InputSuffix></InputRoot
    ><InputGroup
      ><InputRoot
        default-value="主题"
        class="[--input-background:#faf5ff] [--input-border-color:#d8b4fe] [--input-ring-color:#9333ea]"
        ><InputControl /></InputRoot
      ><InputAddonAfter
        ><Button
          variant="solid"
          color="primary"
          data-input-addon-fill=""
          aria-label="Search"
          :class="inputSearchAddonClassName"
          ><SearchIcon /></Button></InputAddonAfter
    ></InputGroup>
  </div>
</template>
