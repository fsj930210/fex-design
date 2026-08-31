import { Avatar, AvatarGroup } from '@fex-design/solid/ui/avatar'

export function DirectionExample() {
  return (
    <div class="flex items-center gap-8">
      <div dir="ltr">
        <p>LTR</p>
        <AvatarGroup>
          <Avatar src="https://github.com/shadcn.png" fallback="FX" />
          <Avatar src="https://github.com/shadcn.png" fallback="FX" />
          <Avatar src="https://github.com/shadcn.png" fallback="FX" />
        </AvatarGroup>
      </div>
      <div dir="rtl">
        <p>RTL</p>
        <AvatarGroup>
          <Avatar src="https://github.com/shadcn.png" fallback="FX" />
          <Avatar src="https://github.com/shadcn.png" fallback="FX" />
          <Avatar src="https://github.com/shadcn.png" fallback="FX" />
        </AvatarGroup>
      </div>
    </div>
  )
}
