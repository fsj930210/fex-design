import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@fex-design/react/primitive/avatar'

export function GroupShapeExample() {
  return (
    <AvatarGroup>
      <Avatar shape="square">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
        <AvatarFallback>FX</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
        <AvatarFallback>FX</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
        <AvatarFallback>FX</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
