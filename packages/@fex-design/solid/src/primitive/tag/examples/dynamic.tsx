import { Tag, TagClose } from '@fex-design/solid/primitive/tag'
import { createSignal, For } from 'solid-js'

const initialTags = [{ id: 1, label: '设计' }, { id: 2, label: '开发' }, { id: 3, label: '测试' }]

export default function Dynamic() {
  const [tags, setTags] = createSignal(initialTags)
  const [name, setName] = createSignal('')
  const addTag = () => {
    const label = name().trim()
    if (!label) return
    setTags((items) => [...items, { id: Date.now(), label }])
    setName('')
  }
  return <div class="grid gap-3"><div class="flex flex-wrap gap-2"><For each={tags()}>{(tag) => <Tag color="primary">{tag.label}<TagClose aria-label={`删除${tag.label}`} onClick={() => setTags((items) => items.filter((item) => item.id !== tag.id))} /></Tag>}</For></div><div class="flex gap-2"><input class="h-8 rounded-md border px-2 text-sm" value={name()} placeholder="输入标签名称" onInput={(event) => setName(event.currentTarget.value)} /><button type="button" class="h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground" onClick={addTag}>添加标签</button></div></div>
}
