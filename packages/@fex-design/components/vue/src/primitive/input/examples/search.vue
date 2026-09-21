<script setup lang="ts">
import { ref } from 'vue'
import { inputActionClassName, inputSearchAddonClassName } from '@fex-design/components-styles/input'
import { LoadingIcon } from '@fex-design/vue/icons/loading'
import { SearchIcon } from '@fex-design/vue/icons/search'
import { Button } from '@fex-design/vue/primitive/button'
import {
  InputAddonAfter,
  InputAddonBefore,
  InputControl,
  InputGroup,
  InputPrefix,
  InputRoot,
} from '@fex-design/vue/primitive/input'
const result = ref('尚未搜索')
const search = (value: string, source: string) => (result.value = `${source}: ${value}`)
const enter = (event: KeyboardEvent) => {
  if (event.key === 'Enter') search((event.currentTarget as HTMLInputElement).value, 'enter')
}
</script>
<template>
  <div class="grid w-full gap-3">
    <InputGroup
      ><InputRoot default-value="组件库"><InputControl @keydown="enter" /></InputRoot
      ><InputAddonAfter
        ><Button
          variant="solid"
          color="primary"
          data-input-addon-fill=""
          aria-label="Search"
          :class="inputSearchAddonClassName"
          @click="search('组件库', 'addonAfter')"
          ><SearchIcon /></Button></InputAddonAfter></InputGroup
    ><InputGroup
      ><InputRoot default-value="加载中"><InputControl /></InputRoot
      ><InputAddonAfter
        ><Button
          variant="solid"
          color="primary"
          disabled
          data-input-addon-fill=""
          aria-label="Search"
          :class="inputSearchAddonClassName"
          ><LoadingIcon class="animate-spin" /></Button></InputAddonAfter></InputGroup
    ><InputRoot><InputControl placeholder="仅按 Enter 搜索" @keydown="enter" /></InputRoot
    ><InputRoot
      ><InputPrefix
        ><button
          type="button"
          aria-label="Search"
          :class="inputActionClassName"
          @click="search('', 'prefix')"
        >
          <SearchIcon /></button></InputPrefix
      ><InputControl placeholder="前置搜索图标" @keydown="enter" /></InputRoot
    ><InputGroup
      ><InputAddonBefore
        ><Button
          variant="solid"
          color="primary"
          data-input-addon-fill=""
          aria-label="Search"
          :class="inputSearchAddonClassName"
          @click="search('', 'addonBefore')"
          >站内</Button
        ></InputAddonBefore
      ><InputRoot><InputControl placeholder="双侧搜索按钮" @keydown="enter" /></InputRoot
      ><InputAddonAfter
        ><Button
          variant="solid"
          color="primary"
          data-input-addon-fill=""
          aria-label="Search"
          :class="inputSearchAddonClassName"
          @click="search('', 'addonAfter')"
          >搜索</Button
        ></InputAddonAfter
      ></InputGroup
    >
    <p class="text-sm text-muted-foreground">{{ result }}</p>
  </div>
</template>
