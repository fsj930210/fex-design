# Alert Primitive

Alert Primitive exposes styled, composable parts for page-level feedback and leaves icons, visibility, and business behavior to the caller.

## Import
```tsx
import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/solid/primitive/alert'
```

## Examples
The seven examples cover composition, types, variants, closing, a looping announcement, custom content, and direction.

## Components and native API
### Alert
Inherits `JSX.HTMLAttributes<HTMLDivElement>` and adds `type` and `variant`.
### AlertIcon
Inherits span JSX attributes and only sizes/aligns its reactive children.
### AlertTitle
Inherits div JSX attributes and identifies the primary message.
### AlertDescription
Inherits div JSX attributes and contains supporting content.
### AlertAction
Inherits div JSX attributes and positions actions without owning behavior.

## Styling and accessibility
Use the documented `--alert-color-*` variables and stable `data-slot` attributes. The root defaults to `role="alert"`; override it for non-urgent content. Decorative icons should use `aria-hidden`.
