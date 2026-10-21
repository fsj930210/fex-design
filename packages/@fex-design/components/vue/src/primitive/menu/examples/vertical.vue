<script setup lang="ts">
import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/vue/primitive/menu'
</script>
<template>
  <div class="grid min-h-48 w-full max-w-xl content-start">
    <MenuRoot layout="vertical">
      <MenuContent
        class="w-44 max-w-full rounded-lg border border-border p-1"
        aria-label="vertical menu"
        ><MenuItem value="overview">概览</MenuItem>
        <SubMenu value="workspace">
          <SubMenuTrigger>工作空间</SubMenuTrigger>
          <SubMenuContent
            ><MenuItem value="members">成员</MenuItem>
            <SubMenu value="settings">
              <SubMenuTrigger>设置</SubMenuTrigger>
              <SubMenuContent
                ><MenuItem value="general">通用设置</MenuItem
                ><MenuItem value="billing" disabled>账单</MenuItem></SubMenuContent
              >
            </SubMenu></SubMenuContent
          >
        </SubMenu>
        <MenuItem value="profile">个人资料</MenuItem></MenuContent
      >
    </MenuRoot>
  </div>
</template>
