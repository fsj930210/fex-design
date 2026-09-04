# Angular UI Anchor

Recommended data-driven Anchor for quick use. The public component is Anchor; Primitive parts are not re-exported from this entry.

## Import

    import { Anchor } from '@fex-design/angular/ui/anchor'

## Examples

| Name | Covers |
| --- | --- |
| basic | Data-driven vertical Anchor. |
| horizontal | Horizontal layout. |
| progress | Accumulated reading progress. |
| controlled | Controlled and uncontrolled active state. |
| offset | Component offset and item override. |
| direction | LTR and RTL. |
| custom-click | Item click handling and cancellation. |
| semantic-styles | classNames and styles for all semantic parts. |

## Anchor API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| items | readonly AnchorItemData[] | — | Item data and nested children. |
| activeKeys | readonly string[] | — | Controlled active keys. |
| defaultActiveKeys | readonly string[] | [] | Initial uncontrolled keys. |
| activeMode | current or progress | current | Current item or accumulated progress. |
| orientation | vertical or horizontal | vertical | Layout direction. |
| container | Window, HTMLElement, or resolver | window | Scroll container. |
| targetOffset | number | 0 | Default item scroll offset. |
| threshold | number | 16 | Activation line from the container top. |
| behavior | ScrollBehavior | smooth | Scroll behavior. |
| classNames | partial semantic-part map | — | Classes for root, list, item, link, rail, and indicator. |
| styles | partial semantic-part map | — | Framework-native styles for the same parts. |
| native attributes | Angular native hosts: nav, ul, li, button, div, and span | — | Native root attributes and element access. |

## Item data

Each item requires key, title, and target. children creates nesting; item targetOffset overrides the component value.

## Events

The change event reports active keys. The item-click event runs before internal scrolling; preventDefault cancels that scroll.

## Semantic styling

classNames and styles address root, list, item, link, rail, and indicator. These are styling parts, not exported UI components.

## Direction

Use native dir="ltr" or dir="rtl"; layout and indicator geometry follow logical directions.
