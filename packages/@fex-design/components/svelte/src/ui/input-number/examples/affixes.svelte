<script lang="ts">
  import InputNumber from "@fex-design/svelte/ui/input-number";
</script>

<div class="grid w-full gap-2">
  <p>Clear、单位与增减操作可以同时存在</p>
  {#snippet prefix()}￥{/snippet}{#snippet suffix()}元{/snippet}<InputNumber
    defaultValue={128}
    clearable
    {prefix}
    {suffix}
  />
</div>
