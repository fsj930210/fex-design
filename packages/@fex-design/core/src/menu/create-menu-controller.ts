import { createStore } from '../store/create-store'
import type {
  MenuActivateInfo,
  MenuChangeInfo,
  MenuController,
  MenuNode,
  MenuOptions,
  MenuSnapshot,
} from './types'

const unique = (values: readonly string[]) => [...new Set(values)]
const same = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i])

export function createMenuController(initial: MenuOptions = {}): MenuController {
  let options = initial
  let value = unique(initial.value ?? initial.defaultValue ?? [])
  let openValues = unique(initial.openValues ?? initial.defaultOpenValues ?? [])
  const nodes = new Map<string, MenuNode>()
  const store = createStore(resolve())

  function path(key: string): string[] {
    const result: string[] = []
    let current: string | undefined = key
    while (current !== undefined && !result.includes(current)) {
      result.unshift(current)
      current = nodes.get(current)?.parent
    }
    return result
  }
  function resolve(): MenuSnapshot {
    value = unique(options.value ?? value)
    if (!options.multiple) value = value.slice(0, 1)
    openValues = unique(options.openValues ?? openValues)
    const lastOpen = openValues.at(-1)
    if (
      (options.layout ?? 'vertical') !== 'inline' &&
      lastOpen !== undefined &&
      nodes.has(lastOpen)
    ) {
      openValues = path(lastOpen)
    }
    return {
      layout: options.layout ?? 'vertical',
      dir: options.dir ?? 'ltr',
      size: options.size ?? 'md',
      disabled: options.disabled ?? false,
      multiple: options.multiple ?? false,
      value,
      openValues,
      inlineAccordion: options.inlineAccordion ?? false,
      submenuTrigger: options.submenuTrigger ?? 'click',
      openDelay: Math.max(0, options.openDelay ?? 100),
      closeDelay: Math.max(0, options.closeDelay ?? 180),
    }
  }
  function publish() {
    const next = resolve(),
      previous = store.getSnapshot()
    if (
      same(next.value, previous.value) &&
      same(next.openValues, previous.openValues) &&
      next.layout === previous.layout &&
      next.dir === previous.dir &&
      next.size === previous.size &&
      next.disabled === previous.disabled &&
      next.multiple === previous.multiple &&
      next.inlineAccordion === previous.inlineAccordion &&
      next.submenuTrigger === previous.submenuTrigger &&
      next.openDelay === previous.openDelay &&
      next.closeDelay === previous.closeDelay
    )
      return
    store.setSnapshot(next)
  }
  function changeOpen(next: string[], info: MenuChangeInfo) {
    if (same(next, store.getSnapshot().openValues)) return
    if (options.openValues === undefined) openValues = next
    publish()
    options.onOpenChange?.(next, info)
  }
  const controller: MenuController = {
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    setOptions(next) {
      const changedLayout = (next.layout ?? 'vertical') !== store.getSnapshot().layout
      options = next
      // Configuration changes never emit user events.
      if (changedLayout && next.openValues === undefined) openValues = []
      publish()
    },
    registerNode(node) {
      const previous = nodes.get(node.value)
      if (previous && previous !== node) throw new Error(`Duplicate Menu value: ${node.value}`)
      nodes.set(node.value, node)
      // Declarative descendants can register after their ancestors or portal hosts.
      publish()
      return () => {
        if (nodes.get(node.value) === node) nodes.delete(node.value)
      }
    },
    getNode: (key) => nodes.get(key),
    setValue(next, info = { value: undefined, reason: 'click' }) {
      const values = options.multiple ? unique(next) : unique(next).slice(0, 1)
      if (same(values, store.getSnapshot().value)) return
      if (options.value === undefined) value = values
      publish()
      options.onValueChange?.(values, info)
    },
    setOpen(key, open, info = { value: key, reason: 'click' }) {
      const snapshot = store.getSnapshot(),
        node = nodes.get(key)
      if (node && !node.branch) return
      if (open && (snapshot.disabled || node?.disabled)) return
      let next = [...snapshot.openValues]
      if (open) {
        if (snapshot.layout !== 'inline') next = path(key)
        else {
          if (snapshot.inlineAccordion) {
            const siblings = next.filter((v) => v !== key && nodes.get(v)?.parent === node?.parent)
            next = next.filter((v) => !siblings.some((sibling) => path(v).includes(sibling)))
          }
          next = unique([...next, ...path(key)])
        }
      } else next = next.filter((v) => !path(v).includes(key))
      changeOpen(next, info)
    },
    closeAll(info = { value: undefined, reason: 'outside' }) {
      changeOpen([], info)
    },
    activate(key, event) {
      const node = nodes.get(key)
      if (store.getSnapshot().disabled || node?.disabled || node?.branch || event?.defaultPrevented)
        return false
      let cancelled = false
      const info: MenuActivateInfo = {
        value: key,
        reason:
          event?.type === 'keydown' ||
          (event?.type === 'click' && 'detail' in event && event.detail === 0)
            ? 'keyboard'
            : 'click',
        event,
        get defaultPrevented() {
          return cancelled || Boolean(event?.defaultPrevented)
        },
        preventDefault() {
          cancelled = true
          event?.preventDefault()
        },
      }
      options.onActivate?.(info)
      if (info.defaultPrevented) return false
      const snapshot = store.getSnapshot()
      controller.setValue(
        snapshot.multiple
          ? snapshot.value.includes(key)
            ? snapshot.value.filter((value) => value !== key)
            : [...snapshot.value, key]
          : [key],
        info,
      )
      if (!snapshot.multiple && snapshot.layout !== 'inline')
        controller.closeAll({ ...info, reason: 'activate' })
      return true
    },
  }
  return controller
}
