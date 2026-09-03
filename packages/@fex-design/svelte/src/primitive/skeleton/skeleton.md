# Svelte Primitive Skeleton

Styled, independently composable Skeleton placeholders. Every component uses a native `div` host.

## Import

    import { SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonText } from '@fex-design/svelte/primitive/skeleton'

## Components

| Component | Element | Purpose |
| --- | --- | --- |
| SkeletonText | div | One text row; compose multiple SkeletonText components for multiple lines. |
| SkeletonAvatar | div | Circular or square avatar placeholder aligned with Avatar sizes. |
| SkeletonButton | div | Default, rounded, square, or circular placeholder aligned with Button heights. |
| SkeletonInput | div | Input placeholder aligned with the default Input height. |
| SkeletonBlock | div | Generic block with dimensions supplied through class or style. |
| SkeletonImage | div | Image-region placeholder with a built-in image icon and overridable dimensions. |

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name | Covers |
| --- | --- |
| basic | Default forms of all six primitives, avatar shapes, and button shapes. |
| list | List skeleton composed from avatars and text rows. |
| table | Table skeleton composed from headers, cells, and action buttons. |
| image | Media skeleton composed from an image, title, and body text. |
| form | Form skeleton composed from labels, inputs, and a submit button. |
| animation | None, pulse, and wave modes. |

## Shared API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animation | 'none' \| 'pulse' \| 'wave' | 'none' | Placeholder animation: static, pulse, or wave. |
| native attributes | `HTMLAttributes<HTMLDivElement>` | — | Native div attributes and events pass through, including `class`, `style`, `data-*`, and `aria-*`. |
| element access | framework-native API | — | `bind:ref` exposes the native `HTMLDivElement`. |

## SkeletonText API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | Placeholder animation. |
| round | boolean | false | Uses fully rounded ends; the component always represents exactly one row. |

## SkeletonAvatar API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | Placeholder animation. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Matches the three Avatar sizes; class/style can override dimensions. |
| shape | 'circle' \| 'square' | 'circle' | Circular or softly rounded square avatar. |

## SkeletonButton API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | Placeholder animation. |
| size | 'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' | 'default' | Matches the five Button heights. |
| shape | 'round' \| 'square' \| 'circle' | — | Omit for a rectangle; round is a pill, square and circle are equal-width shapes. |
| block | boolean | false | Fills the parent width. |

## SkeletonInput API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | Placeholder animation. |
| block | boolean | false | Fills the parent width; the default width is 16rem. |

## SkeletonBlock API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | Placeholder animation. |
| width / height | class or style | — | No dedicated dimension props; use native class/style. |

## SkeletonImage API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | 'none' | Placeholder animation. |
| width / height | class or style | 6rem × 6rem | Override the default image-region dimensions through native class/style. |

## Accessibility

Every placeholder is non-interactive and has `aria-hidden="true"`. Placeholders preserve loading layout and do not replace the semantics or accessible names of real content.

