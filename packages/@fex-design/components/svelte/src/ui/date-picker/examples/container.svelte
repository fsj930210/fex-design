<script lang="ts">
  import { DatePicker } from "@fex-design/svelte/ui/date-picker";
</script>

<div class="flex flex-wrap items-start gap-4">
  <DatePicker defaultOpen>
    {#snippet container(state, content)}<div
        class="flex flex-col items-start gap-2 data-[open=false]:[&_[data-slot=date-picker-content]]:hidden"
        data-open={state.getOpen() ? "true" : "false"}
      >
        {@render content?.(state)}
      </div>{/snippet}
  </DatePicker>
</div>
