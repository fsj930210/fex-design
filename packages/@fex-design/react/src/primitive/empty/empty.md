# React Primitive Empty

Styled empty-state regions for composing media, title, description, and content.

## Import

    import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@fex-design/react/primitive/empty'

## Components

`Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, and `EmptyContent` inherit native `div`; `EmptyDescription` inherits native `p`. Native attributes, events, class, style, ARIA attributes, and children pass through.

## Examples

`basic`, `content`, `image`, and `direction` are shared visually with UI Empty.

## API

The family adds no state props. Compose the regions directly and style each native host independently.

## Accessibility

Add `role="status"` and `aria-live="polite"` only when a dynamically updated empty state should be announced.
