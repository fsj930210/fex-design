import { useState } from 'react'
import { Badge } from '@fex-design/react/ui/badge'
import { SwitchRoot, SwitchThumb } from '@fex-design/react/primitive/switch'
export function Zero() {
  const [showZero, setShowZero] = useState(false)
  return (
    <div className="flex items-center gap-6">
      <label className="flex items-center gap-2">
        <SwitchRoot checked={showZero} onCheckedChange={setShowZero} aria-label="显示 0">
          <SwitchThumb />
        </SwitchRoot>
        <span>显示 0</span>
      </label>
      <Badge count={0} showZero={showZero}>
        <span className="block size-10 rounded bg-muted-background" />
      </Badge>
    </div>
  )
}
