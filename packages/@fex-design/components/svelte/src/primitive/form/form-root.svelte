<script lang="ts">
  import { tick, untrack, type Snippet } from "svelte";
  import type { HTMLFormAttributes } from "svelte/elements";
  import type { AnyFormApi } from "@tanstack/svelte-form";
  import {
    createFormTargets,
    scrollToField,
  } from "@fex-design/core/form/field-targets";
  import type {
    FormLayoutOptions,
    FormScrollToFirstError,
  } from "@fex-design/core/form/types";
  import {
    formRootClassName,
    formLayoutClassName,
    formLayoutStyle,
  } from "@fex-design/components-styles/form";
  import { cn } from "@fex-design/utils";
  import { provideRoot } from "./context";
  let {
    form,
    layout = "vertical",
    labelAlign = "end",
    labelWidth,
    labelGap,
    labelWrap = false,
    style,
    component = "form",
    scrollToFirstError = true,
    children,
    class: className,
    onsubmit,
    onreset,
    ref = $bindable(null),
    ...rest
  }: Omit<HTMLFormAttributes, "form"> &
    FormLayoutOptions & {
      form: AnyFormApi;
      component?: "form" | false;
      scrollToFirstError?: FormScrollToFirstError;
      children?: Snippet;
      ref?: HTMLFormElement | null;
    } = $props();
  // The form instance owns this mounted subtree; reset values rather than replacing the instance.
  const initialForm = untrack(() => form);
  const targets = createFormTargets();
  provideRoot({
    form: initialForm,
    targets,
  });
  async function submit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    onsubmit?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    if (form !== initialForm)
      throw new Error("Remount FormRoot to replace its form instance.");
    await initialForm.handleSubmit();
    if (!scrollToFirstError || initialForm.state.isValid) return;
    await tick();
    scrollToField(
      targets,
      undefined,
      typeof scrollToFirstError === "boolean" ? {} : scrollToFirstError,
    );
  }
</script>

{#if component === false}
  {@render children?.()}
{:else}
  <form
    {...rest}
    bind:this={ref}
    novalidate={rest.novalidate ?? true}
    data-slot="form-root"
    class={cn(formRootClassName, formLayoutClassName, className)}
    style:--form-label-width={formLayoutStyle(labelWidth, labelGap)[
      "--form-label-width"
    ]}
    style:--form-label-gap={formLayoutStyle(labelWidth, labelGap)[
      "--form-label-gap"
    ]}
    {style}
    data-layout={layout}
    data-label-align={labelAlign}
    data-label-wrap={String(labelWrap)}
    onsubmit={submit}
    onreset={(event) => {
      onreset?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      initialForm.reset();
    }}
  >
    {@render children?.()}
  </form>
{/if}
