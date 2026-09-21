# Popover

A composed Primitive panel with title, content and semantic styling.

## Import

```ts
import { Popover } from '@fex-design/svelte/ui/popover'
```

## Framework contract

The trigger Snippet receives props and an action. Apply use:action and spread props on the trigger. The content Snippet receives open and close.

## Examples

1. Basic usage
2. Hover, focus, click, context-menu and combinations
3. Twelve placements
4. Arrows
5. Default body and custom containers
6. Controlled/uncontrolled state, closing from content, retaining or discarding a draft
7. sideOffset and alignOffset
8. Semantic styling

## Shared API

Behavior types live in @fex-design/core/popover/types. Both layers and all five frameworks share these semantics.

| API                                | Default    | Meaning                                                                                                          |
| ---------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| open / defaultOpen                 | — / false  | Controlled state / uncontrolled initial state                                                                    |
| trigger                            | ['click']  | hover, focus, click, context-menu                                                                                |
| placement                          | bottom     | top, topLeft, topRight, bottom, bottomLeft, bottomRight, left, leftTop, leftBottom, right, rightTop, rightBottom |
| side / align                       | —          | top, right, bottom, left / start, center, end                                                                    |
| sideOffset / alignOffset           | 6 / 0      | Distance from trigger / panel alignment offset, px                                                               |
| arrow / arrowPadding               | false / 16 | Arrow visibility / edge padding, px                                                                              |
| avoidCollisions / collisionPadding | true / 8   | Collision adjustment / boundary padding, px                                                                      |
| hoverOpenDelay / hoverCloseDelay   | 0 / 80     | Hover opening / closing delay, ms                                                                                |
| closeDelay                         | 140        | Closing transition duration, ms                                                                                  |
| lazyMount                          | true       | Do not mount content before the first opening                                                                    |
| destroyOnHidden                    | false      | Whether to unmount after the closing transition                                                                  |
| getPopupContainer                  | body       | Resolve the portal target from the trigger                                                                       |

See the website Popover API for the complete properties and events. Native attributes, events and element references follow each framework contract; all delays use ms.

## Portal container

Content defaults to the trigger owner document body. Both UI and Primitive roots accept getPopupContainer, which the internal Portal reads. Primitive PopoverPortal also accepts container directly. Precedence: container → getPopupContainer → body.

## Mount lifecycle

| lazyMount | destroyOnHidden | Before first opening | After closing                  |
| --------- | --------------- | -------------------- | ------------------------------ |
| true      | false           | Unmounted            | Retain DOM and internal state  |
| true      | true            | Unmounted            | Unmount; recreate on reopening |
| false     | false           | Mounted              | Retain DOM and internal state  |
| false     | true            | Mounted              | Unmount; recreate on reopening |

The default suits forms: mount on first opening and retain the draft after closing. destroyOnHidden only unmounts the content subtree; it does not clear externally owned state.

## Semantic styling

classNames and styles support root, title, content and arrow. root is the floating panel. Style values use native framework types; Svelte uses CSS strings.

## Accessibility

The trigger synchronizes aria-expanded and aria-controls. PopoverTitle and PopoverDescription associate the panel label and description; custom markup should provide an equivalent accessible name. Retained hidden panels are inert. Core coordinates Escape and outside-pointer dismissal through the layer order.
