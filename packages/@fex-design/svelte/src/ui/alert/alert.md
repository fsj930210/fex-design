# Alert

UI Alert combines the Primitive parts with built-in circle icons, close behavior, Svelte snippets, and structured styling.

## Import
```svelte
import { Alert } from '@fex-design/svelte/ui/alert'
```

## Examples
Examples follow basic, types/custom color, variants, closable, looping announcement, custom icon/action, LTR/RTL, and semantic styles.

## Props and snippets
`type` defaults to `info`; `variant` defaults to `filled`. `title`, `description`, `icon`, `action`, and `closeIcon` are Svelte 5 snippets. `showIcon` enables the built-in or custom icon. `closable` calls `onClose` and hides unless prevented. Native div attributes are forwarded. `classNames` and `styles` target all semantic parts.

## Accessibility
Icons are decorative and the close control is a native button. The looping example pauses on hover/focus and respects reduced motion.
