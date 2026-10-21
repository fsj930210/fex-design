import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
} from '@fex-design/react/primitive/menu'

export function MenuIndicatorExample() {
  return (
    <div className="w-full max-w-xs rounded-lg border border-border p-1">
      <MenuRoot layout="inline">
        <MenuContent aria-label="自定义指示器">
          <MenuItem value="overview">概览</MenuItem>
          <SubMenu value="workspace">
            <SubMenuTrigger>工作空间</SubMenuTrigger>
            <SubMenuContent>
              <MenuItem value="members">成员</MenuItem>
            </SubMenuContent>
          </SubMenu>
          <SubMenu value="settings">
            <SubMenuTrigger
              indicator={
                <span className="inline-flex size-4 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
                  +
                </span>
              }
            >
              自定义指示器
            </SubMenuTrigger>
            <SubMenuContent>
              <MenuItem value="preferences">偏好设置</MenuItem>
            </SubMenuContent>
          </SubMenu>
          <MenuItem value="profile">个人资料</MenuItem>
        </MenuContent>
      </MenuRoot>
    </div>
  )
}
