<script lang="ts" module>
  export interface PhoneValue {
    countryCode: "+86" | "+852";
    number: string;
  }
</script>

<script lang="ts">
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  import { Button } from "@fex-design/svelte/primitive/button";
  let {
    value,
    onChange,
    onBlur,
  }: {
    value: PhoneValue;
    onChange: (value: PhoneValue) => void;
    onBlur: () => void;
  } = $props();
</script>

<div class="grid grid-cols-[auto_1fr] items-center gap-2">
  <Button
    type="button"
    aria-label="切换区号"
    onclick={() =>
      onChange({
        countryCode: value.countryCode === "+86" ? "+852" : "+86",
        number: "",
      })}>{value.countryCode}</Button
  >
  <InputRoot
    value={value.number}
    onChange={(number) => onChange({ ...value, number })}
    ><InputControl onblur={onBlur} placeholder="请输入号码" /></InputRoot
  >
</div>
