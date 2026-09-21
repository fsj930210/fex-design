<script lang="ts">
  import TooltipRoot from "@fex-design/svelte/primitive/tooltip";
  import TooltipTrigger from "@fex-design/svelte/primitive/tooltip-trigger";
  import TooltipPortal from "@fex-design/svelte/primitive/tooltip-portal";
  import TooltipContent from "@fex-design/svelte/primitive/tooltip-content";
  import TooltipArrow from "@fex-design/svelte/primitive/tooltip-arrow";
  import { Button } from "@fex-design/svelte/primitive/button";
  import { buttonClassName } from "@fex-design/components-styles/button";
  let open = $state(false);
</script>

<div class="flex min-h-64 items-center justify-center gap-3">
  <Button onclick={() => (open = !open)}>外部{open ? "关闭" : "打开"}</Button
  ><TooltipRoot {open} onOpenChange={(value) => (open = value)}
    ><TooltipTrigger
      >{#snippet children(binding)}<button
          {...binding.props}
          use:binding.action
          class={buttonClassName({ variant: "outlined" })}>受控提示</button
        >{/snippet}</TooltipTrigger
    ><TooltipPortal
      ><TooltipContent>状态由调用方管理<TooltipArrow /></TooltipContent
      ></TooltipPortal
    ></TooltipRoot
  >
</div>
