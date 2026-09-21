import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@fex-design/react/primitive/avatar'

function Avatars() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
        <AvatarFallback>FX</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
        <AvatarFallback>FX</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
        <AvatarFallback>FX</AvatarFallback>
      </Avatar>
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
