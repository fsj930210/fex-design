# React Primitive Card

Composable, native-div Card primitives. The Root owns clipping, radius, border, and shadow; each region owns its own surface, padding, and divider.

## Import

```tsx
import { Card, CardContent, CardDescription, CardExtra, CardFooter, CardHeader, CardTitle } from '@fex-design/react/primitive/card'
```

## Components

| Component | Element | Description |
| --- | --- | --- |
| Card | div | Root surface boundary. |
| CardHeader | div | Header layout and its divider. |
| CardTitle | div | Header title. |
| CardDescription | div | Header supporting text. |
| CardExtra | div | Supplementary Header content such as a badge, action, or tabs. |
| CardContent | div | Main content surface. |
| CardFooter | div | Footer surface and its divider. |

## Examples

Examples live in `examples/<name>` and are the source used by documentation previews.

| Name | Coverage |
| --- | --- |
| basic | Seven-part composition. |
| surface | Independent region surfaces and dividers. |
| custom-header | Custom Header layout with CardExtra. |

## Primitive API

All seven components forward `ComponentProps<'div'>`, native events, `className`, `style`, and `ref` to their host div. They have no controlled state or custom callbacks.

## CSS variables

| Variable | Default source | Description |
| --- | --- | --- |
| --card-radius | --radius-md | Root radius. |
| --card-border | none | Root border shorthand. |
| --card-shadow | none | Root shadow. |
| --card-background | --elevated-background | Shared region background fallback. |
| --card-header-background / --card-content-background / --card-footer-background | --card-background | Region background. |
| --card-header-padding / --card-content-padding / --card-footer-padding | 1rem | Region padding. |
| --card-header-divider / --card-footer-divider | 1px solid var(--border) | Region separator shorthand. |
