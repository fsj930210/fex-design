import type { JSX } from 'solid-js'

/** Invoke both native Solid event handler forms before component behavior. */
export function callEventHandler<T, E extends Event>(
  handler: JSX.EventHandlerUnion<T, E> | null | undefined,
  event: E,
): void {
  const targetedEvent = event as Parameters<JSX.EventHandler<T, E>>[0]
  if (typeof handler === 'function') handler(targetedEvent)
  else if (handler) handler[0](handler[1], targetedEvent)
}
