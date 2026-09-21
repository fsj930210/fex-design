import { Button } from '@fex-design/solid/primitive/button'
import { For } from 'solid-js'

const variants = ['solid', 'outlined', 'dashed', 'filled', 'text', 'link'] as const
const colors = [
  ['primary', '品牌色'],
  ['danger', '危险'],
  ['warning', '警告'],
  ['success', '成功'],
  ['info', '信息'],
] as const
const customColor =
  '--button-color:#7c3aed;--button-color-foreground:#fff;--button-color-hover:#6d28d9;--button-color-soft:#f3e8ff;--button-color-soft-hover:#ede9fe;--button-color-border:#a78bfa'

export function VariantsExample() {
  return (
    <div class="grid gap-3">
      <For each={colors}>
        {([color, label]) => (
          <div class="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-4">
            <span class="whitespace-nowrap text-sm font-medium">
              {color}（{label}）
            </span>
            <div class="flex flex-wrap items-center gap-3">
              <For each={variants}>
                {(variant) => (
                  <Button variant={variant} color={color}>
                    {variant}
                  </Button>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
      <div class="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-4">
        <span class="whitespace-nowrap text-sm font-medium">custom（自定义）</span>
        <div class="flex flex-wrap items-center gap-3">
          <For each={variants}>
            {(variant) => (
              <Button variant={variant} style={customColor}>
                {variant}
              </Button>
            )}
          </For>
        </div>
      </div>
      <div class="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-4">
        <span class="whitespace-nowrap text-sm font-medium">gradient（渐变）</span>
        <Button class="w-fit border-transparent bg-linear-to-r from-violet-600 to-cyan-500 text-white hover:brightness-110">
          Gradient
        </Button>
      </div>
    </div>
  )
}
