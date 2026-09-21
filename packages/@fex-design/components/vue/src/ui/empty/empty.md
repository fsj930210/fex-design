# Vue UI Empty

Convenience Empty with string props and Vue-native slots.

## Import

    import { Empty } from '@fex-design/vue/ui/empty'

## Examples

`basic`, `content`, `image`, and `direction` match Primitive output. `styling` demonstrates structured styles.

## Empty API

Props: `image?: string | null`, `title?: string`, `description?: string`, `classNames?: EmptyClassNames`, and `styles?: EmptyStyles`.

Slots: `image`, `title`, `description`, and `default`. Named slots override the corresponding simple prop; the default slot renders in EmptyContent.

## Structured styles

`classNames` and `styles` customize root, header, image, title, description, and content. Empty defines no component-specific CSS variables.

## Direction

Native `dir` controls inherited LTR and RTL layout.

## Accessibility

Add live-region semantics only for dynamic announcements; controls in the default slot keep native accessibility behavior.
