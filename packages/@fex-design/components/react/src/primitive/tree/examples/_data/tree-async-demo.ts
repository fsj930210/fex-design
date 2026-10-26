export const asyncTreeDemoData: readonly Record<string, unknown>[] = Array.from(
  { length: 2 },
  (_, index) => ({
    key: `async-root-${index + 1}`,
    title: `Lazy department ${index + 1}`,
    isLeaf: false,
  }),
)
export function createTreeDemoChildren(
  parentKey: string,
  count = 5,
): readonly Record<string, unknown>[] {
  return Array.from({ length: count }, (_, index) => ({
    key: `${parentKey}-loaded-${index + 1}`,
    title: `Loaded item ${index + 1}`,
  }))
}
