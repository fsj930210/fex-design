<script lang="ts">
  import {
    MenuRoot,
    MenuContent,
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
  } from "@fex-design/svelte/primitive/menu";
</script>

<div class="grid w-full max-w-2xl gap-6 md:grid-cols-2">
  <section class="min-w-0 max-w-xs">
    <h3>LTR</h3>
    <MenuRoot dir="ltr">
      <MenuContent aria-label="LTR menu"
        ><MenuItem value="overview">概览</MenuItem>
        <SubMenu value="workspace">
          <SubMenuTrigger>工作空间</SubMenuTrigger>
          <SubMenuContent
            ><MenuItem value="members">成员</MenuItem>
            <SubMenu value="settings">
              <SubMenuTrigger>设置</SubMenuTrigger>
              <SubMenuContent
                ><MenuItem value="general">通用设置</MenuItem><MenuItem
                  value="billing"
                  disabled>账单</MenuItem
                ></SubMenuContent
              >
            </SubMenu></SubMenuContent
          >
        </SubMenu>
        <MenuItem value="profile">个人资料</MenuItem></MenuContent
      >
    </MenuRoot>
  </section>
  <section class="min-w-0 max-w-xs">
    <h3>RTL</h3>
    <MenuRoot dir="rtl">
      <MenuContent aria-label="RTL menu"
        ><MenuItem value="overview">概览</MenuItem>
        <SubMenu value="workspace">
          <SubMenuTrigger>工作空间</SubMenuTrigger>
          <SubMenuContent
            ><MenuItem value="members">成员</MenuItem>
            <SubMenu value="settings">
              <SubMenuTrigger>设置</SubMenuTrigger>
              <SubMenuContent
                ><MenuItem value="general">通用设置</MenuItem><MenuItem
                  value="billing"
                  disabled>账单</MenuItem
                ></SubMenuContent
              >
            </SubMenu></SubMenuContent
          >
        </SubMenu>
        <MenuItem value="profile">个人资料</MenuItem></MenuContent
      >
    </MenuRoot>
  </section>
</div>
