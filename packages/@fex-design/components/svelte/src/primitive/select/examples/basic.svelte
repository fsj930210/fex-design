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

<SelectRoot {options} defaultValue="react"
  ><SelectTrigger class="w-72" placeholder="请选择框架" /><SelectContent
  /></SelectRoot
>
