import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
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
export function GroupCountExample() {
  return (
    <AvatarGroup>
      <Item />
      <Item />
      <Item />
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}
