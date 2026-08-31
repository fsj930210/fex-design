import { Avatar } from '@fex-design/react/ui/avatar'

export function StylingExample() {
  return (
    <Avatar
      fallback="FX"
      classNames={{ root: 'ring-2 ring-primary', fallback: 'bg-primary text-primary-foreground' }}
      styles={{
        root: { boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary) 20%, transparent)' },
      }}
    />
  )
}
