<script setup lang="ts">
import { ref } from 'vue'
import { InputSearch } from '@fex-design/vue/ui/input'
import { SearchIcon } from '@fex-design/vue/icon/search'
const result = ref('尚未搜索')
const searched = (value: string, meta: { source: string }) =>
  (result.value = `${meta.source}: ${value}`)
</script>
<template>
  <div class="grid w-full gap-3">
    <InputSearch default-value="组件库" clearable @search="searched" /><InputSearch
      loading
      default-value="加载中"
    /><InputSearch
      :addon-after="null"
      placeholder="仅按 Enter 搜索"
      @search="searched"
    /><InputSearch :addon-after="null" placeholder="前置搜索图标" @search="searched"
      ><template #prefix><SearchIcon /></template></InputSearch
    ><InputSearch placeholder="双侧搜索按钮" @search="searched"
      ><template #addonBefore>站内</template><template #addonAfter>搜索</template></InputSearch
    >
    <p class="text-sm text-muted-foreground">{{ result }}</p>
  </div>
</template>
