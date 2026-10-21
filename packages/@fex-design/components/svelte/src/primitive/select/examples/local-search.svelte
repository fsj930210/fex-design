<script lang="ts">
  import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
  } from "@fex-design/svelte/primitive/select";
  const options = [
    { value: "beijing", label: "北京" },
    { value: "shanghai", label: "上海" },
  ];
</script>

<SelectRoot
  {options}
  showSearch
  filterOption={(keyword, option) => option.label.includes(keyword)}
  ><SelectTrigger class="w-72" placeholder="搜索城市" /><SelectContent
  /></SelectRoot
>
