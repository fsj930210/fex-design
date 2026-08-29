import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@fex-design/react/primitive/avatar'

export function CssVariablesExample() {
  return <AvatarGroup className="[--avatar-size:3rem] [--avatar-group-overlap:1rem]"><Avatar><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback>FX</AvatarFallback></Avatar><Avatar><AvatarFallback>AB</AvatarFallback></Avatar><Avatar><AvatarFallback>CD</AvatarFallback></Avatar></AvatarGroup>
}
