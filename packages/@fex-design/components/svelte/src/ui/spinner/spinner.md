# Svelte UI Spinner

Standalone loading indicator and content container with automatic overlay.

## Import

    import { Spinner, SpinnerContainer } from '@fex-design/svelte/ui/spinner'

## Components

| Component        | Element | Purpose                                                                                                      |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Spinner          | span    | Inherits the native span; all native attributes and events pass through. Loading indicator.                  |
| SpinnerContainer | div     | Inherits the native div; all native attributes and events pass through. Content and loading-state container. |

## Examples

| Name             | Covers              |
| ---------------- | ------------------- |
| basic            | Basic indicator.    |
| sizes            | Three sizes.        |
| custom-indicator | Custom indicator.   |
| overlay          | Content overlay.    |
| styling          | Structured styling. |

## API

These properties belong to `SpinnerContainer`. Standalone `Spinner` accepts the Primitive `size` and native span attributes.

| Property | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| spinning | boolean \| undefined | undefined | No | Unset displays a standalone indicator; false shows content; true adds a loading overlay. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | No | Indicator size. |
| text | string | — | No | Loading text, centered below the indicator by default. |
| indicator | Snippet | LoadingIcon | No | Replaces the default indicator. |
| classNames | SpinnerClassNames | — | No | Classes for root, spinner, overlay, and text. |
| styles | SpinnerStyles<string> | — | No | Styles for root, spinner, overlay, and text. |

Omitting `indicator` keeps the default LoadingIcon. Switching `spinning` between true and false keeps content mounted and preserves its state and scroll position.
