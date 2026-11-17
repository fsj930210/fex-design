<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { Button } from "@fex-design/svelte/ui/button";
  let open = $state(false);
  let direction = $state<"ltr" | "rtl">("ltr");
</script>

<Button
  onclick={() => {
    direction = "ltr";
    open = true;
  }}>打开 LTR</Button
><Button
  onclick={() => {
    direction = "rtl";
    open = true;
  }}>打开 RTL</Button
>
<Dialog
  bind:open
  title="书写方向"
  classNames={{
    content: direction === "rtl" ? "[direction:rtl]" : "[direction:ltr]",
  }}
  ><p>
    English: read from left to right. العربية: تُقرأ من اليمين إلى اليسار.
  </p></Dialog
>
