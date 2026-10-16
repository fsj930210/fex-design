# Alert Primitive

Alert Primitive supplies styled Svelte 5 parts for semantic feedback without choosing icons or owning visibility.

## Import

```svelte
import { Alert, AlertIcon } from '@fex-design/svelte/primitive/alert'
```

## Components and native API

### Alert

Inherits native div attributes and adds `type`, `variant`, and a Svelte 5 children snippet.

### AlertIcon

Inherits native span attributes and only sizes/aligns its children snippet.

### AlertTitle

Inherits native div attributes and identifies the primary message.

### AlertDescription

Inherits native div attributes and contains supporting content.

### AlertAction

Inherits native div attributes and positions actions without owning behavior.

## Styling and accessibility

Override `--alert-color-*` variables or stable `data-slot` parts. The root defaults to `role="alert"`; override it for non-urgent content and hide decorative icons from assistive technology.
