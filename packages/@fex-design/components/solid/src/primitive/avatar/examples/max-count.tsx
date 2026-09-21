import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from '@fex-design/solid/primitive/avatar'
export function MaxCountExample() {
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
      <AvatarGroupCount class="rounded-md">+3</AvatarGroupCount>
    </AvatarGroup>
  )
}
