<script lang="ts">
  import { Select } from "@fex-design/svelte/ui/select";
  import { Checkbox } from "@fex-design/svelte/ui/checkbox";

  import SearchLayout from "./_search-layout.svelte";
  const alignOptions = [
    { value: "start", label: "起始侧对齐" },
    { value: "end", label: "末尾侧对齐" },
  ];
  const widthOptions = [
    { value: "6rem", label: "6rem" },
    { value: "8rem", label: "8rem" },
    { value: "10rem", label: "10rem" },
  ];
  const gapOptions = [
    { value: "0.375rem", label: "紧凑" },
    { value: "0.5rem", label: "默认" },
    { value: "0.75rem", label: "宽松" },
  ];
  let options = $state<{
    labelAlign: "start" | "end";
    labelWidth: string;
    labelGap: string;
    labelWrap: boolean;
  }>({
    labelAlign: "end",
    labelWidth: "8rem",
    labelGap: "0.5rem",
    labelWrap: true,
  });
</script>

<section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">表单布局与标签对齐</h3>
    <p class="text-sm text-muted-foreground">
      使用长短不同的标签比较布局。调整配置后直接提交，观察标签、控件、说明、错误和按钮的对齐。
    </p>
  </header>
  <div
    class="grid gap-3 rounded-md bg-muted-background p-3 text-sm sm:grid-cols-3"
  >
    <div class="grid gap-1">
      <span>标签对齐</span><Select
        value={options.labelAlign}
        options={alignOptions}
        inputProps={{ "aria-label": "标签对齐" }}
        onChange={(value) =>
          (options.labelAlign = value === "start" ? "start" : "end")}
      />
    </div>
    <div class="grid gap-1">
      <span>标签列宽</span><Select
        value={options.labelWidth}
        options={widthOptions}
        inputProps={{ "aria-label": "标签列宽" }}
        onChange={(value) => (options.labelWidth = String(value))}
      />
    </div>
    <div class="grid gap-1">
      <span>标签间距</span><Select
        value={options.labelGap}
        options={gapOptions}
        inputProps={{ "aria-label": "标签间距" }}
        onChange={(value) => (options.labelGap = String(value))}
      />
    </div>
    <Checkbox
      class="sm:col-span-3"
      checked={options.labelWrap}
      onchange={(event) => (options.labelWrap = event.currentTarget.checked)}
      >标签换行</Checkbox
    >
  </div>
  <SearchLayout layout="vertical" {options} />
  <SearchLayout layout="horizontal" {options} />
  <SearchLayout layout="inline" {options} />
</section>
