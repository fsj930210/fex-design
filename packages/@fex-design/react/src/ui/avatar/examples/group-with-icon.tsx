import { PlusIcon } from '@fex-design/react/icon/plus'
import { Avatar, AvatarGroup } from '@fex-design/react/ui/avatar'

const names = ['shadcn', 'shadcn', 'shadcn', 'shadcn']

export function GroupWithIconExample() {
  return (
    <AvatarGroup
      maxCount={3}
      renderOverflow={() => (
        <span
          className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted-background text-muted-foreground ring-2 ring-background [&>svg]:size-4"
          aria-label="Add avatar"
        >
          <PlusIcon />
        </span>
      )}
    >
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
