<script lang="ts">
  import {
    FormField,
    FormGroup,
    FormLegend,
    FormLabel,
    FormControl,
    FormError,
  } from "@fex-design/svelte/primitive/form";
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  let { prefix, legend }: { prefix: "shipping" | "billing"; legend: string } =
    $props();
  const requiredText = ({ value }: { value: unknown }) =>
    String(value).trim() ? undefined : "请填写地址信息";
</script>

<FormGroup class="rounded-lg bg-muted-background p-4">
  <FormLegend>{legend}</FormLegend>
  <p class="text-xs font-mono text-muted-foreground">字段前缀：{prefix}</p>
  <FormField name={`${prefix}.city`} validators={{ onChange: requiredText }}
    >{#snippet children(field)}<FormLabel required>城市</FormLabel><FormControl
        ><InputRoot
          value={field.state.value}
          onChange={(value) => field.handleChange(value)}
          ><InputControl onblur={() => field.handleBlur()} /></InputRoot
        ></FormControl
      ><FormError />{/snippet}</FormField
  >
  <FormField name={`${prefix}.street`} validators={{ onChange: requiredText }}
    >{#snippet children(field)}<FormLabel required>街道地址</FormLabel
      ><FormControl
        ><InputRoot
          value={field.state.value}
          onChange={(value) => field.handleChange(value)}
          ><InputControl onblur={() => field.handleBlur()} /></InputRoot
        ></FormControl
      ><FormError />{/snippet}</FormField
  >
</FormGroup>
