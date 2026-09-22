import { useState } from 'react'
import { Select } from '@fex-design/react/ui/select'

const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]

export default function Example() {
  const [value, setValue] = useState('react')
  const [open, setOpen] = useState(false)
  const buttonClass = 'cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted'
  return <div className="flex flex-wrap gap-4">
    <div className="space-y-2"><div className="flex flex-wrap gap-2"><button className={buttonClass} type="button" onClick={() => setValue('react')}>设置 React</button><button className={buttonClass} type="button" onClick={() => setValue('vue')}>设置 Vue</button><button className={buttonClass} type="button" onClick={() => setOpen(true)}>打开面板</button><button className={buttonClass} type="button" onClick={() => setOpen(false)}>关闭面板</button></div><p className="text-sm text-muted-foreground">当前受控值：{value}；面板：{open ? '打开' : '关闭'}</p><Select className="w-60" options={options} value={value} onChange={(next) => setValue(String(next))} popoverProps={{ open, onOpenChange: setOpen }} /></div>
    <div className="space-y-2"><span>非受控 value / open</span><Select className="w-60" options={options} defaultValue="vue" popoverProps={{ defaultOpen: true }} /></div>
  </div>
}
