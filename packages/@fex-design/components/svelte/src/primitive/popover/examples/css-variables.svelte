<script lang="ts">
  import {
    Popover,
    PopoverTrigger,
    PopoverPortal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverTitle,
  } from "@fex-design/svelte/primitive/popover";
  import { popoverStyleDemo as demo } from "@fex-design/docs-shared/popover-demo";
  import { buttonClassName } from "@fex-design/components-styles/button";
  const rootStyle = Object.entries(demo.customVariables)
    .map(([name, value]) => name + ":" + value)
    .join(";");
</script>

<div class="w-full flex items-center justify-center min-h-[360px] py-16">
  <Popover arrow
    >{#snippet children(_state)}<PopoverTrigger
        >{#snippet children(binding)}<button
            {...binding.props}
            use:binding.action
            class={buttonClassName()}
            data-slot="button"
            data-variant="outlined"
            data-size="md">{demo.trigger}</button
          >{/snippet}</PopoverTrigger
      ><PopoverPortal
        ><PopoverContent class={demo.classNames.root} style={rootStyle}
          ><PopoverArrow /><PopoverHeader
            ><PopoverTitle class={demo.classNames.title}
              >{demo.title}</PopoverTitle
            ></PopoverHeader
          >
          <div data-slot="popover-body" class={demo.classNames.content}>
            {demo.content}
          </div></PopoverContent
        ></PopoverPortal
      >{/snippet}</Popover
  >
</div>
