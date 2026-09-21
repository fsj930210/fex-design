import { Avatar, AvatarGroup } from '@fex-design/react/ui/avatar'

const names = ['shadcn', 'shadcn', 'shadcn']

export function GroupExample() {
  return (
    <AvatarGroup>
      {names.map((name, index) => (
        <Avatar
          key={`${name}-${index}`}
          src="https://github.com/shadcn.png"
          alt={`${name} avatar`}
          fallback="FX"
        />
      ))}
    </AvatarGroup>
  )
}
