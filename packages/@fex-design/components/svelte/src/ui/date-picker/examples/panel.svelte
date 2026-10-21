<script lang="ts">
  import { DatePicker } from "@fex-design/svelte/ui/date-picker";
</script>

<div class="flex flex-wrap items-start gap-4">
  <DatePicker>
    {#snippet panel(defaultPanel, state)}<div>
        <p class="p-2 text-sm">自定义面板容器</p>
        {@render defaultPanel()}
      </div>{/snippet}
  </DatePicker>
</div>
