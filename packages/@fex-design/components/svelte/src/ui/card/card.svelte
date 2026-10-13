<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    CardClassNames as CardClassNamesBase,
    CardOptions,
    CardStyles as CardStylesBase,
  } from "@fex-design/core/card/types";
  import { cn } from "@fex-design/utils";
  import PrimitiveCard from '@fex-design/svelte/primitive/card/card.svelte';
  import CardContent from '@fex-design/svelte/primitive/card/card-content.svelte';
  import CardDescription from '@fex-design/svelte/primitive/card/card-description.svelte';
  import CardExtra from '@fex-design/svelte/primitive/card/card-extra.svelte';
  import CardFooter from '@fex-design/svelte/primitive/card/card-footer.svelte';
  import CardHeader from '@fex-design/svelte/primitive/card/card-header.svelte';
  import CardTitle from '@fex-design/svelte/primitive/card/card-title.svelte';

  export type CardClassNames = CardClassNamesBase;
  export type CardStyles = CardStylesBase<
    HTMLAttributes<HTMLDivElement>["style"]
  >;

  interface CardProps
    extends
      Omit<HTMLAttributes<HTMLDivElement>, "title">,
      CardOptions<Snippet | string, HTMLAttributes<HTMLDivElement>["style"]> {
    children?: Snippet;
  }

  let {
    title,
    description,
    extra,
    footer,
    header,
    class: className,
    style,
    classNames,
    styles,
    children,
    ...rest
  }: CardProps = $props();
</script>

<PrimitiveCard
  {...rest}
  class={cn(className, classNames?.root)}
  style={[style, styles?.root].filter(Boolean).join(";")}
>
  {#if header}
    {#if typeof header === "function"}{@render header()}{:else}{header}{/if}
  {:else if title || description || extra}
    <CardHeader class={classNames?.header} style={styles?.header}>
      {#if title}
        <CardTitle class={classNames?.title} style={styles?.title}>
          {#if typeof title === "function"}
            {@render title()}
          {:else}
            {title}
          {/if}
        </CardTitle>
      {/if}
      {#if extra}
        <CardExtra class={classNames?.extra} style={styles?.extra}>
          {#if typeof extra === "function"}{@render extra()}{:else}{extra}{/if}
        </CardExtra>
      {/if}
      {#if description}
        <CardDescription
          class={classNames?.description}
          style={styles?.description}
        >
          {#if typeof description === "function"}
            {@render description()}
          {:else}
            {description}
          {/if}
        </CardDescription>
      {/if}
    </CardHeader>
  {/if}
  <CardContent class={classNames?.content} style={styles?.content}>
    {@render children?.()}
  </CardContent>
  {#if footer}
    <CardFooter class={classNames?.footer} style={styles?.footer}>
      {#if typeof footer === "function"}
        {@render footer()}
      {:else}
        {footer}
      {/if}
    </CardFooter>
  {/if}
</PrimitiveCard>
