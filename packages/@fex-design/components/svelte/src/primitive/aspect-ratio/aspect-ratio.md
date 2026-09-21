# Svelte Primitive Aspect Ratio

Styled aspect-ratio container.

## Import

    import { AspectRatio } from '@fex-design/svelte/primitive/aspect-ratio'

## Components

| Component   | Element | Purpose                                                                                                       |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| AspectRatio | div     | Inherits the native div; all native attributes and events pass through. Keeps content at the requested ratio. |

## Examples

Examples live in `examples/<name>` and are used by the documentation preview.

| Name      | Covers                |
| --------- | --------------------- |
| landscape | 16:9 landscape ratio. |
| portrait  | 9:16 portrait ratio.  |
| square    | 1:1 square ratio.     |

## API

| Name  | Type   | Default | Description                    |
| ----- | ------ | ------- | ------------------------------ |
| ratio | number | —       | Aspect ratio such as `16 / 9`. |
