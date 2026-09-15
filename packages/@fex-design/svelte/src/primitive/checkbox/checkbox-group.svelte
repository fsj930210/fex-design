<script lang="ts">
  import { createCheckboxGroupController } from "@fex-design/core/checkbox/create-checkbox-group-controller";
  import type {
    CheckboxGroupChangeMeta,
    CheckboxValue,
  } from "@fex-design/core/checkbox/types";
  import {
    checkboxGroupClassName,
    type CheckboxGroupStyleProps,
  } from "@fex-design/styles/checkbox";
  import { cn } from "@fex/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { readableCoreStore } from "../../stores/core-store";
  import { setCheckboxGroupContext } from "./context";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onchange"> {
    value?: CheckboxValue[];
    defaultValue?: CheckboxValue[];
    disabled?: boolean;
    orientation?: CheckboxGroupStyleProps["orientation"];
    onChange?: (value: CheckboxValue[], meta: CheckboxGroupChangeMeta) => void;
    children?: Snippet;
  }
  let {
    value,
    defaultValue,
    disabled,
    orientation = "vertical",
    onChange,
    class: className,
    children,
    ...rest
  }: Props = $props();
  const options = {
    get value() {
      return value;
    },
    get defaultValue() {
      return defaultValue;
    },
    get disabled() {
      return disabled;
    },
    get onChange() {
      return onChange;
    },
  };
  const controller = createCheckboxGroupController(options);
  const snapshot = readableCoreStore(controller);
  setCheckboxGroupContext({
    value: () => value ?? $snapshot.value,
    disabled: () => disabled === true,
    toggle: controller.toggle,
  });
</script>

<div
  {...rest}
  role="group"
  data-slot="checkbox-group"
  data-orientation={orientation}
  class={cn(checkboxGroupClassName({ orientation }), className)}
>
  {@render children?.()}
</div>
