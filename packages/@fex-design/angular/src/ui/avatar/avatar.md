# Angular Avatar UI

Ready-to-use Avatar and AvatarGroup components. UI Avatar composes image and fallback; UI AvatarGroup provides automatic `maxCount` truncation.

## Import

    import { Avatar, AvatarGroup } from '@fex-design/angular/ui/avatar'

## Components

| Component   | Purpose                                       |
| ----------- | --------------------------------------------- |
| Avatar      | Complete image-or-fallback avatar.            |
| AvatarGroup | Groups avatars and renders an overflow count. |

## Avatar API

| Name     | Type                     | Default  | Description                                  |
| -------- | ------------------------ | -------- | -------------------------------------------- |
| src      | string                   | —        | Image URL.                                   |
| alt      | string                   | ''       | Alternative text.                            |
| srcSet   | string                   | —        | Responsive image sources.                    |
| fallback | framework-native content | —        | Content shown when the image is unavailable. |
| size     | 'sm' \| 'md' \| 'lg'     | 'md'     | Avatar size.                                 |
| shape    | 'circle' \| 'square'     | 'circle' | Avatar shape.                                |

## AvatarGroup API

| Name           | Type                     | Default | Description                   |
| -------------- | ------------------------ | ------- | ----------------------------- |
| maxCount       | number                   | —       | Maximum visible avatar count. |
| renderOverflow | framework-native content | —       | Custom overflow node.         |

Use `<span avatar>` for `Avatar` and `<div avatarGroup>` for `AvatarGroup`; `renderOverflow` accepts a `TemplateRef`.

## Examples

Examples live in `examples/<name>` and cover basic avatars, groups, overflow counts, custom overflow icons, sizes, shapes, max count, and direction.
