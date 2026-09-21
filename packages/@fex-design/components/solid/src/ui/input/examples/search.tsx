import { createSignal } from 'solid-js'
import { InputSearch } from '@fex-design/solid/ui/input'
import { SearchIcon } from '@fex-design/solid/icons/search'
export function SearchExample() {
  const [result, setResult] = createSignal('尚未搜索')
  const searched = (value: string, meta: { source: string }) =>
    setResult(`${meta.source}: ${value}`)
  return (
    <div class="grid w-full gap-3">
      <InputSearch defaultValue="组件库" clearable onSearch={searched} />
      <InputSearch loading defaultValue="加载中" />
      <InputSearch addonAfter={null} placeholder="仅按 Enter 搜索" onSearch={searched} />
      <InputSearch
        prefix={<SearchIcon />}
        addonAfter={null}
        placeholder="前置搜索图标"
        onSearch={searched}
      />
      <InputSearch
        addonBefore="站内"
        addonAfter="搜索"
        placeholder="双侧搜索按钮"
        onSearch={searched}
      />
      <p class="text-sm text-muted-foreground">{result()}</p>
    </div>
  )
}
