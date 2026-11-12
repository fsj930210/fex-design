<script
  lang="ts"
  generics="TData = Record<string, unknown>, TName extends DeepKeys<TData> = DeepKeys<TData>"
>
  import type { Snippet } from "svelte";
  import { cn } from "@fex-design/utils";
  import type { FormClassNames, FormStyles } from "./form.types";
  import type { DeepKeys } from "@tanstack/svelte-form";
  import type {
    FormFieldOptions,
    FormFieldApi,
  } from "../../primitive/form/form-types";
  import FormFieldPrimitive from "../../primitive/form/form-field.svelte";
  import FormLabel from "../../primitive/form/form-label.svelte";
  import FormDescription from "../../primitive/form/form-description.svelte";
  import FormError from "../../primitive/form/form-error.svelte";
  import FormControl from "../../primitive/form/form-control.svelte";
  let {
    label,
    description,
    error,
    required = false,
    showError = true,
    children,
    class: className,
    style,
    classNames,
    styles,
    ...options
  }: FormFieldOptions<TData, TName> & {
    label?: Snippet | string;
    description?: Snippet | string;
    error?: Snippet<[readonly unknown[]]>;
    required?: boolean;
    showError?: boolean;
    class?: string;
    style?: string;
    classNames?: Pick<
      FormClassNames,
      "field" | "label" | "description" | "error"
    >;
    styles?: Pick<FormStyles, "field" | "label" | "description" | "error">;
    children?: Snippet<[FormFieldApi<TData, TName>]>;
  } = $props();
</script>

<FormFieldPrimitive
  {...options}
  class={cn(classNames?.field, className)}
  style={[styles?.field, style].filter(Boolean).join(";")}
>
  {#snippet children(field: FormFieldApi<TData, TName>)}
    {#if label !== undefined}<FormLabel
        {required}
        class={classNames?.label}
        style={styles?.label}
        >{#if typeof label === "function"}{@render label()}{:else}{label}{/if}</FormLabel
      >{/if}
    <FormControl>
      {@render children?.(field)}
    </FormControl>
    {#if description !== undefined}<FormDescription
        class={classNames?.description}
        style={styles?.description}
        >{#if typeof description === "function"}{@render description()}{:else}{description}{/if}</FormDescription
      >{/if}
    {#if showError}
      {#if error !== undefined}<FormError
          class={classNames?.error}
          style={styles?.error}
          >{#snippet children(errors)}{@render error?.(
              errors,
            )}{/snippet}</FormError
        >
      {:else}<FormError class={classNames?.error} style={styles?.error} />{/if}
    {/if}
  {/snippet}
</FormFieldPrimitive>
