import { createSignal, For } from 'solid-js'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/solid/primitive/popover'
import { Button } from '@fex-design/solid/ui/button'

export function ControlledExample() {
  type DemoCase = { label: string; options: PopoverOptions }
  const [open, setOpen] = createSignal(false)
  const cases: DemoCase[] = [
    {
      label: '受控表单',
      options: {
        get open() {
          return open()
        },
        onOpenChange: setOpen,
      },
    },
    { label: '非受控：关闭保留草稿', options: {} },
    { label: '关闭销毁：重新填写', options: { destroyOnHidden: true } },
    { label: '提前挂载，关闭保留', options: { lazyMount: false } },
    { label: '提前挂载，关闭销毁', options: { lazyMount: false, destroyOnHidden: true } },
  ]

  return (
    <div class="w-full flex items-center justify-center min-h-[360px] py-16">
      {
        <div class="grid gap-4">
          <Button onClick={() => setOpen(!open())}>外部切换：{open() ? '打开' : '关闭'}</Button>

          <div class="flex flex-wrap gap-3">
            <For each={cases}>
              {(item) => (
                <div>
                  <Popover {...item.options}>
                    {(state) => (
                      <>
                        <PopoverTrigger>
                          {(binding) => (
                            <Button {...binding.props} ref={binding.ref}>
                              {item.label}
                            </Button>
                          )}
                        </PopoverTrigger>
                        <PopoverPortal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>
                              <PopoverTitle>{item.label}</PopoverTitle>
                            </PopoverHeader>
                            <div class="grid gap-3">
                              <label>
                                备注
                                <input
                                  aria-label="备注"
                                  class="block rounded border p-2"
                                  placeholder="关闭后再打开检查草稿"
                                />
                              </label>
                              <Button onClick={() => state.close()}>在浮层内关闭</Button>
                            </div>
                          </PopoverContent>
                        </PopoverPortal>
                      </>
                    )}
                  </Popover>
                </div>
              )}
            </For>
          </div>
        </div>
      }
    </div>
  )
}
