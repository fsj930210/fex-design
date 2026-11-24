<script lang="ts">
  import { createDropdown } from "@fex-design/svelte/primitive/dropdown";
  const { controller, popover, menuSnapshot } = createDropdown();
  const snapshot = popover.snapshot;
  function trigger(element: HTMLButtonElement) {
    return { destroy: controller.bindTrigger(element) };
  }
  function content(element: HTMLDivElement) {
    return { destroy: controller.bindFloatingContent(element) };
  }
  function item(element: HTMLButtonElement, value: string) {
    return { destroy: controller.dom.bindItem(element, () => ({ value })) };
  }
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <button
    use:trigger
    type="button"
    aria-haspopup="menu"
    aria-expanded={$snapshot.open}
    class="rounded-md border px-3 py-2"
    onclick={() => controller.overlay.toggle()}
    onkeydown={(event) => controller.triggerKeyDown(event)}>操作</button
  >
  {#if $snapshot.mounted}
    <div
      use:content
      role="menu"
      aria-label="操作"
      tabindex="-1"
      hidden={$snapshot.phase === "closed"}
      inert={!$snapshot.open}
      class="flex flex-col rounded-md border bg-background p-1 shadow-md"
      style="position: var(--floating-strategy, absolute); left: var(--floating-x, 0px); top: var(--floating-y, 0px)"
    >
      <button
        use:item={"rename"}
        type="button"
        class="rounded px-3 py-2 text-start">重命名</button
      >
      <button
        use:item={"duplicate"}
        type="button"
        class="rounded px-3 py-2 text-start">复制</button
      >
    </div>
  {/if}
  <output>最近选择：{$menuSnapshot.value.join(", ") || "尚未选择"}</output>
</div>
