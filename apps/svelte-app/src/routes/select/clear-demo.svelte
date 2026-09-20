<script lang="ts">
  import { frameworkOptions } from "./data";
  import Demo from "./simple-demo.svelte";
</script>

<Demo
  title="Clear"
  description="Clear and the dropdown indicator share one suffix position."
  items={frameworkOptions}
  clearable
  defaultValue="solid"
/>
