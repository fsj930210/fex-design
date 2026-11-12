<script lang="ts">
  let { invalid = false } = $props<{ invalid?: boolean }>();
  import { Select } from "@fex-design/svelte/ui/select";
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ];
</script>

<Select
  aria-invalid={invalid}
  class="w-72"
  {options}
  defaultValue="react"
  placeholder="请选择框架"
  clearable
/>
