import { useState } from 'react'
import { Badge } from '@fex-design/react/primitive/badge'
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
      <span className="relative inline-flex">
        <span className="block size-10 rounded bg-muted-background" />
        <Badge
          count={0}
          showZero={showZero}
          className="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
        />
      </span>
    </div>
  )
}
