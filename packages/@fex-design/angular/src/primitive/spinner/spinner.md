# Angular Primitive Spinner

Low-level Spinner building blocks with native host element attributes and styled default output. Use these components when the application owns the loading-state decision and DOM composition.

## Import

    import { Spinner, SpinnerContainer, SpinnerText } from '@fex-design/angular/primitive/spinner'

## Components

| Component | Host | Purpose |
| --- | --- | --- |
| Spinner | `span[spinner]` | Loading indicator; renders the built-in LoadingIcon. |
| SpinnerContainer | `span[spinnerContainer]` | Composes indicator and text content. |
| SpinnerText | `span[spinnerText]` | Loading description content. |

## Examples

| Name | Covers |
| --- | --- |
| basic | Direct composition of the three Primitive components. |
| sizes | Small, medium, and large Spinner sizes. |
| custom-indicator | Replacing the default indicator content. |

## Spinner API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Indicator size. |
| host attributes | native span attributes | — | Native classes, styles, accessibility attributes, and events. |

## Composition

Primitive components do not manage `spinning` and do not render an overlay. Compose them directly when custom layout or custom loading-state control is required.
