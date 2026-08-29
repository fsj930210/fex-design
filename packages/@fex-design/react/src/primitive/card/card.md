# React Primitive Card

Composable information container made of seven semantic regions.

## Import

    import { Card, CardHeader, CardTitle, CardDescription, CardExtra, CardContent, CardFooter } from '@fex-design/react/primitive/card'

## Components

| Component | Element | Purpose |
| --- | --- | --- |
| Card | div | Inherits the native div; all native attributes and events pass through. Root information container. |
| CardHeader | div | Inherits the native div; all native attributes and events pass through. Header layout. |
| CardTitle | div | Inherits the native div; all native attributes and events pass through. Title. |
| CardDescription | div | Inherits the native div; all native attributes and events pass through. Description. |
| CardExtra | div | Inherits the native div; all native attributes and events pass through. Extra header content. |
| CardContent | div | Inherits the native div; all native attributes and events pass through. Main content. |
| CardFooter | div | Inherits the native div; all native attributes and events pass through. Footer content. |

## Examples

Examples live in `examples/<name>` and are used by the documentation preview.

| Name | Covers |
| --- | --- |
| basic | Complete information card. |
| extra | Extra header content. |
| custom-header | Custom header. |
| surface | Section surfaces. |
| css-variables | Instance CSS variables. |

## API

This family adds no state props; content, class, style, ARIA attributes, and native events pass through to the corresponding elements.
