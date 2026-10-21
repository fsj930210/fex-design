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
  const inputProps = {
    classNames: {
      root: "rounded-xl",
      control: "font-semibold",
      suffix: "text-violet-600",
    },
    styles: { root: "border-color:#8b5cf6", control: "letter-spacing:0.04em" },
  };
  const valueProps = {
    tagProps: { color: "#7c3aed", class: "rounded-md font-semibold" },
    overflowTagProps: { color: "#0891b2", class: "rounded-md font-semibold" },
    tagActionProps: { class: "rounded-sm text-violet-700 hover:bg-violet-200" },
  };
  const triggerProps = {
    class: "border-violet-300 bg-white text-violet-800 rounded-md",
  };
  const contentProps = {
    class:
      "border-violet-300 bg-white text-violet-800 [--primary:#6d28d9] [--muted-background:#f5f3ff]",
  };
</script>

<div class="grid w-full gap-4">
  <SelectRoot {options} defaultValue="react"
    ><SelectTrigger
      {...triggerProps}
      class="w-72 max-w-full border-violet-300 bg-white text-violet-800 rounded-md"
      {inputProps}
      placeholder="请选择框架"
    /><SelectContent {...contentProps} /></SelectRoot
  ><SelectRoot {options} multiple defaultValue={["react", "vue"]}
    ><SelectTrigger
      {...triggerProps}
      class="w-72 max-w-full border-violet-300 bg-white text-violet-800 rounded-md"
      {inputProps}
      {valueProps}
      maxTagCount={1}
    /><SelectContent {...contentProps} /></SelectRoot
  >
</div>
