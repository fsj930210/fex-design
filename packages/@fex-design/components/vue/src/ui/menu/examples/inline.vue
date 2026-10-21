<script setup lang="ts">
import { Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/vue/ui/menu'
</script>
<template>
  <div class="grid w-full max-w-xs gap-3">
    <p>点击工作空间和设置，观察内嵌展开。</p>
    <Menu layout="inline" aria-label="inline menu">
      <MenuItem value="overview">概览</MenuItem>
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
      <MenuItem value="profile">个人资料</MenuItem>
    </Menu>
  </div>
</template>
