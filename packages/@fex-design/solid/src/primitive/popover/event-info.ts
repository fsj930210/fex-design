import type { JSX } from 'solid-js'
export function eventInfo(event: Event & Partial<PointerEvent>) {
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: event.clientX,
    clientY: event.clientY,
    button: event.button,
    pointerType: event.pointerType,
    event,
    preventDefault: event.preventDefault.bind(event),
    stopPropagation: event.stopPropagation.bind(event),
  }
}


/** Solid native events accept either a callback or a bound [callback, data] tuple. */
export function callEventHandler<T, E extends Event>(
  handler: JSX.EventHandlerUnion<T, E> | undefined,
  event: Parameters<JSX.EventHandler<T, E>>[0],
) {
  if (typeof handler === 'function') handler(event)
  else if (handler) handler[0](handler[1], event)
}
