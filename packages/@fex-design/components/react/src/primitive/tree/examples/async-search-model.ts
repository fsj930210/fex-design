import type { TreeDataNode } from '@fex-design/react/primitive/tree'
import { useRef, useState } from 'react'
import useMount from '@fex-design/react/hooks/use-mount'
import {
  loadRemoteTree,
  searchRemoteTree,
  loadRemoteAncestors,
  updateRemoteChildren,
  type TreeSearchMatch,
  type TreeAncestorResult,
} from './_data/tree-remote-demo'

// Shared scenario state; each layer supplies its own Select and Tree components.
export function useAsyncSearchDemo() {
  const [treeData, setTreeData] = useState<readonly TreeDataNode<string, string>[]>([])
  const [options, setOptions] = useState<TreeSearchMatch[]>([])
  const [selected, setSelected] = useState<string>()
  const [path, setPath] = useState<TreeAncestorResult>()
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)
  const searchRequest = useRef(0)
  const pathRequest = useRef(0)
  useMount(() => {
    let active = true
    void loadRemoteTree().then((roots) => {
      if (active) setTreeData(roots)
    })
    return () => {
      active = false
      searchRequest.current++
      pathRequest.current++
    }
  })
  const search = async (keyword: string) => {
    const request = ++searchRequest.current
    setLoading(true)
    const matches = await searchRemoteTree(keyword)
    if (request !== searchRequest.current) return
    setOptions(matches)
    setLoading(false)
  }
  const choose = async (value: unknown) => {
    const request = ++pathRequest.current
    searchRequest.current++
    setLoading(false)
    setPath(undefined)
    if (typeof value !== 'string') {
      setSelected(undefined)
      setOptions([])
      setLocating(false)
      return
    }
    setSelected(value)
    setLocating(true)
    const result = await loadRemoteAncestors(value)
    if (request !== pathRequest.current) return
    setPath(result)
    setLocating(false)
  }
  const loadChildren = async (item: { key: string | number }) => {
    const children = await loadRemoteTree(String(item.key))
    setTreeData((current) => updateRemoteChildren(current, String(item.key), children))
    return children
  }
  return { treeData, options, selected, path, loading, locating, search, choose, loadChildren }
}
