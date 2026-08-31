import { Avatar, AvatarFallback, AvatarImage } from '@fex-design/react/primitive/avatar'

export function BasicExample() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
      <AvatarFallback>FX</AvatarFallback>
    </Avatar>
  )
}
