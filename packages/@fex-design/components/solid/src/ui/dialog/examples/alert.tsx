import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogAlertExample() {
  const [result, setResult] = createSignal('尚未操作')
  async function show() {
    const handle = Dialog.alert({ title: '操作成功', content: '资料已经保存，可以继续操作。' })
    setResult((await handle.result) ? '已确认' : '已取消')
  }
  return (
    <>
      <Button onClick={() => void show()}>打开提示弹窗</Button>
      <p role="status">{result()}</p>
    </>
  )
}
