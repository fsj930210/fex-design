import { Show, type Component, type ParentProps } from 'solid-js'
import { ApiTable } from './api-table'
import { componentApis } from './data'
import type { Framework } from './types'

export function ApiContainer(props: ParentProps) {
  return (
    <div class="my-8 flex flex-col xl:flex-row gap-6 w-full items-start">
      {props.children}
    </div>
  )
}

export const ApiComparison: Component<{
  slug: string
  framework: Framework
}> = (props) => {
  const uiApi = () => componentApis[props.slug]?.ui
  const primitiveApi = () => componentApis[props.slug]?.primitive

  return (
    <div class="my-8 flex flex-col xl:flex-row gap-6 w-full items-start">
      {/* 左列：UI API */}
      <div class="flex-1 min-w-0 w-full rounded-xl border border-border bg-card p-5 shadow-sm">
        <div class="flex items-center justify-between border-b border-border pb-3 mb-4">
          <div>
            <h3 id="ui-api" class="text-base font-bold text-foreground">
              UI API
            </h3>
            <p class="mt-0.5 text-xs text-secondary-foreground">
              开箱即用的高阶配置属性与语义化事件
            </p>
          </div>
          <span class="rounded px-2 py-0.5 text-[11px] font-semibold border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400">
            UI (开箱即用)
          </span>
        </div>
        <Show when={uiApi()} fallback={<div class="text-xs text-muted-foreground">暂无 UI 属性定义</div>}>
          <ApiTable value={uiApi()} framework={props.framework} />
        </Show>
      </div>

      {/* 右列：Primitive API */}
      <div class="flex-1 min-w-0 w-full rounded-xl border border-border bg-card p-5 shadow-sm">
        <div class="flex items-center justify-between border-b border-border pb-3 mb-4">
          <div>
            <h3 id="primitive-api" class="text-base font-bold text-foreground">
              Primitive API
            </h3>
            <p class="mt-0.5 text-xs text-secondary-foreground">
              解构导出的底层子部件与原生插槽
            </p>
          </div>
          <span class="rounded px-2 py-0.5 text-[11px] font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400">
            Primitive (解构拼装)
          </span>
        </div>
        <Show when={primitiveApi()} fallback={<div class="text-xs text-muted-foreground">暂无 Primitive 属性定义</div>}>
          <ApiTable value={primitiveApi()} framework={props.framework} />
        </Show>
      </div>
    </div>
  )
}
