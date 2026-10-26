import { useState, useRef, type KeyboardEvent } from 'react'
import { Button } from '@fex-design/react/ui/button'
import { Input } from '@fex-design/react/ui/input'
import { TrashIcon } from '@fex-design/react/icons/trash'

interface Props {
  busy: boolean
  title: string
  leaf: boolean
  expanded: boolean
  onToggle(): void
  onSave(title: string): void
  onAdd(): void
  onRemove(): void
}
export function CrudRow({ busy, title, leaf, expanded, onToggle, onSave, onAdd, onRemove }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  // Enter/Escape may unmount the input before its blur handler runs. Finish each edit once.
  const finished = useRef(true)
  function save() {
    if (finished.current) return
    finished.current = true
    setEditing(false)
    if (draft.trim() && draft.trim() !== title) onSave(draft.trim())
  }
  function keydown(event: KeyboardEvent) {
    event.stopPropagation()
    if (event.key === 'Enter') {
      event.preventDefault()
      save()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      finished.current = true
      setEditing(false)
    }
  }
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      {leaf ? (
        <span className="size-5 shrink-0" />
      ) : (
        <button
          type="button"
          disabled={busy}
          className="size-5 shrink-0 rounded hover:bg-muted"
          aria-label={'展开或收起 ' + title}
          aria-expanded={expanded}
          onClick={(event) => {
            event.stopPropagation()
            onToggle()
          }}
        >
          {expanded ? '−' : '+'}
        </button>
      )}
      {editing ? (
        <div
          className="min-w-0 flex-1"
          onClick={(event) => event.stopPropagation()}
          onDoubleClick={(event) => event.stopPropagation()}
          onKeyDown={keydown}
          onBlur={save}
        >
          <Input value={draft} onValueChange={setDraft} autoFocus aria-label="节点名称" />
        </div>
      ) : (
        <button
          type="button"
          className="min-w-0 flex-1 truncate text-start"
          onDoubleClick={(event) => {
            event.stopPropagation()
            finished.current = false
            setDraft(title)
            setEditing(true)
          }}
        >
          {title}
        </button>
      )}
      <Button
        disabled={busy}
        size="sm"
        aria-label={'新增子节点到 ' + title}
        onClick={(event) => {
          event.stopPropagation()
          onAdd()
        }}
      >
        新增子节点
      </Button>
      <Button
        disabled={busy}
        size="sm"
        aria-label={'删除 ' + title}
        onClick={(event) => {
          event.stopPropagation()
          onRemove()
        }}
      >
        <TrashIcon className="size-4" />
      </Button>
    </div>
  )
}
