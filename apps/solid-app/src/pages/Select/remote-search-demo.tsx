import type { SelectOption } from '@fex-design/core/select/types'
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/solid/primitive/select'
import { createSignal, onCleanup } from 'solid-js'
import { frameworkOptions } from './data'
import { SelectDemoSection as Demo } from './demo-section'
export function RemoteSearchDemo() {
  const [options, setOptions] = createSignal<readonly SelectOption[]>([]),
    [loading, setLoading] = createSignal(false),
    [open, setOpen] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined,
    requestId = 0
  function search(keyword: string) {
    if (timer) clearTimeout(timer)
    const id = ++requestId,
      normalized = keyword.trim().toLocaleLowerCase()
    setOpen(true)
    if (!normalized) {
      setLoading(false)
      setOptions([])
      timer = undefined
      return
    }
    setLoading(true)
    setOptions([])
    timer = setTimeout(() => {
      if (id !== requestId) return
      setOptions(
        normalized
          ? frameworkOptions.filter((option) =>
              [option.label, option.searchText, ...(option.keywords ?? [])].some((text) =>
                text?.toLocaleLowerCase().includes(normalized),
              ),
            )
          : frameworkOptions,
      )
      setLoading(false)
      setOpen(true)
      timer = undefined
    }, 2000)
  }
  onCleanup(() => {
    requestId++
    if (timer) clearTimeout(timer)
  })
  return (
    <Demo
      title="Remote search"
      description="The mock request waits two seconds, cancels stale keywords and returns matching results."
    >
      <SelectRoot
        showSearch
        loading={loading()}
        open={open()}
        options={options()}
        onOpenChange={setOpen}
        onSearch={search}
      >
        <SelectTrigger placeholder="请输入关键词远程搜索" />
        <SelectContent loadingContent="Searching remote options…" emptyContent="No remote results" />
      </SelectRoot>
    </Demo>
  )
}
