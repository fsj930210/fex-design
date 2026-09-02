# Alert

UI Alert combines the Primitive parts into one Vue component with built-in status icons and close behavior.

## Import
```ts
import { Alert } from '@fex-design/vue/ui/alert'
```

## Examples
Examples follow basic, types/custom color, variants, closable, looping announcement, custom icon/action, LTR/RTL, and semantic styles.

## Props, slots, and events
`type` defaults to `info`; `variant` defaults to `filled`. `title` and `description` support simple text props. The `title`, default, `icon`, `action`, and `closeIcon` slots provide native Vue customization. `showIcon` enables the built-in or slotted icon. `closable` shows the close button and emits `close` before hiding; call `preventDefault()` to keep it visible. Root attrs and events are forwarded. `classNames` and `styles` target all semantic parts.

## Accessibility
Built-in icons are decorative and the close button has an accessible name. The announcement example pauses on hover/focus and stops under reduced motion.
