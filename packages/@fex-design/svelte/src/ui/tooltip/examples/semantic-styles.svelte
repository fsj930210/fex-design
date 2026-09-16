<script lang="ts">
  import { Tooltip } from "@fex-design/svelte/ui/tooltip";
  import { buttonClassName } from "@fex-design/styles/button";
</script>

<div class="flex min-h-64 items-center justify-center">
  <Tooltip
    title="这是明显放大的紫色结构化提示"
    classNames={{
      root: "rounded-2xl font-semibold shadow-xl",
      arrow: "rounded-[3px]",
    }}
    styles={{
      root: "background-color:#7c3aed;color:#fff;font-size:16px;line-height:24px;max-width:260px;padding:12px 20px",
      arrow: "background-color:#7c3aed;width:12px;height:12px",
    }}
    >{#snippet children(binding)}<button
        {...binding.props}
        use:binding.action
        class={buttonClassName()}>查看结构化样式</button
      >{/snippet}</Tooltip
  >
</div>
