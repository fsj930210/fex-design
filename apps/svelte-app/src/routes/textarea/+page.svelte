<script lang="ts">
  import BasicDemo from './basic-demo.svelte'
  import AutosizeDemo from './autosize-demo.svelte'
  import ControlledDemo from './controlled-demo.svelte'
  import CountDemo from './count-demo.svelte'
  import FooterDemo from './footer-demo.svelte'
  import ValidationDemo from './validation-demo.svelte'
</script>

<main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
  <div class="mx-auto w-full max-w-5xl space-y-4">
    <header class="space-y-2">
      <a class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</a>
      <h1 class="text-2xl font-semibold text-foreground">Textarea primitives</h1>
      <p class="max-w-2xl text-sm leading-6 text-muted-foreground">
        TextareaRoot coordinates value, autosize, clear and footer composition while TextareaInput remains the native textarea node.
      </p>
    </header>

    <div class="space-y-4">
      <BasicDemo />
      <AutosizeDemo />
      <ControlledDemo />
      <CountDemo />
      <FooterDemo />
      <ValidationDemo />
    </div>
  </div>
</main>
