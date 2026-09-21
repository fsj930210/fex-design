<script setup lang="ts">
import { Input } from '@fex-design/vue/ui/input'
import { SearchIcon } from '@fex-design/vue/icons/search'
import { Button } from '@fex-design/vue/ui/button'
</script>
<template>
  <div class="grid w-full gap-3">
    <Input placeholder="Prefix"
      ><template #prefix><SearchIcon /></template></Input
    ><Input placeholder="Suffix"><template #suffix>CNY</template></Input
    ><Input><template #prefix>https://</template><template #suffix>.com</template></Input
    ><Input><template #addonBefore>https://</template><template #addonAfter>.com</template></Input
    ><Input placeholder="手机号"
      ><template #suffix><Button variant="text" size="sm">获取验证码</Button></template></Input
    >
  </div>
</template>
