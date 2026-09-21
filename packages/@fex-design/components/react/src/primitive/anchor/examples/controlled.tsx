import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useState } from 'react'
function Items({ prefix }: { prefix: string }) {
  return (
    <>
      <AnchorRail>
        <AnchorIndicator />
      </AnchorRail>
      <AnchorList>
        <AnchorItem value={`${prefix}-first`} target={`#${prefix}-first`}>
          <AnchorLink>第一项</AnchorLink>
        </AnchorItem>
        <AnchorItem value={`${prefix}-second`} target={`#${prefix}-second`}>
          <AnchorLink>第二项</AnchorLink>
        </AnchorItem>
      </AnchorList>
    </>
  )
}
export function ControlledExample() {
  const [keys, setKeys] = useState<readonly string[]>(['controlled-second'])
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="rounded-lg border p-4">
        <strong>非受控</strong>
        <AnchorRoot
          defaultActiveKeys={['uncontrolled-second']}
          onChange={(next, items) => console.log('uncontrolled change', next, items)}
        >
          <Items prefix="uncontrolled" />
        </AnchorRoot>
        <div id="uncontrolled-first" />
        <div id="uncontrolled-second" />
      </section>
      <section className="rounded-lg border p-4">
        <strong>受控：{keys.join(', ')}</strong>
        <AnchorRoot
          activeKeys={keys}
          onChange={(next, items) => {
            setKeys(next)
            console.log('controlled change', next, items)
          }}
        >
          <Items prefix="controlled" />
        </AnchorRoot>
        <div id="controlled-first" />
        <div id="controlled-second" />
      </section>
    </div>
  )
}
