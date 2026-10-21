import type { JSX } from 'solid-js'
/** Solid native handlers can be a function or a bound [handler, data] tuple. */
export function callCalendarHandler<T extends HTMLElement, E extends Event>(
  handler: JSX.EventHandlerUnion<T, E> | undefined,
  event: E & { currentTarget: T; target: Element },
) {
  if (typeof handler === 'function') handler(event)
  else if (handler) handler[0](handler[1], event)
}
