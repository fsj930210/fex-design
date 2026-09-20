<script lang="ts">
  import type {
    SelectFilterOption,
    SelectOption,
    SelectVirtualOptions,
  } from "@fex-design/core/select/types";
  import type { SelectionValue } from "@fex-design/core/selection/types";
  import SelectRoot from "@fex-design/svelte/primitive/select";
  import SelectContent from "@fex-design/svelte/primitive/select-content";
  import SelectTrigger from "@fex-design/svelte/primitive/select-trigger";
  import Demo from "./demo-section.svelte";
  let {
    title,
    description,
    items,
    multiple = false,
    clearable = false,
    showSearch = false,
    defaultValue,
    filterOption,
    maxCount,
    maxTagCount,
    virtual,
    placeholder = "请选择",
  }: {
    title: string;
    description: string;
    items: readonly SelectOption[];
    multiple?: boolean;
    clearable?: boolean;
    showSearch?: boolean;
    defaultValue?: SelectionValue | SelectionValue[];
    filterOption?: SelectFilterOption;
    maxCount?: number;
    maxTagCount?: number;
    virtual?: SelectVirtualOptions;
    placeholder?: string;
  } = $props();
</script>

<Demo {title} {description}
  ><SelectRoot
    {items}
    {multiple}
    {clearable}
    {showSearch}
    {defaultValue}
    {filterOption}
    {maxCount}
    {virtual}
    ><SelectTrigger {placeholder} {maxTagCount} /><SelectContent /></SelectRoot
  ></Demo
>
