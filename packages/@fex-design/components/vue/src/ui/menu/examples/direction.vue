<script setup lang="ts">
import { Menu, MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/vue/ui/menu'
</script>
<template>
  <div class="grid w-full max-w-2xl gap-6 md:grid-cols-2">
    <section class="min-w-0 max-w-xs">
      <h3>LTR</h3>
      <Menu dir="ltr" aria-label="LTR menu">
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
    </section>
    <section class="min-w-0 max-w-xs">
      <h3>RTL</h3>
      <Menu dir="rtl" aria-label="RTL menu">
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
    </section>
  </div>
</template>
