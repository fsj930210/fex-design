<script lang="ts">
  import { Button } from "@fex-design/svelte/ui/button";
  import {
    Menu,
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
  } from "@fex-design/svelte/ui/menu";
  let value = $state(["members"]);
  let open = $state(["workspace"]);
</script>

<div class="grid w-full max-w-2xl gap-4">
  <div class="flex flex-wrap gap-2">
    <Button size="sm" onclick={() => (value = ["members"])}>设置成员</Button>
    <Button size="sm" onclick={() => (value = ["profile"])}>设置个人资料</Button
    >
    <Button size="sm" onclick={() => (value = [])}>清空选择</Button>
    <Button size="sm" onclick={() => (open = ["workspace"])}
      >展开工作空间</Button
    >
    <Button size="sm" onclick={() => (open = [])}>收起工作空间</Button>
  </div>
  <p class="text-sm text-muted-foreground">
    选择：{JSON.stringify(value)}；展开：{JSON.stringify(open)}
  </p>
  <div class="grid items-start gap-4 sm:grid-cols-2">
    <section class="grid min-w-0 gap-2">
      <h3 class="text-sm font-medium">受控 value / openValues</h3>
      <Menu
        {value}
        openValues={open}
        onValueChange={(next) => (value = next)}
        onOpenChange={(next) => (open = next)}
        layout="inline"
        class="w-full max-w-xs rounded-lg border border-border p-1"
        aria-label="受控菜单"
      >
        <SubMenu value="workspace">
          <SubMenuTrigger>工作空间</SubMenuTrigger>
          <SubMenuContent
            ><MenuItem value="members">成员</MenuItem></SubMenuContent
          >
        </SubMenu>
        <MenuItem value="profile">个人资料</MenuItem>
      </Menu>
    </section>
    <section class="grid min-w-0 gap-2">
      <h3 class="text-sm font-medium">
        非受控 defaultValue / defaultOpenValues
      </h3>
      <Menu
        defaultValue={["members"]}
        defaultOpenValues={["workspace"]}
        layout="inline"
        class="w-full max-w-xs rounded-lg border border-border p-1"
        aria-label="非受控菜单"
      >
        <SubMenu value="workspace">
          <SubMenuTrigger>工作空间</SubMenuTrigger>
          <SubMenuContent
            ><MenuItem value="members">成员</MenuItem></SubMenuContent
          >
        </SubMenu>
        <MenuItem value="profile">个人资料</MenuItem>
      </Menu>
    </section>
  </div>
</div>
