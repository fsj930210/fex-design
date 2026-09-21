<script lang="ts">
  import {
    SwitchRoot,
    SwitchContent,
    SwitchThumb,
  } from "@fex-design/svelte/primitive/switch";
  import { Button } from "@fex-design/svelte/primitive/button";
  let roundedChecked = $state(false);
  let pillChecked = $state(false);
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <section class="grid justify-items-start gap-2">
    <span class="text-sm text-muted-foreground">rounded</span>
    <div class="flex flex-wrap items-center gap-3">
      <div class="grid justify-items-start gap-2">
        <span class="text-xs">非受控</span><SwitchRoot
          shape="rounded"
          aria-label="rounded 非受控"><SwitchThumb /></SwitchRoot
        ><span class="mt-2 text-xs">受控</span><SwitchRoot
          shape="rounded"
          checked={roundedChecked}
          onChange={(checked) => (roundedChecked = checked)}
          aria-label="rounded 受控"><SwitchThumb /></SwitchRoot
        >
        <div class="flex gap-2">
          <Button size="sm" onclick={() => (roundedChecked = true)}>开启</Button
          ><Button size="sm" onclick={() => (roundedChecked = false)}
            >关闭</Button
          >
        </div>
      </div>
    </div>
  </section>
  <section class="grid justify-items-start gap-2">
    <span class="text-sm text-muted-foreground">pill</span>
    <div class="flex flex-wrap items-center gap-3">
      <div class="grid justify-items-start gap-2">
        <span class="text-xs">非受控</span><SwitchRoot
          shape="pill"
          aria-label="pill 非受控"><SwitchThumb /></SwitchRoot
        ><span class="mt-2 text-xs">受控</span><SwitchRoot
          shape="pill"
          checked={pillChecked}
          onChange={(checked) => (pillChecked = checked)}
          aria-label="pill 受控"><SwitchThumb /></SwitchRoot
        >
        <div class="flex gap-2">
          <Button size="sm" onclick={() => (pillChecked = true)}>开启</Button
          ><Button size="sm" onclick={() => (pillChecked = false)}>关闭</Button>
        </div>
      </div>
    </div>
  </section>
</div>
