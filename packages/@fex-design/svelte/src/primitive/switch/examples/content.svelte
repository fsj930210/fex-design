<script lang="ts">
  import {
    SwitchRoot,
    SwitchContent,
    SwitchThumb,
  } from "@fex-design/svelte/primitive/switch";
  import CheckIcon from "@fex-design/svelte/icon/check";
  import XIcon from "@fex-design/svelte/icon/x";
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <section class="grid gap-2">
    <span class="text-sm text-muted-foreground">rounded</span>
    <div class="flex flex-wrap items-center gap-3">
      <SwitchRoot shape="rounded" defaultChecked aria-label="rounded 文字开关"
        ><SwitchContent state="checked">开启</SwitchContent><SwitchContent
          state="unchecked">关闭</SwitchContent
        ><SwitchThumb /></SwitchRoot
      ><SwitchRoot shape="rounded" aria-label="rounded 文字开关"
        ><SwitchContent state="checked">开启</SwitchContent><SwitchContent
          state="unchecked">关闭</SwitchContent
        ><SwitchThumb /></SwitchRoot
      ><SwitchRoot shape="rounded" aria-label="rounded 图标开关"
        ><SwitchContent state="checked"><CheckIcon /></SwitchContent
        ><SwitchContent state="unchecked"><XIcon /></SwitchContent><SwitchThumb
        /></SwitchRoot
      >
    </div>
  </section>
  <section class="grid gap-2">
    <span class="text-sm text-muted-foreground">pill</span>
    <div class="flex flex-wrap items-center gap-3">
      <SwitchRoot shape="pill" defaultChecked aria-label="pill 文字开关"
        ><SwitchContent state="checked">开启</SwitchContent><SwitchContent
          state="unchecked">关闭</SwitchContent
        ><SwitchThumb /></SwitchRoot
      ><SwitchRoot shape="pill" aria-label="pill 文字开关"
        ><SwitchContent state="checked">开启</SwitchContent><SwitchContent
          state="unchecked">关闭</SwitchContent
        ><SwitchThumb /></SwitchRoot
      ><SwitchRoot shape="pill" aria-label="pill 图标开关"
        ><SwitchContent state="checked"><CheckIcon /></SwitchContent
        ><SwitchContent state="unchecked"><XIcon /></SwitchContent><SwitchThumb
        /></SwitchRoot
      >
    </div>
  </section>
</div>
