# Svelte Primitive Spinner

Composable loading indicator, text, container, and overlay primitives.

## Import

    import { Spinner, SpinnerText, SpinnerContainer, SpinnerOverlay } from '@fex-design/svelte/primitive/spinner'

## Components

| Component        | Element | Purpose                                                                                                      |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Spinner          | span    | Inherits the native span; all native attributes and events pass through. Loading indicator.                  |
| SpinnerText      | span    | Inherits the native span; all native attributes and events pass through. Loading text.                       |
| SpinnerContainer | div     | Inherits the native div; all native attributes and events pass through. Content and loading-state container. |
| SpinnerOverlay   | div     | Inherits the native div; all native attributes and events pass through. Primitive overlay node.              |

## Examples

| Name             | Covers              |
| ---------------- | ------------------- |
| basic            | Basic indicator.    |
| sizes            | Three sizes.        |
| custom-indicator | Custom indicator.   |
| overlay          | Content overlay.    |
| styling          | Structured styling. |

## API

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| size | 'sm' | 'md'    | 'lg'        | 'md' | Indicator size. |

`SpinnerOverlay` arranges content horizontally by default. Set `class="flex-col"` on the overlay to center the indicator above its text.
