<script setup lang="ts">
import Card from '@fex-design/vue/ui/card'
import HorizontalNestedDemo from './horizontal-nested-demo.vue'
import MenubarDemo from './menubar-demo.vue'
import NavDemo from './nav-demo.vue'
import RestoredDemos from './restored-demos.vue'
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4"><div class="mx-auto w-full max-w-5xl space-y-4"><header class="space-y-2"><RouterLink class="text-sm text-muted-foreground" to="/">Back home</RouterLink><div><h1 class="text-2xl font-semibold">Menu</h1><p class="mt-2 text-sm text-muted-foreground">One primitive for navigation, command bars and nested menus.</p></div></header><div class="grid gap-4 lg:grid-cols-2"><RestoredDemos /><Card title="Horizontal nested menu" description="Horizontal root navigation with floating submenus at multiple levels."><HorizontalNestedDemo /></Card><Card title="Menubar" description="Command-bar semantics and styling without a separate component family."><MenubarDemo /></Card><Card title="Navigation" description="Custom link triggers with horizontal keyboard navigation."><NavDemo /></Card></div></div></main>
</template>
