# Vue Primitive Spinner

Low-level styled Spinner primitives. `Spinner` provides the indicator, `SpinnerContainer` composes content, and `SpinnerText` provides description content. Primitive does not manage `spinning` or render a content overlay.

## Import

    import { Spinner, SpinnerContainer, SpinnerText } from '@fex-design/vue/primitive/spinner'

## API

`Spinner` accepts `size: 'sm' | 'md' | 'lg'` and a default slot that replaces the built-in LoadingIcon. All components forward native attributes. Use `class` and `style` to control composition layout.

## Examples

`basic` composes the three primitive components directly.
