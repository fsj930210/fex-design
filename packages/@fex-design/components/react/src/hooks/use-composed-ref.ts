import { useMemo, type Ref } from 'react'

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    return ref(value)
  }
  if (ref && 'current' in ref) {
    ref.current = value
  }
}

export function useComposedRef<T>(...refs: Array<Ref<T> | undefined>) {
  // DOM ref identity must change with its inputs so React detaches old refs and attaches new ones.
  return useMemo(() => (value: T | null) => {
    const cleanups = refs.map((ref) => assignRef(ref, value))
    if (value === null) return
    // React 19 uses callback-ref cleanup; refs without cleanup still receive null.
    return () => {
      refs.forEach((ref, index) => {
        const cleanup = cleanups[index]
        if (typeof cleanup === 'function') cleanup()
        else assignRef(ref, null)
      })
    }
  }, refs)
}
