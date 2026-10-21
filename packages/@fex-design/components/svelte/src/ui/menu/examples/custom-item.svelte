<script lang="ts">
  import {
    Menu,
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
    MenuGroup,
    MenuSeparator,
  } from "@fex-design/svelte/ui/menu";

  let selected = $state(["members"]);
</script>

<div class="grid w-full max-w-sm gap-3">
  <Menu
    layout="inline"
    defaultValue={["members"]}
    defaultOpenValues={["workspace"]}
    onValueChange={(next) => (selected = next)}
    class="rounded-xl border border-border bg-background p-2"
  >
    <MenuItem value="overview">概览</MenuItem>
    <SubMenu value="workspace">
      <SubMenuTrigger>工作空间</SubMenuTrigger>
      <SubMenuContent>
        <MenuItem value="members">成员</MenuItem>
        <MenuItem value="roles">角色</MenuItem>
        <MenuItem value="billing" disabled>账单</MenuItem>
      </SubMenuContent>
    </SubMenu>
    <MenuSeparator />
    <MenuGroup label="账户">
      <MenuItem value="profile" textValue="个人资料" class="h-auto py-2">
        <span class="flex flex-1 items-center gap-3">
          <span
            class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary"
            >张</span
          >
          <span class="grid flex-1">
            <strong>张三 · 个人资料</strong>
            <small class="text-muted-foreground">管理账户与偏好</small>
          </span>
          <span class="rounded bg-primary/10 px-2 text-xs text-primary"
            >链接</span
          >
        </span>{#snippet trigger(binding)}<a
            {...binding.props}
            use:binding.action
            href="#profile">{@render binding.content()}</a
          >{/snippet}</MenuItem
      >
      <MenuItem value="logout">退出登录</MenuItem>
    </MenuGroup>
  </Menu>
  <output class="break-all text-sm">选中值：{JSON.stringify(selected)}</output>
</div>
