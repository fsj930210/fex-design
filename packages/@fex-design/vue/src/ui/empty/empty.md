# Vue UI Empty

Convenience Empty with string props and Vue-native slots.

## Import

    import { Empty } from '@fex-design/vue/ui/empty'

## API

Props: `image?: string | null`, `title?: string`, `description?: string`, `classNames?: EmptyClassNames`, and `styles?: EmptyStyles`.

Slots: `image`, `title`, `description`, and `default`. Named slots override the corresponding simple prop; the default slot renders in EmptyContent.

`basic`, `content`, `image`, and `direction` match Primitive output. `styling` demonstrates structured styles.

