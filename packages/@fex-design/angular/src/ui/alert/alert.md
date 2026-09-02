# Alert

UI Alert packages Primitive Alert into one signal-first Angular component with circle status icons and close behavior.

## Import
```ts
import { Alert, AlertActionContent, AlertCloseIconContent, AlertIconContent, AlertTitleContent } from '@fex-design/angular/ui/alert'
```

## Examples
Examples are ordered as basic, types/custom color, variants, closable, looping announcement, custom icon/action, LTR/RTL, and semantic styles.

## Inputs, output, and projection
The `alert` host accepts signal inputs `type`, `variant`, `title`, `description`, `showIcon`, `closable`, `classNames`, and `styles`. Project `[alertIcon]`, `[alertTitle]`, default content, `[alertAction]`, or `[alertCloseIcon]` for richer content. The `close` output fires before hiding; call `preventDefault()` on the event to keep the alert visible.

## Accessibility
Built-in icons are decorative. The close control is a native button with an accessible name. The looping announcement pauses on hover/focus and respects reduced motion.
