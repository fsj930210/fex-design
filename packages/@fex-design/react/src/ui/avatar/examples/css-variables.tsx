import { Avatar, AvatarGroup } from '@fex-design/react/ui/avatar'

export function CssVariablesExample() {
  return <AvatarGroup className="[--avatar-size:3rem] [--avatar-group-overlap:1rem]"><Avatar src="https://github.com/shadcn.png" fallback="FX" /><Avatar fallback="AB" /><Avatar fallback="CD" /></AvatarGroup>
}
