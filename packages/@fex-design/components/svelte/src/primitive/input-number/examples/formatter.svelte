<script lang="ts">
  import {
    InputNumberActions as A,
    InputNumberClear as CL,
    InputNumberControl as C,
    InputNumberDecrement as D,
    InputNumberIncrement as I,
    InputNumberRoot as P,
  } from "@fex-design/svelte/primitive/input-number";
  import { InputPrefix, InputSuffix } from "@fex-design/svelte/primitive/input";
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
  <P defaultValue={1000} {formatter} {parser}><C /><A><I /><D /></A></P>
</div>
