<script
  lang="ts"
  generics="TData = Record<string, unknown>, TName extends DeepKeys<TData> = DeepKeys<TData>"
>
  import type { Snippet } from "svelte";
  import type { DeepKeys } from "@tanstack/svelte-form";
  import { createFormFieldAssociation } from "@fex-design/core/form/field-association";
  import type { FormFieldOptions, FormFieldApi } from "./form-types";
  import { getRoot } from "./context";
  import { formFieldClassName } from "@fex-design/components-styles/form";
  import FieldContext from "./form-field-context.svelte";
  let {
    name,
    class: className,
    style,
    children,
    ...options
  }: FormFieldOptions<TData, TName> & {
    children?: Snippet<[FormFieldApi<TData, TName>]>;
    class?: string;
    style?: string;
  } = $props();
  const root = getRoot();
  const id = $props.id();
  const association = createFormFieldAssociation(`control-${id}`);
</script>

<!-- A TanStack field owns one path; replace its lifecycle when that path changes. -->
{#key name}
  <root.form.Field {...options} {name}>
    {#snippet children(field)}
      <FieldContext {field} {association}>
        <div
          data-slot="form-field"
          class={className
            ? `${formFieldClassName} ${className}`
            : formFieldClassName}
          {style}
        >
          {@render children?.(field as FormFieldApi<TData, TName>)}
        </div>
      </FieldContext>
    {/snippet}
  </root.form.Field>
{/key}
