import { Badge, BadgeGroup } from '@fex-design/solid/ui/badge'
export function Group() {
  return (
    <BadgeGroup maxCount={3}>
      {['Vue', 'React', 'Solid', 'Svelte', 'Angular'].map((item) => (
        <Badge color="info">{item}</Badge>
      ))}
    </BadgeGroup>
  )
}
