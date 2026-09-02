<script lang="ts">
  import type { EmptyClassNames, EmptyStyles as EmptyStylesBase } from '@fex-design/core/empty/types'
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import PrimitiveEmpty from '../../primitive/empty/empty.svelte'
  import EmptyContent from '../../primitive/empty/empty-content.svelte'
  import EmptyDescription from '../../primitive/empty/empty-description.svelte'
  import EmptyHeader from '../../primitive/empty/empty-header.svelte'
  import EmptyMedia from '../../primitive/empty/empty-media.svelte'
  import EmptyTitle from '../../primitive/empty/empty-title.svelte'
  import DefaultEmptyImage from './default-empty-image.svelte'

  export type EmptyStyles = EmptyStylesBase<HTMLAttributes<HTMLDivElement>['style']>
  export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    image?: Snippet | string | null
    title?: Snippet | string
    description?: Snippet | string
    classNames?: EmptyClassNames
    styles?: EmptyStyles
    children?: Snippet
  }

  let { image, title, description, class: className, style, classNames, styles, children, ...rest }: EmptyProps = $props()
  const rootProps = $derived({
    ...(className || classNames?.root ? { class: `${className ?? ''} ${classNames?.root ?? ''}` } : {}),
    ...(style || styles?.root ? { style: [style, styles?.root] } : {}),
  })
</script>

<PrimitiveEmpty {...rest} {...rootProps}>
  {#if image !== null || title || description}
    <EmptyHeader class={classNames?.header} style={styles?.header}>
      {#if image !== null}
        <EmptyMedia class={classNames?.image} style={styles?.image}>
          {#if typeof image === 'function'}
            {@render image()}
          {:else if typeof image === 'string'}
            <img src={image} alt="" />
          {:else}
            <DefaultEmptyImage />
          {/if}
        </EmptyMedia>
      {/if}
      {#if title}
        <EmptyTitle class={classNames?.title} style={styles?.title}>
          {#if typeof title === 'function'}{@render title()}{:else}{title}{/if}
        </EmptyTitle>
      {/if}
      {#if description}
        <EmptyDescription class={classNames?.description} style={styles?.description}>
          {#if typeof description === 'function'}{@render description()}{:else}{description}{/if}
        </EmptyDescription>
      {/if}
    </EmptyHeader>
  {/if}
  {#if children}
    <EmptyContent class={classNames?.content} style={styles?.content}>{@render children()}</EmptyContent>
  {/if}
</PrimitiveEmpty>
