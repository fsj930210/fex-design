import { usageSnippetsPart1, type UsageItem, type ComponentUsage } from "./usage-snippets-part1"
import { usageSnippetsPart2 } from "./usage-snippets-part2"

export type { UsageItem, ComponentUsage }

export const usageSnippets: Record<string, ComponentUsage> = {
  ...usageSnippetsPart1,
  ...usageSnippetsPart2,
}
