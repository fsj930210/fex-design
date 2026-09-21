<script lang="ts">
  import SearchIcon from "@fex-design/svelte/icons/search";
  import { InputSearch } from "@fex-design/svelte/ui/input";

  let result = $state("尚未搜索");
  const searched = (value: string, meta: { source: string }) =>
    (result = `${meta.source}: ${value}`);
</script>

{#snippet searchIcon()}<SearchIcon />{/snippet}
{#snippet before()}站内{/snippet}
{#snippet after()}搜索{/snippet}

<div class="grid w-full gap-3">
  <InputSearch defaultValue="组件库" clearable onSearch={searched} />
  <InputSearch loading defaultValue="加载中" />
  <InputSearch
    addonAfter={null}
    placeholder="仅按 Enter 搜索"
    onSearch={searched}
  />
  <InputSearch
    prefix={searchIcon}
    addonAfter={null}
    placeholder="前置搜索图标"
    onSearch={searched}
  />
  <InputSearch
    addonBefore={before}
    addonAfter={after}
    placeholder="双侧搜索按钮"
    onSearch={searched}
  />
  <p class="text-sm text-muted-foreground">{result}</p>
</div>
