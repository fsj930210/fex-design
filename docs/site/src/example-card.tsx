import type { JSX, ParentProps } from 'solid-js'
import { Card } from '@fex-design/solid/ui/card'

type DemoLayer = 'primitive' | 'ui'

export function ExampleCard(
  props: ParentProps<{
    tab: 'preview' | 'code'
    layer: DemoLayer
    layers: readonly DemoLayer[]
    copied: boolean
    standaloneHref: string
    onTabChange: (tab: 'preview' | 'code') => void
    onLayerChange: (layer: DemoLayer) => void
    onCopy: () => void
  }>,
) {
  return (
    <Card
      class="mt-3.5 overflow-hidden bg-white [--card-border:1px_solid_#dce3dd]"
      header={
        <div class="grid min-h-12 grid-cols-[1fr_auto_1fr] items-center border-b border-[#e4e9e5] bg-[#f5f7f5] p-1.75">
          <div class="flex items-center gap-0.5">
            <HeaderButton
              active={props.tab === 'preview'}
              onClick={() => props.onTabChange('preview')}
            >
              预览
            </HeaderButton>
            <HeaderButton active={props.tab === 'code'} onClick={() => props.onTabChange('code')}>
              源码
            </HeaderButton>
          </div>
          {props.layers.length > 1 && (
            <div
              class="flex items-center gap-0.5 rounded-lg border border-[#dce3dd] bg-[#edf1ee] p-0.75"
              aria-label="示例层级"
            >
              {props.layers.map((layer) => (
                <HeaderButton
                  active={props.layer === layer}
                  onClick={() => props.onLayerChange(layer)}
                  compact
                >
                  {layer === 'ui' ? 'UI' : 'Primitive'}
                </HeaderButton>
              ))}
            </div>
          )}
          {props.layers.length === 1 && (
            <span
              class="rounded-lg border border-[#dce3dd] bg-[#edf1ee] px-2.5 py-1 text-xs text-[#116149]"
              aria-label="示例层级"
            >
              {props.layers[0] === 'ui' ? 'UI' : 'Primitive'}
            </span>
          )}
          <div class="flex items-center justify-end gap-0.5">
            {props.tab === 'code' && (
              <button
                class="grid size-8.5 cursor-pointer place-items-center rounded-md border-0 bg-transparent p-0 text-[#64706a] hover:bg-white hover:text-[#116149] [&_svg]:size-4.25 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.8] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]"
                aria-label="复制源码"
                onClick={props.onCopy}
              >
                {props.copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            )}
            <a
              class="grid size-8.5 place-items-center rounded-md text-[#64706a] no-underline hover:bg-white hover:text-[#116149] [&_svg]:size-4.25 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[1.8] [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]"
              href={props.standaloneHref}
              target="_blank"
              rel="noreferrer"
              aria-label="新窗口打开"
            >
              <OpenIcon />
            </a>
          </div>
        </div>
      }
      classNames={{ content: 'p-4' }}
    >
      {props.children}
    </Card>
  )
}

function HeaderButton(
  props: ParentProps<{ active: boolean; compact?: boolean; onClick: () => void }>,
) {
  return (
    <button
      class={`cursor-pointer rounded-md border-0 bg-transparent text-[#68736d] data-[active=true]:bg-white data-[active=true]:text-[#116149] data-[active=true]:shadow-sm ${props.compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5'}`}
      data-active={props.active}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
    </svg>
  )
}

function OpenIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5M10 14 19 5" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  )
}
