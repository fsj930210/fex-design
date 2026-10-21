<script lang="ts">
  import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
  } from "@fex-design/svelte/primitive/select";
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ];
</script>

<div class="grid w-full grid-cols-2 gap-4">
  <div dir="ltr">
    <SelectRoot {options}
      ><SelectTrigger placeholder="Select framework" /><SelectContent
      /></SelectRoot
    >
  </div>
  <div dir="rtl">
    <SelectRoot {options}
      ><SelectTrigger placeholder="اختر إطار العمل" /><SelectContent
      /></SelectRoot
    >
  </div>
</div>
