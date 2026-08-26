<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import type {
    CardClassNames as CardClassNamesBase,
    CardOptions,
    CardStyles as CardStylesBase,
  } from '@fex-design/core/card/types'
  import PrimitiveCard from '../../primitive/card/card.svelte'
  import CardContent from '../../primitive/card/card-content.svelte'
  import CardDescription from '../../primitive/card/card-description.svelte'
  import CardExtra from '../../primitive/card/card-extra.svelte'
  import CardFooter from '../../primitive/card/card-footer.svelte'
  import CardHeader from '../../primitive/card/card-header.svelte'
  import CardTitle from '../../primitive/card/card-title.svelte'

  export type CardClassNames = CardClassNamesBase
  export type CardStyles = CardStylesBase<HTMLAttributes<HTMLDivElement>['style']>

  interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    CardOptions<Snippet | string, HTMLAttributes<HTMLDivElement>['style']> {
    children?: Snippet
  }

  let { title, description, extra, footer, header, class: className, style, classNames, styles, children, ...rest }: CardProps = $props()

  const rootProps = $derived({
    ...(className || classNames?.root ? { class: `${className ?? ''} ${classNames?.root ?? ''}` } : {}),
    ...(style || styles?.root ? { style: [style, styles?.root] } : {}),
  })
  const headerProps = $derived({
    ...(classNames?.header ? { class: classNames.header } : {}),
    ...(styles?.header ? { style: styles.header } : {}),
  })
  const titleProps = $derived({
    ...(classNames?.title ? { class: classNames.title } : {}),
    ...(styles?.title ? { style: styles.title } : {}),
  })
  const descriptionProps = $derived({
    ...(classNames?.description ? { class: classNames.description } : {}),
    ...(styles?.description ? { style: styles.description } : {}),
  })
  const contentProps = $derived({
    ...(classNames?.content ? { class: classNames.content } : {}),
    ...(styles?.content ? { style: styles.content } : {}),
  })
  const footerProps = $derived({
    ...(classNames?.footer ? { class: classNames.footer } : {}),
    ...(styles?.footer ? { style: styles.footer } : {}),
  })
  const extraProps = $derived({ ...(classNames?.extra ? { class: classNames.extra } : {}), ...(styles?.extra ? { style: styles.extra } : {}) })
</script>

<PrimitiveCard {...rest} {...rootProps}>
  {#if header}
    {@render header()}
  {:else if title || description || extra}
    <CardHeader {...headerProps}>
      {#if title}
        <CardTitle {...titleProps}>
          {#if typeof title === 'function'}
            {@render title()}
          {:else}
            {title}
          {/if}
        </CardTitle>
      {/if}
      {#if extra}
        <CardExtra {...extraProps}>
          {#if typeof extra === 'function'}{@render extra()}{:else}{extra}{/if}
        </CardExtra>
      {/if}
      {#if description}
        <CardDescription {...descriptionProps}>
          {#if typeof description === 'function'}
            {@render description()}
          {:else}
            {description}
          {/if}
        </CardDescription>
      {/if}
    </CardHeader>
  {/if}
  <CardContent {...contentProps}>
    {@render children?.()}
  </CardContent>
  {#if footer}
    <CardFooter {...footerProps}>
      {#if typeof footer === 'function'}
        {@render footer()}
      {:else}
        {footer}
      {/if}
    </CardFooter>
  {/if}
</PrimitiveCard>
