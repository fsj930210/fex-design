export type ProgressVariant = "line" | "circle" | "dashboard"
export type ProgressStatus = "pending" | "active" | "success" | "error"
export type ProgressLinecap = "round" | "butt" | "square"
export type ProgressInfoPlacement = "outside" | "inside" | "top" | "bottom" | "none"
export type ProgressSize = "sm" | "md" | "lg" | number
export type ProgressGapPlacement = "top" | "bottom" | "start" | "end" | "left" | "right"

export type ProgressGradient =
  | { from: string; to: string; direction?: string }
  | { stops: Record<string, string>; direction?: string }
export type ProgressColor = string | ProgressGradient

export interface ProgressGeometry {
  value: number | null
  percentage: number | null
  radius: number
  center: number
  circumference: number
  trackDasharray: string
  rangeDasharray: string
  dashOffset: number
  rotation: number
  arcRatio: number
}

export interface ProgressContextValue {
  value: number | null
  min: number
  max: number
  percentage: number | null
  status: ProgressStatus
  variant: ProgressVariant
  thickness?: number
  size?: number
}

export interface CircleStepsGeometry {
  size: number
  thickness: number
  radius: number
  circumference: number
  activeSteps: number
  stepDasharray: string
  stepLength: number
  gapLength: number
  steps: Array<{ index: number; active: boolean; offset: number }>
}

export interface ProgressRangeItem {
  value: number
  color?: string | undefined
}
