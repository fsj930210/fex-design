<script lang="ts">
  import { Menu } from "@fex-design/svelte/ui/menu";
  import { Button } from "@fex-design/svelte/ui/button";
  import type { MenuPopoverProps } from "@fex-design/svelte/ui/menu";
  import type {
    MenuClassNames,
    MenuStyles,
    MenuItemData,
  } from "@fex-design/svelte/ui/menu";
  let styled = $state(true),
    open = $state(["workspace"]);
  const names: MenuClassNames = $derived(
    styled
      ? {
          root: "rounded-xl border-2 border-violet-300 bg-violet-50 p-2",
          item: "rounded-lg hover:bg-violet-100 data-[selected=true]:bg-violet-200 data-[selected=true]:text-violet-950",
          subMenuTrigger:
            "rounded-lg bg-violet-100 text-violet-950 hover:bg-violet-200",
          subMenuContent: "min-w-48",
          group: "rounded-lg bg-violet-100/50",
          separator: "bg-violet-300",
        }
      : {
          root: "rounded-xl border border-border bg-background p-2",
          subMenuContent: "min-w-48",
        },
  );
  const partStyles: MenuStyles | undefined = $derived(
    styled
      ? {
          root: "border-radius:16px",
          item: "font-weight:500",
          subMenuTrigger: "font-weight:600",
        }
      : undefined,
  );
  const popup: MenuPopoverProps | undefined = $derived(
    styled
      ? {
          classNames: {
            root: "border-2 border-violet-300 bg-violet-50",
            content: "rounded-lg bg-violet-100/50 p-2",
          },
          styles: { root: "border-radius:16px", content: "gap:8px" },
        }
      : undefined,
  );
  function show(next: boolean) {
    styled = next;
    open = ["workspace"];
  }
  const items: readonly MenuItemData[] = $derived([
    { value: "overview", label: "概览" },
    {
      value: "workspace",
      label: "工作空间",
      popoverProps: popup,
      children: [
        { value: "members", label: "成员" },
        { value: "roles", label: "角色" },
        { value: "billing", label: "账单", disabled: true },
      ],
    },
    { type: "separator", key: "account-separator" },
    {
      type: "group",
      key: "account",
      label: "账户",
      children: [
        { value: "profile", label: "个人资料" },
        { value: "logout", label: "退出登录" },
      ],
    },
  ]);
</script>

<div class="grid min-h-80 w-full max-w-xl content-start gap-3">
  <div class="flex gap-2">
    <Button size="sm" onclick={() => show(false)}>默认样式</Button>
    <Button size="sm" onclick={() => show(true)}>整体定制</Button>
  </div>
  <Menu
    layout="vertical"
    defaultValue={["overview"]}
    openValues={open}
    onOpenChange={(next) => (open = next)}
    class="w-44 max-w-full"
    {items}
    classNames={names}
    styles={partStyles}
  />
</div>
