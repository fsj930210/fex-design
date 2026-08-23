<script setup lang="ts">
import Card from '@fex-design/vue/ui/card'
import ClassicBreadcrumb from './classic-breadcrumb.vue'
import CapsuleBreadcrumb from './capsule-breadcrumb.vue'
import DropdownDemo from './dropdown-demo.vue'
import ParallelogramBreadcrumb from './parallelogram-breadcrumb.vue'
import RibbonBreadcrumb from './ribbon-breadcrumb.vue'
</script>
<template><main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4"><div class="mx-auto w-full max-w-5xl space-y-4"><header><RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/">Back home</RouterLink><h1 class="mt-2 text-2xl font-semibold text-foreground">Breadcrumb</h1><p class="mt-2 text-sm text-muted-foreground">Composable navigation trails with links, current pages, custom separators and menu triggers.</p></header><div class="space-y-4"><Card title="Classic" description="Links and the current page use different semantics."><ClassicBreadcrumb /></Card><Card title="Custom separator" description="The separator can be any text or icon."><ClassicBreadcrumb separator="-&gt;" /></Card><Card title="Capsule" description="Connected rounded segments inspired by the reference style."><CapsuleBreadcrumb /></Card><Card title="Ribbon" description="Pointed segments with overlap and a closed final edge."><RibbonBreadcrumb /></Card><Card title="Parallelogram" description="Angled segments with shared overlap."><ParallelogramBreadcrumb /></Card><Card title="Ellipsis and dropdown trigger" description="Ellipsis is presentational; popup behavior stays with the caller."><DropdownDemo /></Card></div></div></main></template>
