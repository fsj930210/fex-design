<script lang="ts">
  import type { TreeBehaviorProps } from "@fex-design/svelte/ui/tree";

  import { Tree } from "@fex-design/svelte/ui/tree";
  import { Button } from "@fex-design/svelte/ui/button";
  import { treeDemoData } from "./_data/tree-demo";
  let {
    kind,
    controlled,
    multiple = false,
    strict = false,
    data = treeDemoData,
  }: {
    kind: "expanded" | "selected" | "checked";
    controlled: boolean;
    multiple?: boolean;
    strict?: boolean;
    data?: readonly Record<string, unknown>[];
  } = $props();
  const initial = kind === "expanded" ? ["root-1"] : ["root-1-group-1-item-1"];
  let keys = $state<readonly (string | number)[]>(initial);
  const change = (next: readonly (string | number)[]) => {
    keys = next;
  };
  const treeProps = $derived<TreeBehaviorProps<Record<string, unknown>>>({
    treeData: data,
    multiple: multiple,
    checkStrict: strict,
    ...(kind !== "expanded"
      ? { defaultExpandedKeys: ["root-1", "root-1-group-1"] }
      : {}),
    ...(controlled
      ? { [kind + "Keys"]: keys }
      : {
          ["default" + kind[0]!.toUpperCase() + kind.slice(1) + "Keys"]:
            initial,
        }),
    ...(kind === "expanded" ? { onExpand: change } : {}),
    ...(kind === "selected" ? { onSelect: change } : {}),
    ...(kind === "checked" ? { onCheck: change } : {}),
  });
  const append = () => {
    const additions =
      kind === "expanded"
        ? ["root-2", "root-2-group-3"]
        : multiple
          ? ["root-1-group-1-item-1", "root-1-group-1-item-2"]
          : ["root-1-group-1-item-2"];
    keys =
      kind === "selected" && !multiple
        ? additions
        : [...new Set([...keys, ...additions])];
  };
</script>

<section class="grid w-full gap-space-sm">
  <h3 class="font-medium">
    {controlled ? "受控" : "非受控"} · {kind === "expanded"
      ? "展开 / 收起"
      : kind === "selected"
        ? multiple
          ? "多选"
          : "单选"
        : strict
          ? "严格勾选"
          : "父子级联"}
  </h3>
  {#if kind === "selected"}<p class="text-xs text-muted-foreground">
      Item 1.1.3 设置 selectable: false：不可选择，其他节点仍可正常选择。
    </p>{/if}
  {#if kind === "checked"}<p class="text-xs text-muted-foreground">
      Item 1.1.3 设置 disableCheckbox: true：不可勾选，也不参与父子级联。
    </p>{/if}
  {#if controlled}<div class="flex flex-wrap gap-2">
      <Button onclick={append}
        >{kind === "expanded"
          ? "追加展开 Department 2 / Group 2.3"
          : multiple
            ? "追加选择 Item 1.1.1 和 1.1.2"
            : kind === "checked"
              ? "追加勾选 Item 1.1.2"
              : "选择 Item 1.1.2（单选）"}</Button
      ><Button onclick={() => (keys = [])}
        >{kind === "expanded" ? "全部收起" : "清空"}</Button
      ><Button onclick={() => (keys = initial)}>重置</Button>
    </div>{/if}
  <div class="h-48 overflow-y-auto">
    <Tree {...treeProps} checkable={kind === "checked"} />
  </div>
  <output class="break-all text-xs text-muted-foreground" aria-live="polite"
    >{kind}Keys：{keys.join(", ") || "无"}</output
  >
</section>
