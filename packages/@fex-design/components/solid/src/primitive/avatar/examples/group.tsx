import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@fex-design/solid/primitive/avatar'
function Item() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
      <AvatarFallback>FX</AvatarFallback>
    </Avatar>
  )
}
export function GroupExample() {
  return (
    <AvatarGroup>
      <Item />
      <Item />
      <Item />
    </AvatarGroup>
  )
}
