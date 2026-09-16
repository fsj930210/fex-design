<script lang="ts">
  import { Tooltip } from "@fex-design/svelte/ui/tooltip";
  import { buttonClassName } from "@fex-design/styles/button";
</script>

<div class="flex min-h-64 items-center justify-center">
  <Tooltip title="将鼠标移到这段提示上仍会保持显示"
    >{#snippet children(binding)}<button
        {...binding.props}
        use:binding.action
        class={buttonClassName()}>悬停或聚焦</button
      >{/snippet}</Tooltip
  >
</div>
