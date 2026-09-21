import { Switch } from '@fex-design/react/ui/switch'
import { useState, type CSSProperties } from 'react'
import { Button } from '@fex-design/react/ui/button'

export default function Example() {
  const [roundedChecked, setRoundedChecked] = useState(false)
  const [pillChecked, setPillChecked] = useState(false)
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="grid justify-items-start gap-2">
        <span className="text-sm text-muted-foreground">rounded</span>
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid justify-items-start gap-2">
            <span className="text-xs">非受控</span>
            <Switch shape="rounded" aria-label="rounded 非受控"></Switch>
            <span className="mt-2 text-xs">受控</span>
            <Switch
              shape="rounded"
              checked={roundedChecked}
              onChange={setRoundedChecked}
              aria-label="rounded 受控"
            ></Switch>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setRoundedChecked(true)}>
                开启
              </Button>
              <Button size="sm" onClick={() => setRoundedChecked(false)}>
                关闭
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="grid justify-items-start gap-2">
        <span className="text-sm text-muted-foreground">pill</span>
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid justify-items-start gap-2">
            <span className="text-xs">非受控</span>
            <Switch shape="pill" aria-label="pill 非受控"></Switch>
            <span className="mt-2 text-xs">受控</span>
            <Switch
              shape="pill"
              checked={pillChecked}
              onChange={setPillChecked}
              aria-label="pill 受控"
            ></Switch>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setPillChecked(true)}>
                开启
              </Button>
              <Button size="sm" onClick={() => setPillChecked(false)}>
                关闭
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
