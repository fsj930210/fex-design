<script lang="ts">
  import { Radio, RadioButton, RadioGroup } from "@fex-design/svelte/ui/radio";
</script>

<RadioGroup defaultValue="apple"
  ><Radio
    value="apple"
    classNames={{
      root: "gap-3",
      control: "ring-2 ring-orange-300 [--radio-checked-color:var(--success)]",
      label: "font-bold text-violet-700",
    }}>苹果</Radio
  ></RadioGroup
>
<RadioGroup defaultValue="apple" orientation="horizontal" class="gap-0"
  ><RadioButton
    value="apple"
    class="[--radio-button-checked-background:var(--success)]"
    >苹果按钮</RadioButton
  ><RadioButton value="pear">梨按钮</RadioButton></RadioGroup
>
