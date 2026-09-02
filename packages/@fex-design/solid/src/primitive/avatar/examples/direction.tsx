import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@fex-design/solid/primitive/avatar'
function Group() {
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
    <div class="flex items-center gap-8">
      <div dir="ltr">
        <p class="mb-2 text-xs text-muted-foreground">LTR · 中文示例</p>
        <Group />
      </div>
      <div dir="rtl">
        <p class="mb-2 text-xs text-muted-foreground">RTL · مثال عربي</p>
        <Group />
      </div>
    </div>
  )
}
