# React Primitive Anchor

Composable, styled Anchor primitives with native element behavior.

## Import

    import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot, useAnchor } from '@fex-design/react/primitive/anchor'

## Components

| Component | Host | Purpose |
| --- | --- | --- |
| AnchorRoot | nav | Owns registration, active state, scrolling, orientation, and change events. |
| AnchorList | ul | Groups root or nested items. |
| AnchorItem | li | Registers one key, target, and optional targetOffset. |
| AnchorLink | button | Activates and scrolls to its enclosing item; native events pass through. |
| AnchorRail | div | Renders the visual rail. |
| AnchorIndicator | span | Renders current or progress ink. |

## Examples

| Name | Covers |
| --- | --- |
| basic | Vertical composition and nested items. |
| horizontal | Horizontal first-level navigation. |
| progress | Accumulated reading progress. |
| controlled | Controlled and uncontrolled active state. |
| offset | Root offset and item override. |
| direction | LTR and RTL behavior. |
| custom-click | Native click handling and preventDefault. |

## AnchorRoot API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| activeKeys | readonly string[] | — | Controlled active keys. |
| defaultActiveKeys | readonly string[] | [] | Initial uncontrolled keys. |
| activeMode | current or progress | current | Current item or accumulated progress. |
| orientation | vertical or horizontal | vertical | Layout direction. |
| container | Window, HTMLElement, or resolver | window | Scroll container. |
| targetOffset | number | 0 | Default scroll offset. |
| threshold | number | 16 | Activation line measured from the container top. |
| behavior | ScrollBehavior | smooth | Scroll behavior. |
| change | callback | — | Reports active keys and registered items. |
| native attributes | React native element props and refs | — | Native attributes, events, and element access. |

## AnchorItem API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | string | — | Stable item key. |
| target | selector, HTMLElement, ref-like value, or resolver | — | Resolves the target DOM element without changing the URL. |
| targetOffset | number | root value | Overrides AnchorRoot targetOffset. |
| native attributes | React native element props and refs | — | Native li attributes and events. |

## Native parts

AnchorLink is a native button; AnchorList, AnchorRail, and AnchorIndicator retain their native host attributes. Events: `onChange`; `onClick` on AnchorLink.

## Custom UI logic

`useAnchor` is public and can build a custom Anchor UI while retaining registration, scrolling, active state, and indicator geometry.

## Direction

Native dir="ltr" and dir="rtl" are supported. Rail, indicator, nesting, and horizontal placement use logical directions.
