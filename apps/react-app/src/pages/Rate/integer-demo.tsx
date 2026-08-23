import { Rate } from '@fex-design/react/primitive/rate'
import { Card } from '@fex-design/react/ui/card'
import { useState } from 'react'

export function IntegerDemo() {
  const [value, setValue] = useState(3)

  return (
    <Card
      title="Default integer"
      description="The default step is 1, so pointer and keyboard input select whole values."
    >
      <div className="grid gap-1.5">
        <Rate value={value} onValueChange={setValue} aria-label="Integer rating" />
        <p className="text-sm text-muted-foreground">Current value: {value}</p>
      </div>
    </Card>
  )
}
