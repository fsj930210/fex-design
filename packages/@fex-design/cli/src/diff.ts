export interface DiffLine {
  type: "add" | "remove" | "same"
  text: string
}

/** Compute simple line-based diff using Longest Common Subsequence (LCS) */
export function computeLineDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split(/\r?\n/)
  const newLines = newText.split(/\r?\n/)

  const m = oldLines.length
  const n = newLines.length

  // Build DP table for LCS
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i]![j] = dp[i - 1]![j - 1]! + 1
      } else {
        dp[i]![j] = Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!)
      }
    }
  }

  // Backtrack to build diff
  const result: DiffLine[] = []
  let i = m
  let j = n

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({ type: "same", text: oldLines[i - 1]! })
      i--
      j--
    } else if (j > 0 && (i === 0 || dp[i]![j - 1]! >= dp[i - 1]![j]!)) {
      result.unshift({ type: "add", text: newLines[j - 1]! })
      j--
    } else if (i > 0 && (j === 0 || dp[i]![j - 1]! < dp[i - 1]![j]!)) {
      result.unshift({ type: "remove", text: oldLines[i - 1]! })
      i--
    }
  }

  return result
}

/** Format diff lines with terminal ANSI colors */
export function formatDiffOutput(diffs: DiffLine[]): string {
  const hasChanges = diffs.some((d) => d.type !== "same")
  if (!hasChanges) {
    return "✔ Local file matches registry source (0 differences).\n"
  }

  const green = "\x1b[32m"
  const red = "\x1b[31m"
  const reset = "\x1b[0m"
  const dim = "\x1b[2m"

  const output: string[] = []
  for (const item of diffs) {
    if (item.type === "add") {
      output.push(`${green}+ ${item.text}${reset}`)
    } else if (item.type === "remove") {
      output.push(`${red}- ${item.text}${reset}`)
    } else {
      output.push(`${dim}  ${item.text}${reset}`)
    }
  }

  return output.join("\n") + "\n"
}
