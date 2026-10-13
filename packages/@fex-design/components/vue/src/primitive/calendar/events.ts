/** Vue merges v-bind listeners with explicit listeners; handled events are forwarded once. */
export function callCalendarHandler(handler: unknown, event: Event) {
  if (Array.isArray(handler)) {
    for (const listener of handler) callCalendarHandler(listener, event)
  } else if (typeof handler === 'function') {
    handler(event)
  }
}
