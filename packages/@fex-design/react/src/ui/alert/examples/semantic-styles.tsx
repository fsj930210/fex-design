import { Alert } from '@fex-design/react/ui/alert'
import type { CSSProperties } from 'react'

const purple = { '--alert-color': '#7c3aed', '--alert-color-background': '#f5f3ff', '--alert-color-border': '#c4b5fd' } as CSSProperties
const pink = { '--alert-color': '#be185d', '--alert-color-background': '#fdf2f8', '--alert-color-border': '#f9a8d4' } as CSSProperties

export default function SemanticStyles() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Alert
        showIcon
        closable
        title="Custom purple semantic parts"
        style={purple}
        classNames={{ title: 'uppercase tracking-wide', icon: 'rounded-full bg-white/70 p-0.5' }}
      />
      <Alert
        showIcon
        closable
        title="Custom pink semantic parts"
        action={<button>Action</button>}
        style={pink}
        styles={{ action: { borderRadius: 999, background: 'rgb(255 255 255 / 0.7)', padding: '2px 8px' }, close: { color: '#831843' } }}
      />
    </div>
  )
}
