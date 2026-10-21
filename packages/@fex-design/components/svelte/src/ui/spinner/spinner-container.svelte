<script lang="ts">
  import type {
    SpinnerContainerOptions,
    SpinnerOptions,
    SpinnerStyles,
  } from "@fex-design/core/spinner/types";
  import { spinnerContainerClassName } from "@fex-design/components-styles/spinner";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import {
    Spinner,
    SpinnerContainer as PrimitiveSpinnerContainer,
    SpinnerOverlay,
    SpinnerText,
  } from "@fex-design/svelte/primitive/spinner";
  let {
    class: className,
    style,
    spinning,
    text,
    indicator,
    size,
    classNames,
    styles,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> &
    Omit<SpinnerContainerOptions<Snippet, string>, "text"> &
    SpinnerOptions & {
      text?: string;
      children?: Snippet;
      styles?: SpinnerStyles<string>;
    } = $props();
</script>

{#if spinning === undefined}
  <Spinner
    {...rest}
    {size}
    class={cn(className, classNames?.spinner)}
    style={[style, styles?.spinner].filter(Boolean).join(";")}
    children={indicator}
  />
{:else}
  <PrimitiveSpinnerContainer
    {...rest}
    aria-busy={spinning}
    class={cn(spinnerContainerClassName, className, classNames?.root)}
    style={[style, styles?.root].filter(Boolean).join(";")}
  >
    {@render children?.()}
    {#if spinning}<SpinnerOverlay
        class={cn(classNames?.overlay, text && "flex-col")}
        style={styles?.overlay}
        ><Spinner
          {size}
          class={classNames?.spinner}
          style={styles?.spinner}
          children={indicator}
        />{#if text}<SpinnerText class={classNames?.text} style={styles?.text}
            >{text}</SpinnerText
          >{/if}</SpinnerOverlay
      >{/if}
  </PrimitiveSpinnerContainer>
{/if}
