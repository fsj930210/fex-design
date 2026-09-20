<script lang="ts">
  import { defaultSelectFilterOption } from "@fex-design/core/select/filter-options";
  import { frameworkOptions } from "./data";
  import Demo from "./simple-demo.svelte";
</script>

<Demo
  title="Local search"
  description="filterOption filters locally and search receives every keyword."
  items={frameworkOptions}
  showSearch
  filterOption={defaultSelectFilterOption}
/>
