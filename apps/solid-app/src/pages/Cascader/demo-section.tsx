import { Card } from '@fex-design/solid/ui/card'
import type { ParentProps } from 'solid-js'
export function DemoSection(props: ParentProps<{ title: string; description: string }>) {
  return (
    <Card title={props.title} description={props.description}>
      <div class="max-w-xl space-y-2">{props.children}</div>
    </Card>
  )
}
