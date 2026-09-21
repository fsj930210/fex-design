<script lang="ts">
  import InputNumber from "@fex-design/svelte/ui/input-number";
  const formatter = (value: number | undefined) =>
    value === undefined ? "" : `￥${value.toLocaleString("zh-CN")}`;
  const parser = (text: string) => {
    const normalized = text.replace(/[￥,\s]/g, "");
    if (normalized === "") return undefined;
    const value = Number(normalized);
    return Number.isFinite(value) ? value : undefined;
  };
</script>

<div class="grid w-full gap-2">
  <p>金额格式化展示与 number 值分离</p>
  <InputNumber defaultValue={1000} {formatter} {parser} />
</div>
