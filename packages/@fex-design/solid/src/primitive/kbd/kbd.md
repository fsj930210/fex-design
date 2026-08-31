# Solid Primitive Kbd

Styled keyboard key and key group primitives.

## Import

    import { Kbd, KbdGroup } from '@fex-design/solid/primitive/kbd'

## Components

| Component | Element | Purpose                                                                                       |
| --------- | ------- | --------------------------------------------------------------------------------------------- |
| Kbd       | kbd     | Inherits the native kbd; all native attributes and events pass through. Single keyboard key.  |
| KbdGroup  | div     | Inherits the native div; all native attributes and events pass through. Groups multiple keys. |

## Examples

Examples live in `examples/<name>` and are used by the documentation preview.

| Name  | Covers                   |
| ----- | ------------------------ |
| basic | Single key.              |
| group | Keyboard shortcut group. |

## API

This family adds no state props; content, class, style, ARIA attributes, and native events pass through to the corresponding elements.
