<script lang="ts">
  import { Tooltip } from "@fex-design/svelte/ui/tooltip";
  import { buttonClassName } from "@fex-design/components-styles/button";
</script>

<div class="flex min-h-64 items-center justify-center">
  <Tooltip
    title="CSS Variables 同时控制颜色、宽度和动效时长。"
    style="--tooltip-background:#164e63;--tooltip-foreground:#ecfeff;--tooltip-content-max-width:180px;--tooltip-motion-duration:300ms"
  >
    {#snippet children(binding)}<button
        {...binding.props}
        use:binding.action
        class={buttonClassName()}>CSS Variables</button
      >{/snippet}
  </Tooltip>
</div>
