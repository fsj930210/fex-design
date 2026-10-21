import { Avatar, AvatarFallback } from '@fex-design/react/primitive/avatar'

export function AvatarSemanticStylesExample() {
  return (
    <Avatar className="ring-2 ring-primary" style={{ boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary) 20%, transparent)' }}>
      <AvatarFallback className="bg-primary text-primary-foreground">FX</AvatarFallback>
    </Avatar>
  )
}
