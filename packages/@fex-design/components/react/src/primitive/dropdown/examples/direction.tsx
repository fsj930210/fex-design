import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'

export function DropdownDirectionExample() {
  return (
    <div className="flex min-h-64 flex-wrap justify-around gap-8 p-6">
      {(['ltr', 'rtl'] as const).map((dir) => (
        <div key={dir} dir={dir} className="flex flex-col items-start gap-3">
          <span>{dir.toUpperCase()}</span>
          <DropdownRoot menuProps={{ dir }}>
            <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
            <DropdownPortal>
              <DropdownContent>
                <MenuItem value="rename">重命名</MenuItem>
                <SubMenu value="share">
                  <SubMenuTrigger>分享</SubMenuTrigger>
                  <SubMenuContent>
                    <MenuItem value="link">复制链接</MenuItem>
                  </SubMenuContent>
                </SubMenu>
              </DropdownContent>
            </DropdownPortal>
          </DropdownRoot>
        </div>
      ))}
    </div>
  )
}
