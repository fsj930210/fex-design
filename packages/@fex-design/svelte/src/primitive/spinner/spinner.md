# Svelte Primitive Spinner

Low-level styled Spinner primitives. `Spinner` renders the indicator, `SpinnerContainer` composes loading content, and `SpinnerText` renders description content. Primitive does not manage `spinning` or render an overlay.

## Import

    import { Spinner, SpinnerContainer, SpinnerText } from '@fex-design/svelte/primitive/spinner'

## API

`Spinner` accepts `size: 'sm' | 'md' | 'lg'`; its children snippet replaces the built-in LoadingIcon. All components forward native span attributes. Use `class` and `style` for composition layout.

## Examples

`basic` directly composes SpinnerContainer, Spinner, and SpinnerText.
