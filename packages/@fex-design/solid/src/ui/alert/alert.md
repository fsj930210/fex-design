# Alert

UI Alert combines the Primitive parts with built-in circle status icons, optional closing, and structured styling.

## Import
```tsx
import { Alert } from '@fex-design/solid/ui/alert'
```

## Examples
Examples are ordered as basic, types/custom color, variants, closable, looping announcement, custom icon/action, LTR/RTL, and semantic styles.

## API
`type` defaults to `info`; `variant` defaults to `filled`. `title`, `description`, `icon`, `action`, and `closeIcon` accept Solid `JSX.Element`. `showIcon` enables icon rendering. `closable` emits `onClose` and hides unless the event is prevented. Native div properties remain available. `classNames` and `styles` address every semantic part.

## Accessibility
Icons are decorative and the close button is keyboard accessible. The looping example pauses on hover/focus and respects reduced motion.
