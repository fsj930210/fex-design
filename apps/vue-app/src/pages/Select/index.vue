<script setup lang="ts">
import ChangeMetaDemo from './change-meta-demo.vue'
import ClearDemo from './clear-demo.vue'
import CustomRenderDemo from './custom-render-demo.vue'
import CustomSearchDemo from './custom-search-demo.vue'
import CustomTagDemo from './custom-tag-demo.vue'
import EmptyDemo from './empty-demo.vue'
import FormStatusDemo from './form-status-demo.vue'
import GroupDemo from './group-demo.vue'
import LocalSearchDemo from './local-search-demo.vue'
import MaxCountDemo from './max-count-demo.vue'
import MultiFieldSearchDemo from './multi-field-search-demo.vue'
import MultipleDemo from './multiple-demo.vue'
import PopupRenderDemo from './popup-render-demo.vue'
import PrefixSuffixDemo from './prefix-suffix-demo.vue'
import RemoteSearchDemo from './remote-search-demo.vue'
import SingleDemo from './single-demo.vue'
import TagsDemo from './tags-demo.vue'
import VirtualDemo from './virtual-demo.vue'
</script>
<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/"
          >Back home</RouterLink
        >
        <div>
          <h1 class="text-2xl font-semibold text-foreground">Select</h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Single, multiple and tags selection with local or remote search, grouping and optional
            virtualization.
          </p>
        </div>
      </header>
      <div class="grid gap-4">
        <SingleDemo /><MultipleDemo /><TagsDemo /><ClearDemo /><MaxCountDemo /><ChangeMetaDemo /><CustomTagDemo /><PrefixSuffixDemo /><FormStatusDemo /><PopupRenderDemo /><GroupDemo /><CustomRenderDemo /><LocalSearchDemo /><MultiFieldSearchDemo /><CustomSearchDemo /><RemoteSearchDemo /><EmptyDemo /><VirtualDemo />
      </div>
    </div>
  </main>
</template>
