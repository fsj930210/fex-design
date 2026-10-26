import type { TreeKey } from './types'
export function uniqueKeys(keys: readonly TreeKey[]) {
  return [...new Set(keys)]
}

export function sameKeys(left: readonly TreeKey[], right: readonly TreeKey[]) {
  return left.length === right.length && left.every((key, index) => key === right[index])
}
