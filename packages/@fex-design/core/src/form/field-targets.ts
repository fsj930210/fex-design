import type { FormScrollOptions, FormTarget } from './types'

export function createFormTargets() {
  const targets = new Set<FormTarget>()
  const fields = new Map<string, Set<symbol>>()
  return {
    claim(name: string) {
      const token = Symbol(name)
      const owners = fields.get(name) ?? new Set<symbol>()
      fields.set(name, owners)
      owners.add(token)
      // Array reordering can temporarily swap paths during one framework commit.
      queueMicrotask(() => {
        if ((fields.get(name)?.size ?? 0) > 1)
          throw new Error(`Duplicate FormField: ${name}. Use a subscription for repeated displays.`)
      })
      return () => {
        owners.delete(token)
        if (!owners.size && fields.get(name) === owners) fields.delete(name)
      }
    },
    register(target: FormTarget) {
      targets.add(target)
      return () => {
        targets.delete(target)
      }
    },
    find(name?: string) {
      const elements = [...targets]
        .filter((target) => (name === undefined ? target.invalid() : target.name() === name))
        .map((target) => target.element())
        .filter(
          (element): element is HTMLElement =>
            !!element &&
            element.isConnected &&
            !element.matches(':disabled,[aria-disabled="true"]') &&
            element.getClientRects().length > 0 &&
            (element.tabIndex >= 0 || element.isContentEditable) &&
            !element.closest('[inert]') &&
            element.ownerDocument.defaultView?.getComputedStyle(element).visibility !== 'hidden',
        )
      // Connected nodes use DOM order; disconnected portal trees retain registration order.
      elements.sort((left, right) => {
        const relation = left.compareDocumentPosition(right)
        return relation & 1 ? 0 : relation & 4 ? -1 : relation & 2 ? 1 : 0
      })
      return elements[0] ?? null
    },
  }
}

export type FormTargets = ReturnType<typeof createFormTargets>

export function focusField(scope: FormTargets, name: string) {
  const element = scope.find(name)
  element?.focus({ preventScroll: true })
  return element
}

export function scrollToField(scope: FormTargets, name?: string, options: FormScrollOptions = {}) {
  const element = scope.find(name)
  if (!element) return null
  const { focus = true, ...scroll } = options
  if (focus) element.focus({ preventScroll: true })
  const reduced = element.ownerDocument.defaultView?.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  element.scrollIntoView({
    block: 'center',
    inline: 'nearest',
    ...scroll,
    ...(reduced ? { behavior: 'instant' } : {}),
  })
  return element
}
