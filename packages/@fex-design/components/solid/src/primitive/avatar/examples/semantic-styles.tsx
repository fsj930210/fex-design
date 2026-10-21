import { Avatar, AvatarFallback } from '@fex-design/solid/primitive/avatar'
export function AvatarSemanticStylesExample() {
  return (
    <Avatar
      class="ring-2 ring-primary"
      style={{ 'box-shadow': '0 0 0 4px color-mix(in srgb, var(--primary) 20%, transparent)' }}
    >
      <AvatarFallback class="bg-primary text-primary-foreground">FX</AvatarFallback>
    </Avatar>
  )
}
