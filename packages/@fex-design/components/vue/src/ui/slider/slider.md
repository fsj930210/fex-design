# Vue UI Slider

Select one value, a range, or editable nodes from continuous or marked values.

## Import

    import { Slider } from '@fex-design/vue/ui/slider'

## API

Root supports value, defaultValue, min, max, step, marks, minStepsBetweenThumbs, orientation, reverse, disabled, keyboard, draggableRange, editable, minCount, maxCount, size, onChange, and onEnd. The UI Slider also supports dots, included, classNames, styles, and boolean[] disabled.

## Examples

Examples cover basic and controlled values, weight allocation, range and multiple thumbs, disabled thumbs, draggable range, editable nodes, dynamic marks/dots/step=null, LTR/RTL/reverse/vertical, sizes, and CSS variables. UI also demonstrates semantic styles.

## CSS Variables

--slider-track-height, --slider-track-background, --slider-range-background, --slider-thumb-size, --slider-thumb-background, and --slider-thumb-border-color.

## Accessibility

Give every Thumb an accessible name. Vertical thumbs expose aria-orientation; use aria-valuetext when the displayed meaning differs from the raw number.
