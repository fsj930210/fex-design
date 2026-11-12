<script lang="ts" module>
  export interface PhoneValue {
    countryCode: "+86" | "+852";
    number: string;
  }
</script>

<script lang="ts">
  import { Input } from "@fex-design/svelte/ui/input";
  import { Button } from "@fex-design/svelte/ui/button";
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
  <Input
    value={value.number}
    oninput={(event) =>
      onChange({ ...value, number: event.currentTarget.value })}
    onblur={onBlur}
    placeholder="请输入号码"
  />
</div>
