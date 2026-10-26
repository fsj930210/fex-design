import { createSignal, Show } from 'solid-js'
import { Button } from '@fex-design/solid/ui/button'
import { Input } from '@fex-design/solid/ui/input'
import { TrashIcon } from '@fex-design/solid/icons/trash'
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
export function CrudRow(props: Props) {
  const [editing, setEditing] = createSignal(false)
  const [draft, setDraft] = createSignal('')
  function save() {
    if (!editing()) return
    setEditing(false)
    if (draft().trim() && draft().trim() !== props.title) props.onSave(draft().trim())
  }
  function keydown(event: KeyboardEvent) {
    event.stopPropagation()
    if (event.key === 'Enter') {
      event.preventDefault()
      save()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      setEditing(false)
    }
  }
  return (
    <div class="flex min-w-0 flex-1 items-center gap-2">
      <Show when={!props.leaf} fallback={<span class="size-5 shrink-0" />}>
        <button
          type="button"
          disabled={props.busy}
          class="size-5 shrink-0 rounded hover:bg-muted"
          aria-label={'展开或收起 ' + props.title}
          aria-expanded={props.expanded}
          onClick={(event) => {
            event.stopPropagation()
            props.onToggle()
          }}
        >
          {props.expanded ? '−' : '+'}
        </button>
      </Show>
      <Show
        when={editing()}
        fallback={
          <button
            type="button"
            disabled={props.busy}
            class="min-w-0 flex-1 truncate text-start"
            onDblClick={(event) => {
              event.stopPropagation()
              setDraft(props.title)
              setEditing(true)
            }}
          >
            {props.title}
          </button>
        }
      >
        <div
          class="min-w-0 flex-1"
          onClick={(event) => event.stopPropagation()}
          onDblClick={(event) => event.stopPropagation()}
          onKeyDown={keydown}
          onFocusOut={save}
        >
          <Input value={draft()} onValueChange={setDraft} autofocus aria-label="节点名称" />
        </div>
      </Show>
      <Button
        disabled={props.busy}
        size="sm"
        aria-label={'新增子节点到 ' + props.title}
        onClick={(event) => {
          event.stopPropagation()
          props.onAdd()
        }}
      >
        新增子节点
      </Button>
      <Button
        disabled={props.busy}
        size="sm"
        aria-label={'删除 ' + props.title}
        onClick={(event) => {
          event.stopPropagation()
          props.onRemove()
        }}
      >
        <TrashIcon class="size-4" />
      </Button>
    </div>
  )
}
