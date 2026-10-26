export function getTreeDemoChildren(
  data: Record<string, unknown>,
): readonly Record<string, unknown>[] {
  return Array.isArray(data.children) ? data.children : []
}
