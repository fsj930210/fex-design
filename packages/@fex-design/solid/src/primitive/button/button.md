# Solid Primitive Button

Low-level Button family primitives with native element passthrough.

## Import

    import { Button, ButtonGroup, ButtonIcon } from '@fex-design/solid/primitive/button'

## Components

| Component   | Element | Purpose                               |
| ----------- | ------- | ------------------------------------- |
| Button      | button  | Native button foundation.             |
| ButtonIcon  | span    | Icon placement and effect container.  |
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

| Name              | Type                                        | Default | Description                   |
| ----------------- | ------------------------------------------- | ------- | ----------------------------- |
| type              | native button type                          | button  | Native button type.           |
| native attributes | JSX.ButtonHTMLAttributes<HTMLButtonElement> | —       | Native attributes and events. |
| element access    | ref                                         | —       | Native HTMLButtonElement.     |

## ButtonIcon API

| Name              | Type                                                                                                                          | Default   | Description                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------- |
| placement         | start or end                                                                                                                  | start     | Icon position.                                    |
| effect            | 'expand-icon' \| 'ring-hover' \| 'shine-hover' \| 'gooey-start' \| 'gooey-end' \| 'underline' \| 'hover-underline' \| 'press' | undefined | Optional interaction effect; disabled by default. |
| native attributes | JSX.HTMLAttributes<HTMLSpanElement>                                                                                           | —         | Native span attributes and events.                |

## Direction

`Button`, `ButtonIcon`, and `ButtonGroup` pass through native `dir="ltr"` / `dir="rtl"`. Icon placement, gooey direction, underline motion, and connected group styles use logical `start` / `end` directions.

## ButtonGroup API

| Name              | Type                               | Default    | Description                                             |
| ----------------- | ---------------------------------- | ---------- | ------------------------------------------------------- |
| orientation       | horizontal or vertical             | horizontal | Layout direction.                                       |
| spacing           | number or string                   | 0          | Gap; numbers use pixels. Zero enables connected styles. |
| native attributes | JSX.HTMLAttributes<HTMLDivElement> | —          | Native div attributes and events.                       |
