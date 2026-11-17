import { useRef, useState } from 'react'
import useUnmount from '@fex-design/react/hooks/use-unmount'
import { Dialog, type DialogRequestHandle } from '@fex-design/react/ui/dialog'
import { Button } from '@fex-design/react/ui/button'
type Mode = 'update' | 'destroy' | 'destroyAll'
export function DialogMethodsExample() {
  const [feedback, setFeedback] = useState('请选择一个操作')
  const active = useRef(new Set<DialogRequestHandle>()).current
  useUnmount(() => {
    for (const handle of active) handle.destroy()
  })
  function show(mode: Mode) {
    for (const handle of active) handle.destroy()
    active.clear()
    const count = mode === 'destroyAll' ? 2 : 1
    for (let index = 0; index < count; index++) {
      let handle: DialogRequestHandle
      const content = (
        <div className="grid gap-3">
          <p>
            {mode === 'update'
              ? '更新标题、正文和确定按钮。'
              : mode === 'destroy'
                ? '点击按钮销毁当前实例。'
                : '当前同时打开两个弹窗，点击按钮全部销毁。'}
          </p>
          <div className="flex flex-wrap gap-2">
            {mode === 'update' && (
              <>
                <Button
                  onClick={() =>
                    handle.update({
                      title: '更新后的标题',
                      content: '正文和确定按钮已更新。',
                      okBtnProps: { children: '完成' },
                    })
                  }
                >
                  对象更新
                </Button>
                <Button
                  onClick={() =>
                    handle.update((previous) => ({
                      title:
                        (typeof previous.title === 'string' ? previous.title : '实例') +
                        '（函数更新）',
                      content: '通过前一次配置更新完成。',
                      okBtnProps: { ...previous.okBtnProps, children: '完成' },
                    }))
                  }
                >
                  函数更新
                </Button>
              </>
            )}
            <Button
              onClick={() => {
                if (mode === 'destroyAll') Dialog.destroyAll()
                else handle.destroy()
              }}
            >
              {mode === 'destroyAll' ? '销毁全部' : '销毁当前'}
            </Button>
          </div>
        </div>
      )
      handle = Dialog.confirm({ title: '实例 ' + (index + 1), content })
      active.add(handle)
      void handle.result.then(() => {
        active.delete(handle)
        setFeedback('剩余弹窗：' + active.size)
      })
    }
    setFeedback('已打开 ' + count + ' 个弹窗')
  }
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={() => show('update')}>演示 update</Button>
        <Button onClick={() => show('destroy')}>演示 destroy</Button>
        <Button onClick={() => show('destroyAll')}>演示 destroyAll（两个弹窗）</Button>
      </div>
      <p role="status">{feedback}</p>
    </>
  )
}
