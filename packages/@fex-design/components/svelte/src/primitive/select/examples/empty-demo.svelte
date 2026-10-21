<script lang="ts">
  import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
  } from "@fex-design/svelte/primitive/select";
  const options = [];
</script>

<SelectRoot {options}
  ><SelectTrigger class="w-72" /><SelectContent
    emptyText="暂无匹配数据"
  /></SelectRoot
>
