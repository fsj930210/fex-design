import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@fex-design/react/primitive/avatar'

export function MaxCountExample() {
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
      <AvatarGroupCount className="rounded-md">+3</AvatarGroupCount>
    </AvatarGroup>
  )
}
