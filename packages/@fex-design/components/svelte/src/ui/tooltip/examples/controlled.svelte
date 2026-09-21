<script lang="ts">
  import { Tooltip } from "@fex-design/svelte/ui/tooltip";
  import { Button } from "@fex-design/svelte/ui/button";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let open = $state(false);
</script>

<div class="flex min-h-64 items-center justify-center gap-3">
  <Button onclick={() => (open = !open)}>外部{open ? "关闭" : "打开"}</Button
  ><Tooltip
    {open}
    onOpenChange={(value) => (open = value)}
    title="状态由调用方管理"
    >{#snippet children(binding)}<button
        {...binding.props}
        use:binding.action
        class={buttonClassName({ variant: "outlined" })}>受控提示</button
      >{/snippet}</Tooltip
  >
</div>
