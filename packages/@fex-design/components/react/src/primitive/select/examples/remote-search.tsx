import { useRef, useState } from 'react'
import { SelectContent, SelectRoot, SelectTrigger } from '@fex-design/react/primitive/select'

const cities = [
  { value: 'beijing', label: '北京', keywords: ['beijing', 'bj'] },
  { value: 'shanghai', label: '上海', keywords: ['shanghai', 'sh'] },
  { value: 'shenzhen', label: '深圳', keywords: ['shenzhen', 'sz'] },
  { value: 'hangzhou', label: '杭州', keywords: ['hangzhou', 'hz'] },
  { value: 'chengdu', label: '成都', keywords: ['chengdu', 'cd'] },
]
const searchCities = (keyword: string) =>
  new Promise<typeof cities>((resolve) =>
    window.setTimeout(() => {
      const query = keyword.trim().toLowerCase()
      resolve(
        query
          ? cities.filter(
              (city) =>
                city.label.includes(query) || city.keywords.some((item) => item.includes(query)),
            )
          : cities.slice(0, 3),
      )
    }, 500),
  )

export default function Example() {
  const [options, setOptions] = useState(cities.slice(0, 3))
  const [loading, setLoading] = useState(false)
  const requestId = useRef(0)
  const search = async (keyword: string) => {
    const current = ++requestId.current
    setLoading(true)
    const result = await searchCities(keyword)
    if (current !== requestId.current) return
    setOptions(result)
    setLoading(false)
  }
  return (
    <SelectRoot
      options={options}
      defaultValue="beijing"
      showSearch
      loading={loading}
      onSearch={(keyword) => void search(keyword)}
    >
      <SelectTrigger className="w-72" placeholder="输入城市或拼音" />
      <SelectContent loadingContent="正在查询城市…" emptyContent="未找到城市" />
    </SelectRoot>
  )
}
