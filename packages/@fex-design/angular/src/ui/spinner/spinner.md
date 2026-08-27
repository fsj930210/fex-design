# Angular UI Spinner

Recommended Spinner entry for standalone indicators and content loading. `Spinner` is the standalone indicator; `SpinnerContainer` owns the `spinning` state and local overlay behavior.

## Import

    import { Spinner, SpinnerContainer } from '@fex-design/angular/ui/spinner'

## Examples

| Name | Covers |
| --- | --- |
| basic | Standalone Spinner. |
| sizes | Available indicator sizes. |
| custom-indicator | Custom indicator content. |
| container | Content loading with an overlay. |
| text | Loading text. |
| styling | Semantic class and style customization. |

## SpinnerContainer API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| spinning | `boolean \| undefined` | `undefined` | `undefined` renders the standalone Spinner; `false` renders content; `true` renders content and overlay. |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Overlay indicator size. |
| text | string or projected content | — | Loading description. |
| indicator | projected content | built-in icon | Custom loading indicator. |
| classNames | semantic class map | — | Targets root, spinner, overlay, and text. |
| styles | semantic style map | — | Targets root, spinner, overlay, and text. |

The overlay is horizontally centered by default; text adds the default vertical stack class and may be overridden with semantic classes.
