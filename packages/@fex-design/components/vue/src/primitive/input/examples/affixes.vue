<script setup lang="ts">
import {
  InputAddonAfter,
  InputAddonBefore,
  InputControl,
  InputGroup,
  InputPrefix,
  InputRoot,
  InputSuffix,
} from '@fex-design/vue/primitive/input'
import { SearchIcon } from '@fex-design/vue/icons/search'
import { Button } from '@fex-design/vue/primitive/button'
</script>
<template>
  <div class="grid w-full gap-3">
    <InputRoot
      ><InputPrefix><SearchIcon /></InputPrefix><InputControl placeholder="Prefix" /></InputRoot
    ><InputRoot><InputControl placeholder="Suffix" /><InputSuffix>CNY</InputSuffix></InputRoot
    ><InputRoot
      ><InputPrefix>https://</InputPrefix><InputControl /><InputSuffix>.com</InputSuffix></InputRoot
    ><InputGroup
      ><InputAddonBefore>https://</InputAddonBefore><InputRoot><InputControl /></InputRoot
      ><InputAddonAfter>.com</InputAddonAfter></InputGroup
    ><InputRoot
      ><InputControl placeholder="手机号" /><InputSuffix
        ><Button variant="text" size="sm">获取验证码</Button></InputSuffix
      ></InputRoot
    >
  </div>
</template>
