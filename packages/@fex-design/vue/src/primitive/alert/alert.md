# Alert Primitive

Alert provides styled structural parts for success, info, warning, and error feedback without owning icon selection or visibility.

## Import
```ts
import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/vue/primitive/alert'
```

## Examples
Examples cover basic composition, types, variants, composed closing, a looping announcement, custom icon/action, and direction.

## Components and native API
### Alert
Renders a native `div`, forwards attrs/events/class/style/template ref, and adds `type` and `variant` props plus the default slot.
### AlertIcon
Renders a native `span`, forwards its attrs, and sizes/aligns the default icon slot without selecting an icon.
### AlertTitle
Renders a native `div`, forwards attrs, and exposes the title through its default slot.
### AlertDescription
Renders a native `div`, forwards attrs, and exposes supporting content through its default slot.
### AlertAction
Renders a native `div`, forwards attrs, and positions projected actions without implementing behavior.

## Styling and accessibility
Override the documented `--alert-color-*` variables or target stable `data-slot` parts. The root defaults to `role="alert"`; override it for non-urgent static content. Decorative icons should be hidden from assistive technology.
