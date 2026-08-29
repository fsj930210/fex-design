import { Avatar, AvatarGroup } from '@fex-design/react/ui/avatar'

const names = ['shadcn', 'shadcn', 'shadcn', 'shadcn', 'shadcn', 'shadcn']

export function MaxCountExample() {
  return (
    <AvatarGroup
      maxCount={3}
      renderOverflow={(count) => (
        <span className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-muted-background text-sm font-medium text-muted-foreground ring-2 ring-background">
          +{count}
        </span>
      )}
    >
      {names.map((name, index) => (
        <Avatar
          key={`${name}-${index}`}
          shape="square"
          src="https://github.com/shadcn.png"
          alt={`${name} avatar`}
          fallback="FX"
        />
      ))}
    </AvatarGroup>
  )
}
