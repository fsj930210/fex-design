<script lang="ts" module>
  import type { SelectionChangeMeta } from "@fex-design/core/selection/types";
  import type { RadioValue } from "./context";

  export interface RadioChangeMeta {
    previousValue: RadioValue | undefined;
    value: RadioValue;
    changedValues: SelectionChangeMeta["changedValues"];
  }
</script>

<script lang="ts">
  import { untrack } from "svelte";
  import { getNativeControlTarget } from "@fex-design/svelte/utils/native-control-target";
  let element = $state<HTMLDivElement | null>(null);
  const registerTarget = getNativeControlTarget();
  // Associate the semantic control with its owning field for this element lifetime.
  $effect(() => {
    const target = element;
    if (target) return untrack(() => registerTarget?.(target));
  });
  import { createSelectionController } from "@fex-design/core/selection/create-selection-controller";
  import {
    radioGroupClassName,
    type RadioGroupStyleProps,
  } from "@fex-design/components-styles/radio";
  import { cn } from "@fex-design/utils";
  import { setContext, type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import { radioContextKey, type RadioContextValue } from "./context";

  interface RadioGroupProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children" | "defaultValue" | "onchange"
  > {
    value?: RadioValue | undefined;
    defaultValue?: RadioValue | undefined;
    disabled?: boolean | null | undefined;
    orientation?: RadioGroupStyleProps["orientation"];
    children?: Snippet;
    onChange?: ((value: RadioValue, meta: RadioChangeMeta) => void) | undefined;
  }

  let {
    value,
    defaultValue,
    disabled,
    orientation = "horizontal",
    children,
    class: className,
    onChange,
    ...rest
  }: RadioGroupProps = $props();

  function toRadioChangeMeta(
    nextValue: RadioValue,
    meta: SelectionChangeMeta,
  ): RadioChangeMeta {
    return {
      previousValue: meta.previousValues[0],
      value: nextValue,
      changedValues: meta.changedValues,
    };
  }

  const controller = createSelectionController({
    get value() {
      return value;
    },
    get defaultValue() {
      return defaultValue;
    },
    get multiple() {
      return false;
    },
    onChange(values, meta) {
      const nextValue = values[0];
      if (nextValue === undefined) return;
      onChange?.(nextValue, toRadioChangeMeta(nextValue, meta));
    },
  });
  const snapshot = readableCoreStore(controller);
  const currentValue = $derived(value ?? $snapshot.value);

  setContext<RadioContextValue>(radioContextKey, {
    value: () => currentValue,
    disabled: () => disabled === true,
    select: (nextValue) => controller.replace(nextValue),
  });
</script>

<div
  bind:this={element}
  {...rest}
  role="radiogroup"
  data-slot="radio-group"
  data-orientation={orientation}
  data-disabled={disabled ? "true" : undefined}
  class={cn(radioGroupClassName({ orientation }), className)}
>
  {@render children?.()}
</div>
