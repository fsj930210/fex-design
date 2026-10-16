# Svelte UI Slider

Select one value, a range, or editable nodes from continuous or marked values.

## Import

    import { Slider } from '@fex-design/svelte/ui/slider'

## API

Root supports value, defaultValue, min, max, step, marks, minStepsBetweenThumbs, orientation, reverse, disabled, keyboard, draggableRange, editable, minCount, maxCount, size, onChange, and onEnd. The UI Slider also supports dots, included, classNames, styles, and boolean[] disabled.

## CSS Variables

--slider-track-height, --slider-track-background, --slider-range-background, --slider-thumb-size, --slider-thumb-background, and --slider-thumb-border-color.

## Accessibility

Give every Thumb an accessible name. Vertical thumbs expose aria-orientation; use aria-valuetext when the displayed meaning differs from the raw number.
