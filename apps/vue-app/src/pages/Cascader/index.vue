<script setup lang="ts">
import AsyncValueDemo from './async-value-demo.vue'
import BasicDemo from './basic-demo.vue'
import ChangeOnSelectDemo from './change-on-select-demo.vue'
import CheckStrictlyDemo from './check-strictly-demo.vue'
import ControlledDemo from './controlled-demo.vue'
import CustomDemo from './custom-demo.vue'
import FieldNamesDemo from './field-names-demo.vue'
import FormDemo from './form-demo.vue'
import HoverDemo from './hover-demo.vue'
import LazyLoadDemo from './lazy-load-demo.vue'
import MultipleDemo from './multiple-demo.vue'
import RemoteSearchDemo from './remote-search-demo.vue'
import SearchDemo from './search-demo.vue'
import SyncValueDemo from './sync-value-demo.vue'
</script>
<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <div>
          <h1 class="text-2xl font-semibold text-foreground">Cascader</h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Hierarchical paths with full-depth search, lazy loading, multiple conduction and form
            integration.
          </p>
        </div>
      </header>
      <div class="grid gap-4">
        <BasicDemo /><ControlledDemo /><FieldNamesDemo /><MultipleDemo /><CheckStrictlyDemo /><ChangeOnSelectDemo /><SearchDemo /><RemoteSearchDemo /><LazyLoadDemo /><HoverDemo /><SyncValueDemo /><AsyncValueDemo /><FormDemo /><CustomDemo />
      </div>
    </div>
  </main>
</template>
