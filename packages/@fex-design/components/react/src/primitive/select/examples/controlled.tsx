import { useState } from 'react'
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/react/primitive/select'

const options = [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]

export default function Example() {
  const [value, setValue] = useState('react')
  const [open, setOpen] = useState(false)
  const buttonClass = 'cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted'
  return <div className="flex flex-wrap gap-4">
    <div className="space-y-2"><div className="flex flex-wrap gap-2"><button className={buttonClass} type="button" onClick={() => setValue('react')}>设置 React</button><button className={buttonClass} type="button" onClick={() => setValue('vue')}>设置 Vue</button><button className={buttonClass} type="button" onClick={() => setOpen(true)}>打开面板</button><button className={buttonClass} type="button" onClick={() => setOpen(false)}>关闭面板</button></div><p className="text-sm text-muted-foreground">当前受控值：{value}；面板：{open ? '打开' : '关闭'}</p><SelectRoot options={options} value={value} onChange={(next) => setValue(String(next))} open={open} onOpenChange={setOpen}><SelectTrigger className="w-60" /><SelectContent /></SelectRoot></div>
    <div className="space-y-2"><span>非受控 value / open</span><SelectRoot options={options} defaultValue="vue" defaultOpen><SelectTrigger className="w-60" /><SelectContent /></SelectRoot></div>
  </div>
}
