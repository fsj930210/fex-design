# Vue UI Card

Convenience Card built on Primitive with structured content and semantic-region styling.

## Import

    import { Card, CardHeader, CardTitle, CardDescription, CardExtra, CardContent, CardFooter } from '@fex-design/vue/ui/card'

## Components

| Component       | Element | Purpose                                                                                             |
| --------------- | ------- | --------------------------------------------------------------------------------------------------- |
| Card            | div     | Inherits the native div; all native attributes and events pass through. Root information container. |
| CardHeader      | div     | Inherits the native div; all native attributes and events pass through. Header layout.              |
| CardTitle       | div     | Inherits the native div; all native attributes and events pass through. Title.                      |
| CardDescription | div     | Inherits the native div; all native attributes and events pass through. Description.                |
| CardExtra       | div     | Inherits the native div; all native attributes and events pass through. Extra header content.       |
| CardContent     | div     | Inherits the native div; all native attributes and events pass through. Main content.               |
| CardFooter      | div     | Inherits the native div; all native attributes and events pass through. Footer content.             |

## Examples

Examples live in `examples/<name>` and are used by the documentation preview.

| Name          | Covers                     |
| ------------- | -------------------------- |
| basic         | Complete information card. |
| extra         | Extra header content.      |
| custom-header | Custom header.             |
| surface       | Section surfaces.          |
| css-variables | Instance CSS variables.    |

## API

| Name       | Type           | Default | Description                                                                   |
| ---------- | -------------- | ------- | ----------------------------------------------------------------------------- |
| classNames | CardClassNames | —       | Adds classes to root, header, title, description, extra, content, and footer. |
| styles     | CardStyles     | —       | Adds inline styles by semantic region.                                        |
