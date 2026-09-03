# Angular UI Skeleton

Provides the structured `Skeleton` composition and directly re-exports every Primitive from the same entry. Re-exported primitives have exactly the same behavior and styling as the Primitive entry.

## Import

    import { Skeleton, SkeletonAvatar, SkeletonBlock, SkeletonButton, SkeletonImage, SkeletonInput, SkeletonPlaceholder, SkeletonText } from '@fex-design/angular/ui/skeleton'

## Components

| Component | Purpose |
| --- | --- |
| Skeleton | Generates an avatar, title, and paragraph structure and can act as a loading container. |
| SkeletonText | Re-exported one-row text Primitive. |
| SkeletonAvatar | Re-exported avatar Primitive. |
| SkeletonButton | Re-exported button Primitive. |
| SkeletonInput | Re-exported input Primitive. |
| SkeletonBlock | Re-exported free-size block Primitive. |
| SkeletonImage | Re-exported image-region Primitive. |
| SkeletonPlaceholder | Directive that marks a custom skeleton `ng-template`. |

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name | Covers |
| --- | --- |
| basic | Six Primitive components re-exported by the UI entry. |
| list | Avatar and multi-line text list. |
| table | Headers, cells, and action buttons. |
| image | Horizontal image, title, and body content. |
| form | Labels, inputs, and a submit button. |
| animation | None, pulse, and wave. |
| content | loading switches between the generated skeleton and real content. |
| width | Title width, final paragraph-row width, and per-row widths. |
| styles | classNames/styles customization for four semantic regions. |

## Skeleton API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| loading | boolean | — | `false` renders real content; otherwise renders a custom placeholder or generated skeleton. |
| animation | 'none' \| 'pulse' \| 'wave' | 'none' | Passed to generated avatar, title, and paragraph rows. |
| avatar | boolean \| SkeletonAvatarOptions | false | Generates an avatar; an object configures size, shape, and animation. |
| title | boolean \| SkeletonTitleOptions | true | Generates one title row; an object configures its width. |
| paragraph | boolean \| SkeletonParagraphOptions | true | Generates paragraph rows; an object configures rows and width. |
| round | boolean | false | Uses fully rounded title and paragraph rows. |
| classNames | SkeletonClassNames | — | Classes for root, avatar, title, and paragraph. |
| styles | SkeletonStyles<`string`> | — | Inline styles for root, avatar, title, and paragraph. |
| native attributes | native div bindings | — | Passed to the generated root div; class/style merge with root structured options. |

## SkeletonAvatarOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animation | SkeletonAnimation | inherited | Overrides only the avatar animation. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Avatar size. |
| shape | 'circle' \| 'square' | 'circle' | Avatar shape. |

## SkeletonTitleOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| width | number \| string | 38% | Title width; numbers are pixels. |

## SkeletonParagraphOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| rows | number | 3 | Row count; fractions are floored and negative values become zero. |
| width | number \| string \| Array<number \| string> | — | A scalar targets the final row; an array maps widths by row index; numbers are pixels. |

## Structured styling

`classNames` and `styles` share four semantic regions:

| Region | Target |
| --- | --- |
| root | Generated skeleton root. |
| avatar | Internal SkeletonAvatar. |
| title | Title SkeletonText. |
| paragraph | Every paragraph SkeletonText row. |

The root still accepts native `class` and `style`. Structured options target internal regions without requiring custom skeleton markup.

## Content API

Content projection provides real content; `<ng-template skeletonPlaceholder>` provides a custom skeleton and requires importing `SkeletonPlaceholder`.

Precedence is fixed: `loading === false` renders real content; otherwise a supplied placeholder renders; otherwise Skeleton generates the avatar/title/paragraph structure.

## Primitive re-exports

The six standalone components retain the Primitive API and do not gain a second prop or style model. Import them from the UI entry for a single placeholder; use `Skeleton` for fast structured output.

## Accessibility

Generated skeleton roots and primitives are `aria-hidden`. When `loading === false`, real content renders with its original semantics.

