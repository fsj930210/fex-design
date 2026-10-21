<script lang="ts">
  import { Popover } from "@fex-design/svelte/ui/popover";
  import { popoverStyleDemo as demo } from "@fex-design/docs-shared/popover-demo";
  import { buttonClassName } from "@fex-design/components-styles/button";
  const rootStyle = Object.entries(demo.customVariables)
    .map(([name, value]) => name + ":" + value)
    .join(";");
</script>

<div class="w-full flex items-center justify-center min-h-[360px] py-16">
  <Popover
    arrow
    title={demo.title}
    classNames={demo.classNames}
    styles={{ root: rootStyle }}
    >{#snippet children(binding)}<button
        {...binding.props}
        use:binding.action
        class={buttonClassName()}
        data-slot="button"
        data-variant="outlined"
        data-size="md">{demo.trigger}</button
      >{/snippet}{#snippet content(_state)}{demo.content}{/snippet}</Popover
  >
</div>
