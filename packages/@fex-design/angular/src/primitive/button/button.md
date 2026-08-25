# Angular Primitive Button

Low-level Button family primitives with native element passthrough.

## Import

    import { Button, ButtonGroup, ButtonIcon } from '@fex-design/angular/primitive/button'

## Components

| Component   | Element | Purpose                               |
| ----------- | ------- | ------------------------------------- |
| Button      | button  | Native button foundation.             |
| ButtonIcon  | span    | Icon container.                       |
| ButtonGroup | div     | Layout and connected-button grouping. |

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name        | Covers                                                              |
| ----------- | ------------------------------------------------------------------- |
| basic       | Native button foundation.                                           |
| icon        | Start and end ButtonIcon composition.                               |
| group       | Connected, spaced, horizontal, and vertical ButtonGroup layouts.    |
| native      | Native form attributes, events, disabled state, and element access. |
| composition | Button, ButtonIcon, and ButtonGroup used together.                  |

## Button API

| Name              | Type                   | Default | Description                   |
| ----------------- | ---------------------- | ------- | ----------------------------- |
| type              | native button type     | button  | Native button type.           |
| native attributes | native button bindings | —       | Native attributes and events. |
| element access    | element                | —       | Native HTMLButtonElement.     |

## ButtonIcon API

| Name              | Type                 | Default | Description                        |
| ----------------- | -------------------- | ------- | ---------------------------------- |
| native attributes | native span bindings | —       | Native span attributes and events. |

## Direction

`Button`, `ButtonIcon`, and `ButtonGroup` pass through native `dir="ltr"` / `dir="rtl"`. Button effects and connected group styles use logical `start` / `end` directions.

## ButtonGroup API

| Name              | Type                   | Default    | Description                                             |
| ----------------- | ---------------------- | ---------- | ------------------------------------------------------- |
| orientation       | horizontal or vertical | horizontal | Layout direction.                                       |
| spacing           | number or string       | 0          | Gap; numbers use pixels. Zero enables connected styles. |
| native attributes | native div bindings    | —          | Native div attributes and events.                       |
