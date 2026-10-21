<script lang="ts">
  import {
    MenuRoot,
    MenuContent,
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
    MenuGroup,
    MenuGroupLabel,
    MenuSeparator,
  } from "@fex-design/svelte/primitive/menu";
  import { Button } from "@fex-design/svelte/ui/button";
  import type { MenuPopoverProps } from "@fex-design/svelte/primitive/menu";
  import type {
    MenuClassNames,
    MenuStyles,
  } from "@fex-design/svelte/primitive/menu";
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
</script>

<div class="grid min-h-80 w-full max-w-xl content-start gap-3">
  <div class="flex gap-2">
    <Button size="sm" onclick={() => show(false)}>默认样式</Button>
    <Button size="sm" onclick={() => show(true)}>整体定制</Button>
  </div>
  <MenuRoot
    layout="vertical"
    defaultValue={["overview"]}
    openValues={open}
    onOpenChange={(next) => (open = next)}
  >
    <MenuContent
      class={"w-44 max-w-full " + names.root}
      style={partStyles?.root}
    >
      <MenuItem value="overview" class={names.item} style={partStyles?.item}
        >概览</MenuItem
      >
      <SubMenu value="workspace" popoverProps={popup}>
        <SubMenuTrigger
          class={names.subMenuTrigger}
          style={partStyles?.subMenuTrigger}>工作空间</SubMenuTrigger
        >
        <SubMenuContent
          class={names.subMenuContent}
          style={partStyles?.subMenuContent}
        >
          <MenuItem value="members" class={names.item} style={partStyles?.item}
            >成员</MenuItem
          >
          <MenuItem value="roles" class={names.item} style={partStyles?.item}
            >角色</MenuItem
          >
          <MenuItem
            value="billing"
            class={names.item}
            style={partStyles?.item}
            disabled>账单</MenuItem
          >
        </SubMenuContent>
      </SubMenu>
      <MenuSeparator class={names.separator} style={partStyles?.separator} />
      <MenuGroup class={names.group} style={partStyles?.group}>
        <MenuGroupLabel>账户</MenuGroupLabel>
        <MenuItem value="profile" class={names.item} style={partStyles?.item}
          >个人资料</MenuItem
        >
        <MenuItem value="logout" class={names.item} style={partStyles?.item}
          >退出登录</MenuItem
        >
      </MenuGroup>
    </MenuContent>
  </MenuRoot>
</div>
