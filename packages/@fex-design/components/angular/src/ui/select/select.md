# Select

UI Select is the options-driven shortcut. It maps arbitrary data through `fieldNames.value` and `fieldNames.label`; `disabled` remains a boolean field on each option.

Use `inputProps` for the shared Input contract and `popoverProps` for Popover configuration. `getPopupContainer` stays at Select level and is excluded from `popoverProps`. Clear content is named `clear`, while `suffix` accepts arbitrary content. Loading, clear, suffix, and the default chevron share one visual position.

Select defines no CSS variables of its own; customize it through Input, Popover, structured parts, and `virtual.itemHeight`.
