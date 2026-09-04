import { useState } from 'react'
import { Anchor } from '@fex-design/react/ui/anchor'

const uncontrolled = [{ key: 'uncontrolled-first', title: '第一项', target: '#react-ui-uncontrolled-first' }, { key: 'uncontrolled-second', title: '第二项', target: '#react-ui-uncontrolled-second' }]
const controlled = [{ key: 'controlled-first', title: '第一项', target: '#react-ui-controlled-first' }, { key: 'controlled-second', title: '第二项', target: '#react-ui-controlled-second' }]

export function ControlledExample() {
  const [keys, setKeys] = useState<readonly string[]>(['controlled-second'])
  return <div className="grid gap-6 sm:grid-cols-2"><section className="rounded-lg border p-4"><strong>非受控</strong><Anchor items={uncontrolled} defaultActiveKeys={['uncontrolled-second']} onChange={(next, entries) => console.log('uncontrolled change', next, entries)} /><i id="react-ui-uncontrolled-first" /><i id="react-ui-uncontrolled-second" /></section><section className="rounded-lg border p-4"><strong>受控：{keys.join(', ')}</strong><Anchor items={controlled} activeKeys={keys} onChange={(next, entries) => { setKeys(next); console.log('controlled change', next, entries) }} /><i id="react-ui-controlled-first" /><i id="react-ui-controlled-second" /></section></div>
}
