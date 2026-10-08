export type TimelineOrientation = 'vertical' | 'horizontal'
export type TimelineAlign = 'start' | 'end' | 'alternate'
export type TimelinePlacement = 'start' | 'end'
export type TimelineBuiltinStatus =
  | 'default'
  | 'completed'
  | 'current'
  | 'pending'
  | 'error'
  | 'disabled'
export type TimelineStatus = TimelineBuiltinStatus | (string & {})
