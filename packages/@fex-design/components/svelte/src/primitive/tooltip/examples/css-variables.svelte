<script lang="ts">
  import TooltipRoot from "@fex-design/svelte/primitive/tooltip";
  import TooltipTrigger from "@fex-design/svelte/primitive/tooltip-trigger";
  import TooltipPortal from "@fex-design/svelte/primitive/tooltip-portal";
  import TooltipContent from "@fex-design/svelte/primitive/tooltip-content";
  import TooltipArrow from "@fex-design/svelte/primitive/tooltip-arrow";
  import { buttonClassName } from "@fex-design/components-styles/button";
</script>

<div class="flex min-h-64 items-center justify-center">
  <TooltipRoot>
    <TooltipTrigger>
      {#snippet children(binding)}
        <button {...binding.props} use:binding.action class={buttonClassName()}
          >CSS Variables</button
        >
      {/snippet}
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent
        style="--tooltip-background:#164e63;--tooltip-foreground:#ecfeff;--tooltip-content-max-width:180px;--tooltip-motion-duration:300ms"
      >
        CSS Variables 同时控制颜色、宽度和动效时长。<TooltipArrow />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</div>
