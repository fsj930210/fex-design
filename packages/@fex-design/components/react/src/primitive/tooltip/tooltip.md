# React Primitive Tooltip

Accessible hover/focus hint built on the shared floating controller.

## Import

    import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from '@fex-design/react/primitive/tooltip'

## Components

| Component      | Purpose                                               |
| -------------- | ----------------------------------------------------- |
| TooltipRoot    | Owns open state, timing, positioning, and context.    |
| TooltipTrigger | Connects hover/focus behavior and aria-describedby.   |
| TooltipPortal  | Mounts content in the resolved container.             |
| TooltipContent | Renders role="tooltip" content and positioning state. |
| TooltipArrow   | Renders the optional positioned arrow.                |

## Examples

| Name          | Covers                                  |
| ------------- | --------------------------------------- |
| basic         | Trigger and accessible tooltip content. |
| controlled    | Controlled open state.                  |
| placement     | Twelve placements.                      |
| color         | Custom content color.                   |
| direction     | LTR and RTL behavior.                   |
| css-variables | CSS variable customization.             |

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

## Hook API

`useTooltip` reads the Root state. `useTooltipTrigger`, `useTooltipContent`, and `useTooltipArrow` return props for custom React markup; they must run under TooltipRoot.

## Accessibility

Content uses role="tooltip". The trigger receives aria-describedby only while content is mounted. Keyboard focus opens the hint; Escape closes it and focus is preserved.
