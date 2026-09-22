<script lang="ts">
  import SelectRoot from "@fex-design/svelte/primitive/select";
  import SelectContent from "@fex-design/svelte/primitive/select-content";
  import SelectTrigger from "@fex-design/svelte/primitive/select-trigger";
  import { frameworkOptions } from "./data";
  import Demo from "./demo-section.svelte";
</script>

<Demo
  title="Custom option rendering"
  description="The option snippet replaces content while behavior remains intact."
  ><SelectRoot options={frameworkOptions}
    ><SelectTrigger placeholder="请选择技术" /><SelectContent
        >{#snippet option(item)}<div
            class="flex items-center justify-between gap-3"
          >
            <span>{item.label}</span><span class="text-xs text-muted-foreground"
              >{item.group}</span
            >
          </div>{/snippet}
      ></SelectContent
    ></SelectRoot
  ></Demo
>
