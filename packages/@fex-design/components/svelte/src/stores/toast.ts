import { readableCoreStore } from './core-store'
import { toast, type SvelteToastManager } from '@fex-design/svelte/primitive/toast/toast-manager'

export function createToastStore(manager: SvelteToastManager = toast) {
  return readableCoreStore(manager)
}
