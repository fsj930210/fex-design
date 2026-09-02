# Alert Primitive

Alert Primitive provides styled Angular host components for semantic feedback and leaves icon choice and visibility to composition.

## Import
```ts
import { Alert, AlertAction, AlertDescription, AlertIcon, AlertTitle } from '@fex-design/angular/primitive/alert'
```

## Examples
The examples cover basic composition, four types, three variants, composed closing, looping announcement, custom content, and direction.

## Components and hosts
### Alert
Targets `div[alert]`, keeps native host capabilities, and adds `type` and `variant` signal inputs.
### AlertIcon
Targets `span[alertIcon]` and only sizes/aligns projected icon content.
### AlertTitle
Targets `div[alertTitle]` and projects the primary message.
### AlertDescription
Targets `div[alertDescription]` and projects supporting content.
### AlertAction
Targets `div[alertAction]` and positions native projected actions without owning behavior.

## Styling and accessibility
Use `--alert-color-*` variables and stable `data-slot` attributes. The root has `role="alert"`; override it for non-urgent content. Decorative projected icons should be hidden from assistive technology.
