<script setup lang="ts">
import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
} from '@fex-design/vue/primitive/menu'
import { Button } from '@fex-design/vue/ui/button'
import { computed, ref } from 'vue'

const styled = ref(true),
  open = ref(['workspace'])
const theme = computed(() =>
  styled.value
    ? {
        '--menu-background': '#faf5ff',
        '--menu-color': '#3b0764',
        '--menu-item-background': '#ffffff',
        '--menu-item-color': '#5b21b6',
        '--menu-item-hover-background': '#ede9fe',
        '--menu-item-hover-color': '#4c1d95',
        '--menu-item-selected-background': '#ddd6fe',
        '--menu-item-selected-color': '#4c1d95',
        '--menu-item-disabled-color': '#a78bfa',
        '--menu-item-height': '40px',
        '--menu-item-radius': '10px',
        '--menu-indent': '24px',
      }
    : undefined,
)
function show(next: boolean) {
  styled.value = next
  open.value = ['workspace']
}
</script>
<template>
  <div class="grid min-h-80 w-full max-w-xl content-start gap-3">
    <div class="flex gap-2">
      <Button size="sm" @click="show(false)">默认主题</Button>
      <Button size="sm" @click="show(true)">紫色主题</Button>
    </div>
    <MenuRoot layout="inline" :default-value="['overview']" v-model:open-values="open">
      <MenuContent class="w-full max-w-xs rounded-xl border border-border p-2" :style="theme">
        <MenuItem value="overview">概览</MenuItem>
        <SubMenu value="workspace">
          <SubMenuTrigger>工作空间</SubMenuTrigger>
          <SubMenuContent>
            <MenuItem value="members">成员</MenuItem>
            <MenuItem value="roles">角色</MenuItem>
            <MenuItem value="billing" disabled>账单</MenuItem>
          </SubMenuContent>
        </SubMenu>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>账户</MenuGroupLabel>
          <MenuItem value="profile">个人资料</MenuItem>
          <MenuItem value="logout">退出登录</MenuItem>
        </MenuGroup>
      </MenuContent>
    </MenuRoot>
  </div>
</template>
