import Component from './dialog.svelte'
import { alert, confirm, destroyAll } from './static'
export const Dialog = Object.assign(Component, { alert, confirm, destroyAll })
export { alert, confirm, destroyAll }
export type { DialogStaticOptions, DialogStaticButtonProps, DialogStaticContent } from './static'
export type { DialogRequestHandle } from './static'
