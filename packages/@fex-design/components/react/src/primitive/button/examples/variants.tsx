import type { CSSProperties } from 'react'
import { Button } from '@fex-design/react/primitive/button'
const variants = ['solid', 'outlined', 'dashed', 'filled', 'text', 'link'] as const
const colors = [
  ['primary', '品牌色'],
  ['danger', '危险'],
  ['warning', '警告'],
  ['success', '成功'],
  ['info', '信息'],
] as const
const customColor = {
  '--button-color': '#7c3aed',
  '--button-color-foreground': '#fff',
  '--button-color-hover': '#6d28d9',
  '--button-color-soft': '#f3e8ff',
  '--button-color-soft-hover': '#ede9fe',
  '--button-color-border': '#a78bfa',
} as CSSProperties

export function VariantsExample() {
  return (
    <div className="grid gap-3">
      {colors.map(([color, label]) => (
        <div key={color} className="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-4">
          <span className="whitespace-nowrap text-sm font-medium">
            {color}（{label}）
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {variants.map((variant) => (
              <Button key={variant} variant={variant} color={color}>
                {variant}
              </Button>
            ))}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-4">
        <span className="whitespace-nowrap text-sm font-medium">custom（自定义）</span>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} style={customColor}>
              {variant}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-4">
        <span className="whitespace-nowrap text-sm font-medium">gradient（渐变）</span>
        <Button className="w-fit border-transparent bg-linear-to-r from-violet-600 to-cyan-500 text-white hover:brightness-110">
          Gradient
        </Button>
      </div>
    </div>
  )
}
