# Angular UI Empty

Convenience Empty implemented on a native div host.

## Import

    import { Empty } from '@fex-design/angular/ui/empty'

## API

Use `<div empty>`. Inputs are `image: string | TemplateRef | null`, `title: string`, `description: string`, `classNames: EmptyClassNames`, and `styles: EmptyStyles`. Projected content renders in EmptyContent.

An undefined `image` uses the built-in image; `null` hides media. `basic`, `content`, `image`, and `direction` match Primitive output; `styling` is UI-only.

