# Alert

UI Alert packages the Primitive parts into one component with semantic built-in icons, optional close behavior, custom action content, and structured styling.

## Import

```tsx
import { Alert } from '@fex-design/react/ui/alert'
```

## Examples

Examples are ordered as basic, types and custom colors, variants, closable, looping announcement, custom icon/action, LTR/RTL, and semantic styles.

## API

`type` is `success | info | warning | error` and defaults to `info`. `variant` is `filled | outlined | solid` and defaults to `filled`. `title`, `description`, `icon`, `action`, and `closeIcon` accept `ReactNode`. `showIcon` enables the built-in icon or its replacement. `closable` renders a close button; `onClose` runs before the component hides and can call `preventDefault()` to keep it visible.

All native `div` attributes, events, `style`, `className`, and `ref` are forwarded to the Primitive root. `classNames` and `styles` target `root`, `icon`, `content`, `title`, `description`, `action`, and `close`.

## Built-in icons

Success, info, warning, and error map to the corresponding circle status icon. A custom `icon` is used only when `showIcon` is true.

## Accessibility

Built-in icons are decorative. The close button has an accessible label, responds to keyboard activation, and preserves focus visibility. The looping announcement example pauses on hover and focus and disables animation under `prefers-reduced-motion`.
