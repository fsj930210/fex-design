<script lang="ts">
  import BasicDemo from './basic-demo.svelte'
  import CustomConfigDemo from './custom-config-demo.svelte'
  import ImageDemo from './image-demo.svelte'
  import ModalDrawerDemo from './modal-drawer-demo.svelte'
  import MultilineDemo from './multiline-demo.svelte'
  import RestoreDemo from './restore-demo.svelte'
</script>

<main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
  <div class="mx-auto w-full max-w-5xl space-y-4">
    <header class="space-y-2">
      <a class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</a>
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
