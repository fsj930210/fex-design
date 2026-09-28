export const progressRootClassName =
  "group/progress relative inline-flex items-center justify-center text-sm"
export const progressLineClassName =
  "relative h-2 w-full min-w-20 overflow-hidden rounded-full bg-[var(--progress-remaining)]"
export const progressLineRangeClassName =
  "h-full origin-left rounded-[inherit] bg-primary transition-[width] duration-300 data-[status=pending]:bg-muted-foreground data-[status=success]:bg-success data-[status=error]:bg-danger motion-reduce:transition-none"
export const progressCircleClassName = "block shrink-0"
export const progressCircleTrackClassName = "text-[var(--progress-remaining)]"
export const progressCircleRangeClassName =
  "origin-center text-primary transition-[stroke-dasharray] duration-300 ease-out [transform-box:fill-box] data-[status=pending]:text-muted-foreground data-[status=success]:text-success data-[status=error]:text-danger motion-reduce:transition-none"
export const progressValueClassName =
  "font-medium text-foreground inline-flex items-center justify-center"
export const progressLabelClassName =
  "text-sm font-medium text-foreground"
export const progressTopHeaderClassName =
  "flex items-center justify-between text-sm mb-1.5 w-full"
export const progressStepLineContainerClassName =
  "inline-flex items-center gap-1.5"
export const progressStepLineTrackClassName =
  "flex items-center gap-1"
export const progressStepLineItemClassName =
  "h-2 w-4 rounded-[1px] transition-colors duration-200"
