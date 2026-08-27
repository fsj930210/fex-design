export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerOptions {
  size?: SpinnerSize
}

/** `root` is the container; `spinner` is the visual indicator. */
export type SpinnerPart = 'root' | 'spinner' | 'overlay' | 'text'

export type SpinnerClassNames = Partial<Record<SpinnerPart, string>>

export type SpinnerStyles<TStyle> = Partial<Record<SpinnerPart, TStyle>>

export interface SpinnerContainerOptions<TNode = unknown, TStyle = unknown> {
  spinning?: boolean
  text?: TNode
  indicator?: TNode
  classNames?: SpinnerClassNames
  styles?: SpinnerStyles<TStyle>
}
