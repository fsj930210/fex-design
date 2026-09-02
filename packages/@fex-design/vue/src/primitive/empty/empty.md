# Vue Primitive Empty

Styled empty-state regions expressed as Vue SFC components.

## Import

    import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@fex-design/vue/primitive/empty'

## Components and API

Each region accepts its native attributes through attrs and renders its default slot. `EmptyDescription` uses `p`; the other layout regions use `div`.

## Examples

`basic`, `content`, `image`, and `direction` match UI Empty visually.

## Accessibility

Use native ARIA attrs on `Empty` when dynamic updates require announcement.

