<script lang="ts">
  import type { ComponentProps, Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import type {
    CardClassNames as CardClassNamesBase,
    CardOptions,
    CardStyles as CardStylesBase,
  } from "@fex-design/core/card/types";
  import { cn } from "@fex-design/utils";
  import PrimitiveCard from "@fex-design/svelte/primitive/card/card.svelte";
  import CardContent from "@fex-design/svelte/primitive/card/card-content.svelte";
  import CardDescription from "@fex-design/svelte/primitive/card/card-description.svelte";
  import CardExtra from "@fex-design/svelte/primitive/card/card-extra.svelte";
  import CardFooter from "@fex-design/svelte/primitive/card/card-footer.svelte";
  import CardHeader from "@fex-design/svelte/primitive/card/card-header.svelte";
  import CardTitle from "@fex-design/svelte/primitive/card/card-title.svelte";

  export type CardClassNames = CardClassNamesBase;
  export type CardStyles = CardStylesBase<
    HTMLAttributes<HTMLDivElement>["style"]
  >;

  interface CardProps
    extends
      Omit<HTMLAttributes<HTMLDivElement>, "title">,
      CardOptions<Snippet | string, HTMLAttributes<HTMLDivElement>["style"]> {
    headerProps?:
      Omit<ComponentProps<typeof CardHeader>, "children"> | undefined;
    titleProps?: Omit<ComponentProps<typeof CardTitle>, "children"> | undefined;
    descriptionProps?:
      Omit<ComponentProps<typeof CardDescription>, "children"> | undefined;
    extraProps?: Omit<ComponentProps<typeof CardExtra>, "children"> | undefined;
    contentProps?:
      Omit<ComponentProps<typeof CardContent>, "children"> | undefined;
    footerProps?:
      Omit<ComponentProps<typeof CardFooter>, "children"> | undefined;
    children?: Snippet;
  }

  let {
    headerProps,
    titleProps,
    descriptionProps,
    extraProps,
    contentProps,
    footerProps,
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
    <CardHeader
      {...headerProps}
      class={cn(classNames?.header, headerProps?.class)}
      style={[styles?.header, headerProps?.style].filter(Boolean).join(";")}
    >
      {#if title}
        <CardTitle
          {...titleProps}
          class={cn(classNames?.title, titleProps?.class)}
          style={[styles?.title, titleProps?.style].filter(Boolean).join(";")}
        >
          {#if typeof title === "function"}
            {@render title()}
          {:else}
            {title}
          {/if}
        </CardTitle>
      {/if}
      {#if extra}
        <CardExtra
          {...extraProps}
          class={cn(classNames?.extra, extraProps?.class)}
          style={[styles?.extra, extraProps?.style].filter(Boolean).join(";")}
        >
          {#if typeof extra === "function"}{@render extra()}{:else}{extra}{/if}
        </CardExtra>
      {/if}
      {#if description}
        <CardDescription
          {...descriptionProps}
          class={cn(classNames?.description, descriptionProps?.class)}
          style={[styles?.description, descriptionProps?.style]
            .filter(Boolean)
            .join(";")}
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
  <CardContent
    {...contentProps}
    class={cn(classNames?.content, contentProps?.class)}
    style={[styles?.content, contentProps?.style].filter(Boolean).join(";")}
  >
    {@render children?.()}
  </CardContent>
  {#if footer}
    <CardFooter
      {...footerProps}
      class={cn(classNames?.footer, footerProps?.class)}
      style={[styles?.footer, footerProps?.style].filter(Boolean).join(";")}
    >
      {#if typeof footer === "function"}
        {@render footer()}
      {:else}
        {footer}
      {/if}
    </CardFooter>
  {/if}
</PrimitiveCard>
