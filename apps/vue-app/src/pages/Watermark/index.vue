<script setup lang="ts">
import BasicDemo from './basic-demo.vue'
import CustomConfigDemo from './custom-config-demo.vue'
import ImageDemo from './image-demo.vue'
import ModalDrawerDemo from './modal-drawer-demo.vue'
import MultilineDemo from './multiline-demo.vue'
import RestoreDemo from './restore-demo.vue'
</script>

<template>
  <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
    <div class="mx-auto w-full max-w-5xl space-y-4">
      <header class="space-y-2">
        <RouterLink class="text-sm text-muted-foreground hover:text-foreground" to="/">
          Back home
        </RouterLink>
        <h1 class="text-2xl font-semibold text-foreground">Watermark</h1>
        <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
          Add repeated text watermarks over content, including image previews.
        </p>
      </header>
      <div class="grid gap-4">
        <BasicDemo />
        <MultilineDemo />
        <ImageDemo />
        <CustomConfigDemo />
        <ModalDrawerDemo />
        <RestoreDemo />
      </div>
    </div>
  </main>
</template>
