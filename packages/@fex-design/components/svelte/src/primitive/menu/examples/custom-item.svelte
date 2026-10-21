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

  let selected = $state(["members"]);
</script>

<div class="grid w-full max-w-sm gap-3">
  <MenuRoot
    layout="inline"
    defaultValue={["members"]}
    defaultOpenValues={["workspace"]}
    onValueChange={(next) => (selected = next)}
  >
    <MenuContent class="rounded-xl border border-border bg-background p-2">
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
      <MenuGroup>
        <MenuGroupLabel>账户</MenuGroupLabel>
        <MenuItem value="profile" textValue="个人资料" class="h-auto py-2"
          >{#snippet trigger(binding)}<a
              {...binding.props}
              use:binding.action
              href="#profile"
            >
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
              </span>
            </a>{/snippet}</MenuItem
        >
        <MenuItem value="logout">退出登录</MenuItem>
      </MenuGroup>
    </MenuContent>
  </MenuRoot>
  <output class="break-all text-sm">选中值：{JSON.stringify(selected)}</output>
</div>
