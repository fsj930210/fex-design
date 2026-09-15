<script lang="ts">
  import { Checkbox, CheckboxGroup } from "@fex-design/svelte/ui/checkbox";
</script>

<Checkbox
  defaultChecked
  classNames={{
    root: "gap-3",
    control: "ring-2 ring-orange-300",
    indicator: "drop-shadow-sm",
    label: "font-bold",
  }}
  styles={{
    control: "background-color:#ea580c;border-color:#c2410c",
    indicator: "color:#ffffff",
    label: "color:#6d28d9",
  }}>结构化样式</Checkbox
>
