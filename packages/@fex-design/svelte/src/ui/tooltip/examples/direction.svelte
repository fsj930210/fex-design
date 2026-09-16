<script lang="ts">
  import { Tooltip } from "@fex-design/svelte/ui/tooltip";
  import { buttonClassName } from "@fex-design/styles/button";
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <div class="flex justify-center" dir="ltr">
    <Tooltip
      dir="ltr"
      placement="topLeft"
      avoidCollisions={false}
      title="这是从起始侧对齐的中文提示"
      >{#snippet children(binding)}<button
          {...binding.props}
          use:binding.action
          class={buttonClassName()}>查看中文提示</button
        >{/snippet}</Tooltip
    >
  </div>
  <div class="flex justify-center" dir="rtl">
    <Tooltip
      dir="rtl"
      placement="topLeft"
      avoidCollisions={false}
      title="تلميح عربي بمحاذاة جهة البداية"
      >{#snippet children(binding)}<button
          {...binding.props}
          use:binding.action
          class={buttonClassName()}>تلميح</button
        >{/snippet}</Tooltip
    >
  </div>
</div>
