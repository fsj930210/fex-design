import { createSignal, For } from 'solid-js'
import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types'
import { Popover } from '@fex-design/solid/ui/popover'
import { Button } from '@fex-design/solid/ui/button'

export function SemanticStylesExample() {
  type DemoCase = { label: string; options: PopoverOptions }
  const cases = [{ label: '按部位自定义样式', options: { arrow: true } }]

  return (
    <div class="w-full flex items-center justify-center min-h-[360px] py-16">
      {
        <div class="grid gap-4">
          <div class="flex flex-wrap gap-3">
            <For each={cases}>
              {(item) => (
                <div>
                  <Popover
                    {...item.options}
                    title="提示信息"
                    content={(state) => <p>这里可以放置说明和交互内容。</p>}
                    classNames={{ title: 'text-blue-700 font-semibold', content: 'text-sm' }}
                    styles={{
                      root: {
                        '--popover-background': 'var(--muted-background)',
                        '--popover-border': 'var(--color-blue-500)',
                        '--popover-radius': '12px',
                        '--popover-arrow-size': '16px',
                      },
                    }}
                  >
                    {(binding) => (
                      <Button {...binding.props} ref={binding.ref}>
                        {item.label}
                      </Button>
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
