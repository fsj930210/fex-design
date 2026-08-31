import { Avatar, AvatarGroup } from '@fex-design/solid/ui/avatar'
export function GroupShapeExample() {
  return (
    <AvatarGroup>
      <Avatar shape="square" fallback="FX" />
      <Avatar shape="square" fallback="FX" />
      <Avatar shape="square" fallback="FX" />
    </AvatarGroup>
  )
}
