<script lang="ts" generics="TNode extends TreeNodeData">
  import type { CheckFeatureApi } from "@fex-design/core/tree/features/check";
  import type { TreeKey, TreeNodeData } from "@fex-design/core/tree/types";
  import { cn } from "@fex-design/utils";
  import { getContext, untrack } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { treeContextKey, type TreeContext } from "./tree-context";
  import { readableCoreStore } from "@fex-design/svelte/stores/core-store";
  import {
    CheckboxRoot,
    CheckboxControl,
    CheckboxIndicator,
  } from "@fex-design/svelte/primitive/checkbox";

  interface Props extends Omit<HTMLInputAttributes, "type" | "checked"> {
    itemKey: TreeKey;
  }
  let { itemKey, class: className, onchange, ...rest }: Props = $props();
  const context = getContext<TreeContext<TNode>>(treeContextKey);
  const tree = untrack(() => context.tree);
  const snapshot = readableCoreStore({
    getSnapshot: tree.getSnapshot,
    subscribe: (listener) => tree.subscribeNode(itemKey, listener),
  });
  const check = tree.getFeature<CheckFeatureApi>("check");
</script>

{#if $snapshot.items.get(itemKey)?.checkable && check}
  {@const item = tree.getItem(itemKey)!}
  {@const checked = $snapshot.checkedKeys.includes(itemKey)}
  {@const checkedState = check.getState(itemKey)}
  <CheckboxRoot
    {...rest}
    data-slot="tree-checkbox"
    class={cn("shrink-0", className)}
    disabled={item.disabled || item.disableCheckbox}
  >
    <CheckboxControl
      tabindex={tree.hasFeature("keyboard") ? -1 : rest.tabindex}
      {checked}
      indeterminate={checkedState === "indeterminate"}
      aria-checked={checkedState === "indeterminate" ? "mixed" : checked}
      onchange={(event) => {
        onchange?.(event);
        if (!event.defaultPrevented)
          check.check(itemKey, event.currentTarget.checked);
      }}
      onclick={(event) => event.stopPropagation()}
    /><CheckboxIndicator />
  </CheckboxRoot>
{/if}
