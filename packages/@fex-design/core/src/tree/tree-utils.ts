import type { TreeKey, TreeMutationResult } from './types'
export function uniqueKeys(keys: readonly TreeKey[]) {
  return [...new Set(keys)]
}

export function sameKeys(left: readonly TreeKey[], right: readonly TreeKey[]) {
  return left.length === right.length && left.every((key, index) => key === right[index])
}

export function failMutation(type: TreeMutationResult['type'], reason: string): TreeMutationResult {
  return { ok: false, type, changedKeys: [], reason }
}
