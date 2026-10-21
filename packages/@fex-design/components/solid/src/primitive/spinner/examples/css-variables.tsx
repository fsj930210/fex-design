import {
  Spinner,
  SpinnerContainer,
  SpinnerOverlay,
  SpinnerText,
} from '@fex-design/solid/primitive/spinner'
import { createSignal, Show } from 'solid-js'

export function SpinnerCssVariablesExample() {
  const [spinning, setSpinning] = createSignal(true)
  return (
    <div class="grid w-full max-w-xl gap-4">
      <SpinnerContainer
        aria-busy={spinning()}
        class="min-h-40 rounded-lg border border-border [--primary:#7c3aed] [--background:#faf5ff] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      >
        <div class="grid gap-2 p-6">
          <strong>项目概览</strong>
          <p class="m-0 text-sm text-muted-foreground">
            内容在加载期间保持挂载，不会丢失布局和状态。
          </p>
        </div>
        <Show when={spinning()}>
          <SpinnerOverlay class="flex-col [--primary:#7c3aed] [--background:#faf5ff] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
            <Spinner class="[--primary:#7c3aed] [--background:#faf5ff] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]" />
            <SpinnerText class="[--primary:#7c3aed] [--background:#faf5ff] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
              正在刷新数据
            </SpinnerText>
          </SpinnerOverlay>
        </Show>
      </SpinnerContainer>
      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
          onClick={() => setSpinning((value) => !value)}
        >
          {spinning() ? '停止加载' : '开始加载'}
        </button>
        <span class="text-sm text-muted-foreground">spinning: {String(spinning())}</span>
      </div>
    </div>
  )
}
