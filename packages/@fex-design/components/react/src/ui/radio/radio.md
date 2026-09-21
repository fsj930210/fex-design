# React UI Radio

Select one value from mutually exclusive options. RadioButton is the button-style shortcut backed by the same group state.

## Import

    import { Radio, RadioGroup, RadioButton, RadioButtonGroup } from '@fex-design/react/ui/radio'

## API

- RadioGroup: value, defaultValue, disabled, orientation, and value change callback.
- Radio: value, disabled, size, and native button attributes.
- RadioButton: value, disabled, size, and native button attributes.
- UI Radio includes its label structure and supports classNames / styles.\n- RadioGroup and RadioButtonGroup support options.\n

## CSS Variables

- --radio-size
- --radio-indicator-size
- --radio-border-color
- --radio-background
- --radio-checked-color
- --radio-ring-color
- --radio-content-gap
- --radio-button-height
- --radio-button-padding-inline
- --radio-button-border-color
- --radio-button-background
- --radio-button-checked-background
- --radio-button-checked-foreground
- --radio-button-ring-color

## Accessibility

Give Primitive Radio and RadioButton an accessible name when no visible label is present. Pair aria-invalid with aria-describedby for validation.
