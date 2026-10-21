<script lang="ts" generics="TItem extends Record<string, unknown>">
  import { normalizeSelectOptions, type SelectFieldNames, type SelectItem } from "@fex-design/core/select/normalize-options";
  import type { SelectFilterOption, SelectOption, SelectVirtualOptions } from "@fex-design/core/select/types";
  import type { PopoverOptions } from '@fex-design/core/popover/types';
  import type { SelectionValue } from "@fex-design/core/selection/types";
  import type { ComponentProps, Snippet } from "svelte";
  import SelectRoot from '@fex-design/svelte/primitive/select/select-root.svelte';
  import SelectTrigger from '@fex-design/svelte/primitive/select/select-trigger.svelte';
  import SelectContent from '@fex-design/svelte/primitive/select/select-content.svelte';

  interface Props extends Omit<import('svelte/elements').HTMLAttributes<HTMLDivElement>, 'children' | 'prefix'> {
    triggerProps?: Omit<ComponentProps<typeof SelectTrigger>, 'children'> | undefined;
    contentProps?: ComponentProps<typeof SelectContent> | undefined;
    options: readonly SelectItem<TItem>[];
    fieldNames?: SelectFieldNames<TItem>;
    value?: SelectionValue | SelectionValue[];
    defaultValue?: SelectionValue | SelectionValue[];
    multiple?: boolean;
    onChange?: (value: SelectionValue | SelectionValue[] | undefined, meta: unknown) => void;
    searchable?: boolean;
    filterOption?: SelectFilterOption;
    onSearch?: (keyword: string) => void;
    clearable?: boolean;
    disabled?: boolean;
    loading?: boolean;
    placeholder?: string;
    maxCount?: number;
    maxTagCount?: number;
    virtual?: SelectVirtualOptions;
    inputProps?: import('svelte/elements').HTMLInputAttributes;
    getPopupContainer?: PopoverOptions['getPopupContainer'];
    option?: Snippet<[SelectOption, { selected: boolean; active: boolean; disabled: boolean }]>;
    tag?: Snippet<[SelectOption, () => void]>;
    popoverProps?: Record<string, unknown> & {
      open?: boolean;
      defaultOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
    };
    prefix?: Snippet;
    suffix?: Snippet;
    clear?: Snippet;
    emptyText?: string;
    footer?: Snippet;
    popupRender?: Snippet<[Snippet, { close: () => void }]>;
  }
  let {
    options: sourceOptions, fieldNames, value, defaultValue, multiple, onChange, searchable,
    filterOption, onSearch, clearable, disabled, loading, placeholder,
    maxCount, maxTagCount, virtual, inputProps, triggerProps, contentProps, popoverProps = {}, getPopupContainer, option, tag,
    prefix, suffix, clear, emptyText, footer, popupRender, ...triggerAttributes
  }: Props = $props();
  const options = $derived(normalizeSelectOptions(
    sourceOptions,
    fieldNames ?? ({ value: "value", label: "label" } as SelectFieldNames<TItem>),
  ));
</script>

<SelectRoot
  popoverProps={{ ...popoverProps, getPopupContainer }}
  open={popoverProps.open}
  defaultOpen={popoverProps.defaultOpen}
  onOpenChange={popoverProps.onOpenChange}
  {options}
  {value}
  {defaultValue}
  {multiple}
  {onChange}
  showSearch={searchable}
  {filterOption}
  {onSearch}
  {clearable}
  {disabled}
  {loading}
  {maxCount}
  {virtual}
>
  <SelectTrigger {...triggerAttributes} {...triggerProps} placeholder={placeholder ?? triggerProps?.placeholder} maxTagCount={maxTagCount ?? triggerProps?.maxTagCount} {prefix} {suffix} {clear} inputProps={inputProps ?? triggerProps?.inputProps} {tag} />
  <SelectContent {...contentProps} {emptyText} {footer} {option} {popupRender} />
</SelectRoot>
