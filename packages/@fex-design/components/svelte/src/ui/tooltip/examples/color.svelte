<script lang="ts">
  import { Tooltip } from "@fex-design/svelte/ui/tooltip";
  import { buttonClassName } from "@fex-design/components-styles/button";
</script>

<div class="flex flex-wrap items-center justify-center gap-4">
  <Tooltip color="#1677ff" title="品牌蓝 Tooltip"
    >{#snippet children(binding)}<button
        {...binding.props}
        use:binding.action
        class={buttonClassName()}>品牌蓝</button
      >{/snippet}</Tooltip
  ><Tooltip color="#722ed1" title="紫色 Tooltip"
    >{#snippet children(binding)}<button
        {...binding.props}
        use:binding.action
        class={buttonClassName()}>紫色</button
      >{/snippet}</Tooltip
  ><Tooltip color="#d4380d" title="暖红色 Tooltip"
    >{#snippet children(binding)}<button
        {...binding.props}
        use:binding.action
        class={buttonClassName()}>暖红色</button
      >{/snippet}</Tooltip
  >
</div>
