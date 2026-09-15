<script lang="ts">
  import { RadioButtonGroup } from "@fex-design/svelte/ui/radio";
</script>

<RadioButtonGroup
  defaultValue="apple"
  orientation="horizontal"
  options={[
    { label: "苹果", value: "apple" },
    { label: "梨", value: "pear" },
  ]}
/>
