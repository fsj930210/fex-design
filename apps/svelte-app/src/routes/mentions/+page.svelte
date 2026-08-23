<script lang="ts">
  import BasicDemo from './basic-demo.svelte'
  import CustomTriggerDemo from './custom-trigger-demo.svelte'
  import ParamsDemo from './params-demo.svelte'
  import PrefixDemo from './prefix-demo.svelte'
  import ValidationDemo from './validation-demo.svelte'
</script>

<svelte:head><title>Mentions</title></svelte:head>

<main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
  <div class="mx-auto w-full max-w-5xl space-y-4">
    <header class="space-y-2">
      <a class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</a>
      <h1 class="text-2xl font-semibold text-foreground">Mentions primitive</h1>
      <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
        Mention primitives identify prefix queries, render caller-owned items, and notify selection.
      </p>
    </header>
    <div class="grid gap-4">
      <BasicDemo />
      <PrefixDemo />
      <ParamsDemo />
      <CustomTriggerDemo />
      <ValidationDemo />
    </div>
  </div>
</main>
