import { Avatar, AvatarGroup } from '@fex-design/react/ui/avatar'

function Avatars() {
  return (
    <AvatarGroup>
      <Avatar src="https://github.com/shadcn.png" alt="shadcn avatar" fallback="FX" />
      <Avatar src="https://github.com/shadcn.png" alt="shadcn avatar" fallback="FX" />
      <Avatar src="https://github.com/shadcn.png" alt="shadcn avatar" fallback="FX" />
    </AvatarGroup>
  )
}

export function DirectionExample() {
  return (
    <div className="flex items-center gap-8">
      <div dir="ltr">
        <p className="mb-2 text-xs text-muted-foreground">LTR · 中文示例</p>
        <Avatars />
      </div>
      <div dir="rtl">
        <p className="mb-2 text-xs text-muted-foreground">RTL · مثال عربي</p>
        <Avatars />
      </div>
    </div>
  )
}
