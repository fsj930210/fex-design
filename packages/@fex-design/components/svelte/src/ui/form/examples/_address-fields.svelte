<script lang="ts">
  import { FormField, FormGroup } from "@fex-design/svelte/ui/form";
  import { Input } from "@fex-design/svelte/ui/input";
  let {
    prefix,
    legend: title,
  }: { prefix: "shipping" | "billing"; legend: string } = $props();
  const requiredText = ({ value }: { value: unknown }) =>
    String(value).trim() ? undefined : "请填写地址信息";
</script>

<FormGroup class="rounded-lg bg-muted-background p-4">
  {#snippet legend()}<span>{title}</span>{/snippet}
  <p class="text-xs font-mono text-muted-foreground">字段前缀：{prefix}</p>
  <FormField
    name={`${prefix}.city`}
    label="城市"
    required
    validators={{ onChange: requiredText }}
    >{#snippet children(field)}<Input
        value={field.state.value}
        oninput={(event) => field.handleChange(event.currentTarget.value)}
        onblur={() => field.handleBlur()}
      />{/snippet}</FormField
  >
  <FormField
    name={`${prefix}.street`}
    label="街道地址"
    required
    validators={{ onChange: requiredText }}
    >{#snippet children(field)}<Input
        value={field.state.value}
        oninput={(event) => field.handleChange(event.currentTarget.value)}
        onblur={() => field.handleBlur()}
      />{/snippet}</FormField
  >
</FormGroup>
