# React Ui Tooltip

Accessible hover/focus hint built on the shared floating controller. UI assembles the default trigger and content structure and adds semantic styling.

## Import

    import { Tooltip } from '@fex-design/react/ui/tooltip'

## Components

| Component | Purpose |\n| --- | --- |\n| Tooltip | Ready-to-use trigger and content composition. |

## Examples

| Name          | Covers                                  |
| ------------- | --------------------------------------- |
| basic         | Trigger and accessible tooltip content. |
| controlled    | Controlled open state.                  |
| placement     | Twelve placements.                      |
| color         | Custom content color.                   |
| direction     | LTR and RTL behavior.                   |
| css-variables | CSS variable customization.             | \n  | semantic-styles | Structured classNames and styles. |

## API

| Name                             | Type                     | Default | Description                                    |
| -------------------------------- | ------------------------ | ------- | ---------------------------------------------- |
| open / defaultOpen               | boolean                  | false   | Controlled / uncontrolled open state.          |
| disabled                         | boolean                  | false   | Disables tooltip triggers.                     |
| placement                        | TooltipPlacement         | top     | Twelve shortcut placements.                    |
| side / align                     | Side / Align             | —       | Explicit floating direction and alignment.     |
| sideOffset / alignOffset         | number                   | 6 / 0   | Distance and alignment offsets in pixels.      |
| avoidCollisions                  | boolean                  | true    | Adjusts placement when space is insufficient.  |
| hoverOpenDelay / hoverCloseDelay | number                   | 0 / 80  | Hover delays in milliseconds.                  |
| closeDelay                       | number                   | 140     | Keeps content mounted for the exit transition. |
| getPopupContainer                | (trigger) => HTMLElement | body    | Resolves the portal container.                 |
| onOpenChange                     | (open, info) => void     | —       | Reports state requests and their reason.       |

## Accessibility

Content uses role="tooltip". The trigger receives aria-describedby only while content is mounted. Keyboard focus opens the hint; Escape closes it and focus is preserved.
