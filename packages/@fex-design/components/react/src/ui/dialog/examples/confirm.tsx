import { useState } from 'react'
import { Dialog } from '@fex-design/react/ui/dialog'
import { Button } from '@fex-design/react/ui/button'
export function DialogConfirmExample() {
  const [result, setResult] = useState('尚未操作')
  async function show() {
    const handle = Dialog.confirm({
      title: <span className="text-danger">确认删除</span>,
      content: (
        <p>
          删除后无法恢复，<strong>请确认是否继续。</strong>
        </p>
      ),
    })
    setResult((await handle.result) ? '已确认' : '已取消')
  }
  return (
    <>
      <Button onClick={() => void show()}>打开确认弹窗</Button>
      <p role="status">{result}</p>
    </>
  )
}
