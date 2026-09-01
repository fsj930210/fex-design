import { Tag } from '@fex-design/react/ui/tag'
import { useState } from 'react'

const initialTags = [
  { id: 1, label: '设计' },
  { id: 2, label: '开发' },
  { id: 3, label: '测试' },
]

export default function Dynamic() {
  const [tags, setTags] = useState(initialTags)
  const [name, setName] = useState('')
  const addTag = () => {
    const label = name.trim()
    if (!label) return
    setTags((current) => [...current, { id: Date.now(), label }])
    setName('')
  }
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag.id} color="primary" closable onClose={() => setTags((items) => items.filter((item) => item.id !== tag.id))}>{tag.label}</Tag>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="h-8 rounded-md border px-2 text-sm" value={name} placeholder="输入标签名称" onChange={(event) => setName(event.target.value)} />
        <button type="button" className="h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground" onClick={addTag}>添加标签</button>
      </div>
    </div>
  )
}
