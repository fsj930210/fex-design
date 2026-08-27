# Solid Primitive Spinner

Low-level styled Spinner primitives. `Spinner` renders the indicator, `SpinnerContainer` composes loading content, and `SpinnerText` renders the description. Primitive does not manage `spinning` or create a content overlay.

## Import

    import { Spinner, SpinnerContainer, SpinnerText } from '@fex-design/solid/primitive/spinner'

## API

`Spinner` accepts `size: 'sm' | 'md' | 'lg'` and children that replace the built-in LoadingIcon. All components accept their native Solid span attributes. Control composition layout with `class` and `style`.

## Examples

`basic` directly composes SpinnerContainer, Spinner, and SpinnerText.
