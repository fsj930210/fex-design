import { useCoreStore } from "@/hooks/use-core-store"
import { useTooltipContext } from "./tooltip-context"

export function useTooltip(component = "useTooltip") {
  const context = useTooltipContext(component)
  const snapshot = useCoreStore(context.overlay)
  return { ...context, snapshot }
}
