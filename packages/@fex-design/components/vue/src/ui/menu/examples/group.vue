<script setup lang="ts">
import { Menu, MenuGroup, MenuGroupLabel, MenuItem } from '@fex-design/vue/ui/menu'
</script>
<template>
<div class="w-full max-w-xs rounded-lg border border-border p-1">
<Menu>
<MenuContent aria-label="????"><MenuGroup><MenuGroupLabel>????</MenuGroupLabel><MenuItem value="overview">??</MenuItem><MenuItem value="members">??</MenuItem></MenuGroup><MenuGroup><MenuGroupLabel>??</MenuGroupLabel><MenuItem value="profile">????</MenuItem><MenuItem value="billing" disabled>??</MenuItem></MenuGroup></MenuContent>
</Menu>
</div>
</template>
