<script lang="ts">
  import { useMenu, type MenuBranch } from "@fex-design/svelte/primitive/menu";
  import {
    menuCustomItemClass,
    menuCustomActionClass,
  } from "@fex-design/docs-shared/menu-demo";
  const { controller, dom, snapshot } = useMenu({
    layout: "inline",
    defaultValue: ["overview"],
    defaultOpenValues: ["workspace"],
  });
  const branch: MenuBranch = { value: () => "workspace", parent: undefined };
  const bindings = {
    content: (element: HTMLElement) => dom.bindContent(element),
    overview: (element: HTMLElement) =>
      dom.bindItem(element, () => ({ value: "overview" })),
    workspace: (element: HTMLElement) =>
      dom.bindItem(element, () => ({ value: "workspace" }), undefined, branch),
    nested: (element: HTMLElement) => dom.bindContent(element, branch),
    members: (element: HTMLElement) =>
      dom.bindItem(element, () => ({ value: "members" }), branch),
    roles: (element: HTMLElement) =>
      dom.bindItem(element, () => ({ value: "roles" }), branch),
    billing: (element: HTMLElement) =>
      dom.bindItem(
        element,
        () => ({ value: "billing", disabled: true }),
        branch,
      ),
    profile: (element: HTMLElement) =>
      dom.bindItem(element, () => ({ value: "profile" })),
  };
  function host(element: HTMLElement, key: keyof typeof bindings) {
    return { destroy: bindings[key](element) };
  }
  function selectRoles() {
    controller.setValue(["roles"]);
    controller.setOpen("workspace", true);
  }
  function clear() {
    controller.setValue([]);
    controller.closeAll();
  }
</script>

<div class="grid w-full max-w-lg gap-3">
  <div class="flex flex-wrap gap-2">
    <button type="button" class={menuCustomActionClass} onclick={selectRoles}
      >通过 controller 选择角色并展开</button
    >
    <button type="button" class={menuCustomActionClass} onclick={clear}
      >清空并收起</button
    >
  </div>
  <div
    use:host={"content"}
    aria-label="手写 Menu"
    class="w-full max-w-xs rounded-xl border border-border bg-background p-2 shadow-sm"
  >
    <p
      aria-hidden="true"
      class="px-3 py-2 text-xs font-medium text-muted-foreground"
    >
      自定义工作台
    </p>
    <a use:host={"overview"} class={menuCustomItemClass} href="#overview"
      >概览</a
    >
    <button use:host={"workspace"} type="button" class={menuCustomItemClass}>
      <span>工作空间</span><span aria-hidden="true"
        >{snapshot().openValues.includes("workspace") ? "−" : "+"}</span
      >
    </button>
    <div use:host={"nested"} class="ms-3 border-s border-border ps-2">
      <button use:host={"members"} type="button" class={menuCustomItemClass}
        >成员</button
      >
      <button use:host={"roles"} type="button" class={menuCustomItemClass}
        >角色</button
      >
      <button
        use:host={"billing"}
        type="button"
        class={menuCustomItemClass}
        disabled>账单（禁用）</button
      >
    </div>
    <div role="separator" class="my-2 h-px bg-border"></div>
    <div role="group" aria-label="账户">
      <a use:host={"profile"} class={menuCustomItemClass} href="#profile"
        >个人资料</a
      >
    </div>
  </div>
  <output class="break-all rounded-md bg-muted-background p-3 text-xs">
    选择：{JSON.stringify(snapshot().value)}；展开：{JSON.stringify(
      snapshot().openValues,
    )}
  </output>
</div>
