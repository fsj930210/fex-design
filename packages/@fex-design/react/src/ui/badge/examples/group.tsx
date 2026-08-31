import { Badge, BadgeGroup } from '@fex-design/react/ui/badge'
export function Group() {
  return (
    <BadgeGroup maxCount={3}>
      {['React', 'Vue', 'Solid', 'Svelte', 'Angular'].map((item) => (
        <Badge key={item} color="info">
          {item}
        </Badge>
      ))}
    </BadgeGroup>
  )
}
