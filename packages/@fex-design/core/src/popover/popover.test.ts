import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createPopover } from './create-popover'
import { createPresence } from '../overlay/presence/create-presence'
import { createOverlay } from '../overlay/create-overlay'
import { getTopLayer } from '../overlay/layer/layer-stack'
import { createTrigger } from '../overlay/trigger/create-trigger'

test('configuration changes publish shared snapshots without changing open state', () => {
  const popover = createPopover()
  const container = {} as HTMLElement
  let notifications = 0
  const unsubscribe = popover.subscribe(() => {
    notifications++
  })
  popover.setOptions({ arrow: true, getPopupContainer: () => container })
  const snapshot = popover.getSnapshot()
  assert.equal(snapshot.arrow, true)
  assert.equal(snapshot.popupContainer, container)
  assert.equal(snapshot.open, false)
  assert.equal(snapshot.mounted, false)
  assert.equal(notifications, 1)
  popover.setOptions({ arrow: true, getPopupContainer: () => container })
  assert.equal(popover.getSnapshot(), snapshot)
  assert.equal(notifications, 1)
  unsubscribe()
  popover.destroy()
})

test('portal resolution defaults to body and follows custom container configuration', () => {
  const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
  const body = {} as HTMLElement
  const customContainer = {} as HTMLElement
  const nextContainer = {} as HTMLElement
  const popover = createPopover()
  try {
    Object.defineProperty(globalThis, 'document', {
      configurable: true,
      value: { body },
    })
    assert.equal(popover.resolvePopupContainer(), body)
    popover.setOptions({ getPopupContainer: () => customContainer })
    assert.equal(popover.resolvePopupContainer(), customContainer)
    popover.setOptions({ getPopupContainer: () => nextContainer })
    assert.equal(popover.resolvePopupContainer(), nextContainer)
    popover.setOptions({})
    assert.equal(popover.resolvePopupContainer(), body)
  } finally {
    popover.destroy()
    if (originalDocument) Object.defineProperty(globalThis, 'document', originalDocument)
    else Reflect.deleteProperty(globalThis, 'document')
  }
})

test('mounting flags independently govern initial mount and closing retention', () => {
  for (const lazyMount of [true, false]) {
    for (const destroyOnHidden of [true, false]) {
      const options = { lazyMount, destroyOnHidden }
      const presence = createPresence(options)
      assert.equal(presence.getSnapshot().mounted, !lazyMount)
      presence.setOptions({ ...options, open: true })
      assert.equal(presence.getSnapshot().mounted, true)
      presence.setOptions({ ...options, open: false })
      assert.equal(presence.getSnapshot().mounted, !destroyOnHidden)
      presence.setOptions({ ...options, open: false })
      assert.equal(presence.getSnapshot().mounted, !destroyOnHidden)
      presence.setOptions({ ...options, open: true })
      assert.equal(presence.getSnapshot().mounted, true)
      presence.destroy()
    }
  }
})

test('destroy waits for closing and reopening cancels pending destruction', async () => {
  const options = { lazyMount: true, destroyOnHidden: true, closeDelay: 15 }
  const presence = createPresence({ ...options, open: true })
  presence.setOptions({ ...options, open: false })
  assert.equal(presence.getSnapshot().phase, 'closing')
  assert.equal(presence.getSnapshot().mounted, true)
  presence.setOptions({ ...options, open: true })
  await new Promise((resolve) => setTimeout(resolve, 25))
  assert.equal(presence.getSnapshot().mounted, true)
  presence.setOptions({ ...options, open: false })
  await new Promise((resolve) => setTimeout(resolve, 25))
  assert.equal(presence.getSnapshot().mounted, false)
  presence.destroy()
})

test('Popover defaults lazily retain content without changing legacy overlays', () => {
  const popover = createPopover({ closeDelay: 0 })
  assert.equal(popover.getSnapshot().mounted, false)
  popover.open()
  popover.close()
  assert.equal(popover.getSnapshot().mounted, true)
  popover.destroy()
  const legacy = createOverlay()
  legacy.open()
  legacy.close()
  assert.equal(legacy.getSnapshot().mounted, false)
  legacy.destroy()
})

test('controlled Popover requests open without accepting it on behalf of the caller', () => {
  const requests: boolean[] = []
  const onOpenChange = (open: boolean) => requests.push(open)
  const popover = createPopover({ open: false, onOpenChange, closeDelay: 0 })
  popover.open()
  assert.deepEqual(requests, [true])
  assert.equal(popover.getSnapshot().open, false)
  popover.setOptions({ open: true, onOpenChange, closeDelay: 0 })
  assert.equal(popover.getSnapshot().open, true)
  popover.close()
  assert.deepEqual(requests, [true, false])
  assert.equal(popover.getSnapshot().open, true)
  popover.destroy()
})

test('hidden retained layers do not intercept Escape and reopening restores priority', () => {
  const first = createOverlay({ destroyOnHidden: false })
  const second = createOverlay({ destroyOnHidden: false })
  const firstElement = {} as HTMLElement
  const secondElement = {} as HTMLElement
  first.setLayerElement(firstElement)
  second.setLayerElement(secondElement)
  assert.equal(getTopLayer(), undefined)
  first.open()
  second.open()
  assert.equal(getTopLayer()?.element, secondElement)
  second.close()
  assert.equal(second.getSnapshot().mounted, true)
  assert.equal(getTopLayer()?.element, firstElement)
  second.open()
  assert.equal(getTopLayer()?.element, secondElement)
  const event = { event: {} }
  second.dismiss.escapeKey(event)
  first.dismiss.escapeKey(event)
  assert.equal(second.getSnapshot().open, false)
  assert.equal(first.getSnapshot().open, true)
  first.destroy()
  second.destroy()
})

test('hover and focus sources keep content open until both leave', async () => {
  const requests: boolean[] = []
  const trigger = createTrigger({
    trigger: ['hover', 'focus'],
    hoverCloseDelay: 0,
    onOpenChangeRequest: (open) => requests.push(open),
  })
  trigger.trigger.pointerEnter({})
  trigger.trigger.focus({})
  trigger.trigger.pointerLeave({})
  await new Promise((resolve) => setTimeout(resolve, 5))
  assert.equal(requests.at(-1), true)
  trigger.trigger.blur({})
  assert.equal(requests.at(-1), false)
  trigger.destroy()
})

test('dismiss cancels pending hover open instead of reopening a closed Popover', async () => {
  const requests: boolean[] = []
  const trigger = createTrigger({
    trigger: ['hover'],
    hoverOpenDelay: 10,
    onOpenChangeRequest: (open) => requests.push(open),
  })
  trigger.trigger.pointerEnter({})
  trigger.clear({ reason: 'manual' }, false)
  await new Promise((resolve) => setTimeout(resolve, 20))
  assert.deepEqual(requests, [])
  trigger.destroy()
})

test('closing a parent closes its descendants through the shared controller', () => {
  const parent = createPopover({ defaultOpen: true, closeDelay: 0 })
  const child = createPopover({ defaultOpen: true, closeDelay: 0 }, parent)
  const grandchild = createPopover({ defaultOpen: true, closeDelay: 0 }, child)
  parent.close()
  assert.equal(child.getSnapshot().open, false)
  assert.equal(grandchild.getSnapshot().open, false)
  assert.equal(child.getSnapshot().mounted, true)
  grandchild.destroy()
  child.destroy()
  parent.destroy()
})
