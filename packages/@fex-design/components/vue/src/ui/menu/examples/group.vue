<script setup lang="ts">
import { Menu, MenuGroup, MenuItem } from '@fex-design/vue/ui/menu'
</script>
<template>
  <div class="w-full max-w-xs rounded-lg border border-border p-1">
    <Menu layout="inline" aria-label="菜单分组">
      <MenuGroup label="工作空间">

        <MenuItem value="overview">概览</MenuItem><MenuItem value="members">成员</MenuItem>
      </MenuGroup>
      <MenuGroup label="账户">

        <MenuItem value="profile">个人资料</MenuItem><MenuItem value="billing" disabled>账单</MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</template>
