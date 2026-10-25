<script lang="ts">
  import {
    Radio,
    RadioButton,
    RadioGroup,
  } from "@fex-design/svelte/primitive/radio";
</script>

<div class="grid gap-3">
  <RadioGroup defaultValue="custom"
    ><div
      class="inline-grid min-w-0 grid-cols-[auto_1fr] items-center gap-2 align-middle"
    >
      <Radio
        id="radio-css-custom"
        value="custom"
        class="[--radio-size:1.5rem] [--radio-checked-color:var(--success)]"
      /><label
        for="radio-css-custom"
        class="min-w-0 cursor-pointer select-none text-sm">自定义</label
      >
    </div></RadioGroup
  ><RadioGroup defaultValue="button" class="gap-0"
    ><RadioButton
      value="button"
      class="[--radio-button-checked-background:var(--success)]"
      >自定义按钮</RadioButton
    ></RadioGroup
  >
</div>
