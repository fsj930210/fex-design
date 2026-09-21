<script lang="ts">
  import {
    Radio,
    RadioButton,
    RadioGroup,
    type RadioValue,
  } from "@fex-design/svelte/primitive/radio";
  import { Button } from "@fex-design/svelte/primitive/button";
  let value = $state<RadioValue>("pear");
</script>

<div class="grid gap-3">
  <div class="flex gap-2">
    <Button size="sm" onclick={() => (value = "apple")}>选择苹果</Button><Button
      size="sm"
      onclick={() => (value = "pear")}>选择梨</Button
    >
  </div>
  <RadioGroup
    {value}
    onValueChange={(next) => (value = next)}
    orientation="horizontal"
    ><label class="inline-flex items-center gap-2"
      ><Radio value="apple" />苹果</label
    ><label class="inline-flex items-center gap-2"
      ><Radio value="pear" />梨</label
    ></RadioGroup
  ><RadioGroup defaultValue="apple" orientation="horizontal"
    ><label class="inline-flex items-center gap-2"
      ><Radio value="apple" />非受控：苹果</label
    ><label class="inline-flex items-center gap-2"
      ><Radio value="pear" />非受控：梨</label
    ></RadioGroup
  >
</div>
<RadioGroup
  {value}
  onValueChange={(next) => (value = next)}
  orientation="horizontal"
  class="gap-0"
  ><RadioButton value="apple">苹果按钮</RadioButton><RadioButton value="pear"
    >梨按钮</RadioButton
  ></RadioGroup
>
