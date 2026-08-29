import { Avatar, AvatarFallback, AvatarGroup } from '@fex-design/solid/primitive/avatar'
export function GroupShapeExample() {
  return (
    <AvatarGroup>
      <Avatar shape="square">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarFallback>BL</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarFallback>CS</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
