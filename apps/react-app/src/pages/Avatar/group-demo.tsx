import { Avatar, AvatarGroup } from '@fex-design/react/ui/avatar'
import { Card } from '@fex-design/react/ui/card'

export function GroupDemo() {
  return (
    <Card title="Avatar group" description="Keep the first avatars visible and summarize the rest.">
      <AvatarGroup maxCount={3}>
        {['AM', 'BL', 'CS', 'DT', 'ER'].map((name) => (
          <Avatar key={name}>{name}</Avatar>
        ))}
      </AvatarGroup>
    </Card>
  )
}
