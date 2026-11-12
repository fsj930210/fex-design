/** Preserve validator payloads in TanStack; only derive displayable messages here. */
export function getFormErrorMessages(errors: readonly unknown[]): string[] {
  const messages: string[] = []
  for (const error of errors) {
    const message =
      typeof error === 'string'
        ? error
        : error &&
            typeof error === 'object' &&
            'message' in error &&
            typeof error.message === 'string'
          ? error.message
          : undefined
    if (message && !messages.includes(message)) messages.push(message)
  }
  return messages
}
