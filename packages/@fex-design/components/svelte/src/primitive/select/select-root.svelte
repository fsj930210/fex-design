<script lang="ts">
  import { createSelectController } from "@fex-design/core/select/create-select-controller";
  import { filterSelectOptions } from "@fex-design/core/select/filter-options";
  import type {
    SelectFilterOption,
    SelectOption,
    SelectVirtualOptions,
  } from "@fex-design/core/select/types";
  import { createSelectionController } from "@fex-design/core/selection/create-selection-controller";
  import type { SelectionValue } from "@fex-design/core/selection/types";
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import { toStore } from "svelte/store";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import Popover from "../popover/popover.svelte";
  import { selectContextKey, type SelectContext } from "./context";
  interface Props {
    children?: Snippet | undefined;
    options?: readonly SelectOption[] | undefined;
    multiple?: boolean | undefined;
    value?: SelectionValue | SelectionValue[] | undefined;
    defaultValue?: SelectionValue | SelectionValue[] | undefined;
    onChange?:
      | ((
          value: SelectionValue | SelectionValue[] | undefined,
          meta: {
            selectedItem?: SelectOption | undefined;
            selectedItems: SelectOption[];
            previousSelectedValues: SelectionValue[];
            changedValues: SelectionValue[];
          },
        ) => void)
      | undefined;
    showSearch?: boolean | undefined;
    filterOption?: SelectFilterOption | undefined;
    onSearch?: ((keyword: string) => void) | undefined;
    open?: boolean | undefined;
    defaultOpen?: boolean | undefined;
    onOpenChange?: ((open: boolean) => void) | undefined;
    clearable?: boolean | undefined;
    loading?: boolean | undefined;
    disabled?: boolean | undefined;
    virtual?: SelectVirtualOptions | undefined;
    maxCount?: number | undefined;
    "aria-invalid"?: string | boolean | undefined;
    "data-warning"?: string | undefined;
    popoverProps?: Record<string, unknown> | undefined;
  }
  let {
    children,
    options = [],
    multiple = false,
    value,
    defaultValue,
    onChange,
    showSearch = false,
    filterOption,
    onSearch,
    open,
    defaultOpen,
    onOpenChange,
    clearable = false,
    loading = false,
    disabled = false,
    virtual,
    maxCount,
    "aria-invalid": ariaInvalid,
    "data-warning": dataWarning,
    popoverProps = {},
  }: Props = $props();
  const isMultiple = () => multiple;
  const selection = createSelectionController({
    get value() {
      return value;
    },
    get defaultValue() {
      return defaultValue;
    },
    get multiple() {
      return isMultiple();
    },
    get disabledValues() {
      return options
        .filter((option) => option.disabled)
        .map((option) => option.value);
    },
    onChange(values, meta) {
      const resolve = (item: SelectionValue) =>
        options.find((option) => option.value === item) ?? {
          value: item,
          label: String(item),
        };
      const selectedItems = values.map(resolve);
      const selectedItem =
        meta.changedValues
          .map(resolve)
          .find((item) => values.includes(item.value)) ?? selectedItems[0];
      onChange?.(isMultiple() ? values : values[0], {
        selectedItem,
        selectedItems,
        previousSelectedValues: [...meta.previousValues],
        changedValues: [...meta.changedValues],
      });
    },
  });
  let controller: ReturnType<typeof createSelectController>;
  controller = createSelectController({
    get disabled() {
      return disabled;
    },
    selection,
    get options() {
      return filterSelectOptions(
        options,
        controller.getSnapshot().searchValue,
        filterOption,
      );
    },
    get multiple() {
      return isMultiple();
    },
    get maxCount() {
      return maxCount;
    },
    get open() {
      return open;
    },
    get defaultOpen() {
      return defaultOpen;
    },
    onOpenChange: (next) => onOpenChange?.(next),
    onSearch: (keyword) => onSearch?.(keyword),
  });
  const storeSnapshot = readableCoreStore(controller);
  const currentSnapshot = $derived.by(() => {
    void $storeSnapshot;
    return controller.getSnapshot();
  });
  const snapshot = toStore(() => currentSnapshot);
  const listId = `select-${crypto.randomUUID()}`;
  const context: SelectContext = {
    controller,
    snapshot,
    options: () => options,
    visibleOptions: () =>
      filterSelectOptions(options, currentSnapshot.searchValue, filterOption),
    selectedOptions: () => {
      void currentSnapshot.selectedValues;
      return selection.getSnapshot().values.map(
        (item) =>
          options.find((option) => option.value === item) ?? {
            value: item,
            label: String(item),
          },
      );
    },
    multiple: isMultiple,
    showSearch: () => showSearch,
    disabled: () => disabled,
    clearable: () => clearable,
    loading: () => loading,
    ariaInvalid: () => ariaInvalid,
    dataWarning: () => dataWarning,
    virtual: () => virtual,
    listId,
    removeValue: (item) => {
      if (!disabled) selection.unselect(item);
    },
  };
  setContext(selectContextKey, context);
</script>

<Popover
  {...popoverProps}
  {disabled}
  open={$snapshot.open}
  {defaultOpen}
  onOpenChange={(next) => (next ? controller.open() : controller.close())}
  >{@render children?.()}</Popover
>
