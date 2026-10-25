<script lang="ts" generics="TNode extends TreeNodeData">
  import type { TreeDropIntent } from "@fex-design/core/tree/features/dnd";
  import type { TreeNode, TreeNodeData } from "@fex-design/core/tree/types";
  import { treeDropIndicatorClassName } from "@fex-design/components-styles/tree";
  import { cn } from "@fex-design/utils";
  import { getContext, untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { treeContextKey, type TreeContext } from "./tree-context";
  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    item?: TreeNode<TNode>;
    intent?: TreeDropIntent | null;
  }
  let { item, intent, class: className, style, ...rest }: Props = $props();
  const { indent } = untrack(() =>
    getContext<TreeContext<TNode>>(treeContextKey),
  );
</script>

{#if intent?.valid && (!item || intent.targetKey === item.key)}
  <span
    {...rest}
    data-slot="tree-drop-indicator"
    data-position={intent.position}
    class={cn(treeDropIndicatorClassName, className)}
    style={`left:${intent.position === "inside" ? indent() : 4}px;bottom:0;transform:translateY(1px);${style ?? ""}`}
  ></span>
{/if}
