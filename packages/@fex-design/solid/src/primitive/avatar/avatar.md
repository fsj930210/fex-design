# Solid Avatar Primitive

Composable Avatar primitives. Primitive owns image state, fallback, badge, group layout, and the count node; automatic truncation belongs to UI AvatarGroup.

## Import

    import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@fex-design/solid/primitive/avatar'

## Components

| Component        | Element | Purpose                                                                                                                         |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Avatar           | span    | Inherits the native span; all native attributes and events pass through. Root avatar with size and shape.                       |
| AvatarImage      | img     | Inherits the native img; all native attributes and events pass through. Image shown after loading succeeds.                     |
| AvatarFallback   | span    | Inherits the native span; all native attributes and events pass through. Fallback content when the image is unavailable.        |
| AvatarBadge      | span    | Inherits the native span; all native attributes and events pass through. Status or icon node at the bottom end.                 |
| AvatarGroup      | div     | Inherits the native div; all native attributes and events pass through. Overlapping avatar layout without automatic truncation. |
| AvatarGroupCount | span    | Inherits the native span; all native attributes and events pass through. Count or custom overflow node.                         |

## Examples

Examples live in `examples/<name>` and are used by the documentation preview.

## Avatar API

| Name  | Type                 | Default  | Description   |
| ----- | -------------------- | -------- | ------------- |
| size  | 'sm' \| 'md' \| 'lg' | 'md'     | Avatar size.  |
| shape | 'circle' \| 'square' | 'circle' | Avatar shape. |

## AvatarImage API

| Name   | Type   | Default | Description               |
| ------ | ------ | ------- | ------------------------- |
| src    | string | —       | Image URL.                |
| alt    | string | ''      | Alternative text.         |
| srcSet | string | —       | Responsive image sources. |

## Composition boundary

Primitive `AvatarGroup` only owns layout. Use UI `AvatarGroup` for automatic `maxCount` truncation.

Components pass through the corresponding JSX HTML attributes and events; use `ref` for element access.
