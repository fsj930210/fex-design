# Popover

A styled, composable floating panel with shared Core trigger, positioning, dismissal and mounting behavior.

## Import

```ts
import { Popover } from '@fex-design/vue/primitive/popover'
```

## Components

| Component                           | Purpose                                                            |
| ----------------------------------- | ------------------------------------------------------------------ |
| Popover / PopoverRoot               | Owns controller state and child context.                           |
| PopoverTrigger                      | Connects configured trigger events and accessibility attributes.   |
| PopoverPortal                       | Mounts content in the resolved container.                          |
| PopoverContent                      | Connects floating position, presence, dismiss, and focus behavior. |
| PopoverArrow                        | Connects arrow geometry.                                           |
| PopoverHeader / Title / Description | Provides structured content and accessible labels.                 |

## Framework contract

Use the default slot for the trigger and named title/content slots for the panel. The content slot exposes open and close. Control state with v-model:open.

Parts: Popover, PopoverTrigger, PopoverPortal, PopoverContent, PopoverArrow, PopoverHeader, PopoverTitle, PopoverDescription.

The component entry exports `usePopover`, a standalone framework adapter for a Core controller. Internal context readers are separate from this entry.

## Examples

1. Basic usage
2. Hover, focus, click, context-menu and combinations
3. Twelve placements
4. Arrows
5. Default body and custom containers
6. Controlled/uncontrolled state, closing from content, retaining or discarding a draft
7. sideOffset and alignOffset

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

## Logic API

`usePopover(options)` is the public Vue adapter for custom Popover markup. It owns a stable Core controller and returns controller, snapshot refs, and element refs. Use controller methods to open/close, connect reference/content/arrow elements, and subscribe to state. Internal context readers are not part of this standalone API.

## Accessibility

The trigger synchronizes aria-expanded and aria-controls. PopoverTitle and PopoverDescription associate the panel label and description; custom markup should provide an equivalent accessible name. Retained hidden panels are inert. Core coordinates Escape and outside-pointer dismissal through the layer order.
