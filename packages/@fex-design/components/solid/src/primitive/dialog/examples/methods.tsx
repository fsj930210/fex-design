import { createSignal, For } from 'solid-js'
import { Button } from '@fex-design/solid/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '@fex-design/solid/primitive/dialog'
import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
const ids = ['first', 'second'] as const
type Id = (typeof ids)[number]
type Mode = 'update' | 'destroy' | 'destroyAll'
type Slot = { open: boolean; title: string; content: string; updated: boolean }
const initial = (): Record<Id, Slot> => ({
  first: { open: false, title: '实例 1', content: '', updated: false },
  second: { open: false, title: '实例 2', content: '', updated: false },
})
export function DialogMethodsExample() {
  const [slots, setSlots] = createSignal(initial())
  const [mode, setMode] = createSignal<Mode>('update')
  const [feedback, setFeedback] = createSignal('请选择一个操作')
  function show(next: Mode) {
    setMode(next)
    const value = initial()
    value.first.open = true
    value.second.open = next === 'destroyAll'
    setSlots(value)
    setFeedback('已打开 ' + (next === 'destroyAll' ? 2 : 1) + ' 个弹窗')
  }
  function update(id: Id, functional = false) {
    setSlots((previous) => ({
      ...previous,
      [id]: {
        ...previous[id],
        title: functional ? previous[id].title + '（函数更新）' : '更新后的标题',
        content: functional ? '通过前一次配置更新完成。' : '正文和确定按钮已更新。',
        updated: true,
      },
    }))
  }
  function destroy(id: Id, all = false) {
    const next = { ...slots() }
    for (const key of ids) if (all || key === id) next[key] = { ...next[key], open: false }
    setSlots(next)
    setFeedback('剩余弹窗：' + ids.filter((key) => next[key].open).length)
  }
  return (
    <>
      <div class="flex flex-wrap justify-center gap-2">
        <Button onClick={() => show('update')}>演示 update</Button>
        <Button onClick={() => show('destroy')}>演示 destroy</Button>
        <Button onClick={() => show('destroyAll')}>演示 destroyAll（两个弹窗）</Button>
      </div>
      <p role="status">{feedback()}</p>
      <For each={ids}>
        {(id) => {
          const slot = () => slots()[id]
          return (
            <DialogRoot
              open={slot().open}
              onOpenChange={(open) => {
                if (!open) destroy(id)
              }}
              closeOnEscape={false}
              closeOnOverlayClick={false}
            >
              <DialogPortal>
                <DialogOverlay />
                <DialogContent class={dialogMessageClassName}>
                  <DialogHeader>
                    <DialogTitle>{slot().title}</DialogTitle>
                  </DialogHeader>
                  <DialogActions>
                    <DialogClose />
                  </DialogActions>
                  <DialogBody>
                    {slot().updated ? (
                      <p>{slot().content}</p>
                    ) : (
                      <div class="grid gap-3">
                        <p>
                          {mode() === 'update'
                            ? '更新标题、正文和确定按钮。'
                            : mode() === 'destroy'
                              ? '点击按钮销毁当前实例。'
                              : '当前同时打开两个弹窗，点击按钮全部销毁。'}
                        </p>
                        <div class="flex flex-wrap gap-2">
                          {mode() === 'update' && (
                            <>
                              <Button onClick={() => update(id)}>对象更新</Button>
                              <Button onClick={() => update(id, true)}>函数更新</Button>
                            </>
                          )}
                          <Button onClick={() => destroy(id, mode() === 'destroyAll')}>
                            {mode() === 'destroyAll' ? '销毁全部' : '销毁当前'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogBody>
                  <DialogFooter>
                    <Button onClick={() => destroy(id)}>取消</Button>
                    <Button variant="solid" color="primary" onClick={() => destroy(id)}>
                      {slot().updated ? '完成' : '确定'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </DialogPortal>
            </DialogRoot>
          )
        }}
      </For>
    </>
  )
}
