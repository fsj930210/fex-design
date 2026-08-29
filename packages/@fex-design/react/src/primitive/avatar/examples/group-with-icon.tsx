import { PlusIcon } from '@fex-design/react/icon/plus'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@fex-design/react/primitive/avatar'

function Item() {
  return <Avatar><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback>FX</AvatarFallback></Avatar>
}

export function GroupWithIconExample() {
  return <AvatarGroup><Item /><Item /><Item /><AvatarGroupCount aria-label="Add avatar"><PlusIcon /></AvatarGroupCount></AvatarGroup>
}
