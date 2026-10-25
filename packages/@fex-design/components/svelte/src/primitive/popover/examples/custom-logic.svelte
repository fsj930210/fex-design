<script lang="ts">
  import { createPopover } from "@fex-design/svelte/primitive/popover";
  const { overlay, snapshot } = createPopover(() => ({}));
</script>

<section class="grid w-full max-w-sm gap-3 rounded-lg border p-4">
  <button
    type="button"
    aria-expanded={$snapshot.open}
    onclick={() => overlay.toggle()}
    >{$snapshot.open ? "Close details" : "Open details"}</button
  >
  {#if $snapshot.open}<div
      role="dialog"
      class="grid gap-2 rounded-md border p-3"
    >
      <strong>Custom Popover</strong>
      <p>This panel is rendered by the example component.</p>
      <button type="button" onclick={() => overlay.close()}>Dismiss</button>
    </div>{/if}
  <output aria-live="polite">{$snapshot.open ? "Open" : "Closed"}</output>
</section>
