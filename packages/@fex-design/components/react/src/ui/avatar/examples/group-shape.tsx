import { Avatar, AvatarGroup } from '@fex-design/react/ui/avatar'

export function GroupShapeExample() {
  return (
    <AvatarGroup>
      <Avatar
        shape="square"
        src="https://github.com/shadcn.png"
        alt="shadcn avatar"
        fallback="FX"
      />
      <Avatar
        shape="square"
        src="https://github.com/shadcn.png"
        alt="shadcn avatar"
        fallback="FX"
      />
      <Avatar
        shape="square"
        src="https://github.com/shadcn.png"
        alt="shadcn avatar"
        fallback="FX"
      />
    </AvatarGroup>
  )
}
