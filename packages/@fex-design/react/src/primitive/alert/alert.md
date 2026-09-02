# Alert Primitive

Alert communicates success, informational, warning, or error feedback inside the current page. The Primitive layer supplies styled structural parts and leaves icon selection, closing state, and business behavior to composition.

## Import

```tsx
import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/react/primitive/alert'
```

## Examples

The examples cover basic composition, four semantic types, three variants, a composed close action, a copy-ready looping announcement, custom icon/action content, and LTR/RTL.

## Components

### Alert

Inherits native `div` attributes, events, `style`, `className`, and `ref`. `type` selects `success | info | warning | error`; `variant` selects `filled | outlined | solid`.

### AlertIcon

Inherits native `span` attributes. It only establishes icon size and alignment and never chooses an icon from `type`.

### AlertTitle

Inherits native `div` attributes and identifies the primary message.

### AlertDescription

Inherits native `div` attributes and contains supporting text, links, or richer content.

### AlertAction

Inherits native `div` attributes and positions user-provided actions. Primitive does not implement close state.

## Styling

Use `--alert-color`, `--alert-color-foreground`, `--alert-color-background`, and `--alert-color-border` for an instance. Type-level overrides use `--alert-color-{type}` plus `-foreground`, `-background`, and `-border`. Stable parts are exposed through `data-slot`.

## Accessibility

The root defaults to `role="alert"`; override it for content that should not be announced immediately. Decorative icons should use `aria-hidden="true"`. Interactive content belongs in `AlertAction` and must retain an accessible name and visible focus state.
