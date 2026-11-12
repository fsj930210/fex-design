import { readable, type Readable } from 'svelte/store'

export interface CoreStore<TSnapshot> {
  getSnapshot: () => TSnapshot
  subscribe: (listener: () => void) => () => void
}

export function readableCoreStore<TSnapshot>(store: CoreStore<TSnapshot>): Readable<TSnapshot> {
  // Svelte adapter 使用 readable store 暴露 core snapshot。
  // 组件里必须通过 $snapshot 读取字段，不能把字段缓存成普通变量，否则 DOM 绑定不会跟随 core 更新。
  return readable(store.getSnapshot(), (set) => {
    const unsubscribe = store.subscribe(() => {
      set(store.getSnapshot())
    })
    // Mount effects may update the core before Svelte subscribes to this readable.
    // Publish the current snapshot after attaching so those updates are not lost.
    set(store.getSnapshot())
    return unsubscribe
  })
}
