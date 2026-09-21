import { useState } from 'react'
import { InputSearch } from '@fex-design/react/ui/input'
import { SearchIcon } from '@fex-design/react/icons/search'
export function SearchExample() {
  const [result, setResult] = useState('尚未搜索')
  return (
    <div className="grid w-full gap-3">
      <InputSearch
        defaultValue="组件库"
        clearable
        onSearch={(value, meta) => setResult(`${meta.source}: ${value}`)}
      />
      <InputSearch loading defaultValue="加载中" />
      <InputSearch
        addonAfter={null}
        placeholder="仅按 Enter 搜索"
        onSearch={(value, meta) => setResult(`${meta.source}: ${value}`)}
      />
      <InputSearch
        prefix={<SearchIcon />}
        addonAfter={null}
        placeholder="前置搜索图标"
        onSearch={(value, meta) => setResult(`${meta.source}: ${value}`)}
      />
      <InputSearch
        addonBefore="站内"
        addonAfter="搜索"
        placeholder="双侧搜索按钮"
        onSearch={(value, meta) => setResult(`${meta.source}: ${value}`)}
      />
      <p className="text-sm text-muted-foreground">{result}</p>
    </div>
  )
}
