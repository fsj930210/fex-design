import { cva, type VariantProps } from 'class-variance-authority'

export const sliderRootClassName = cva(
  'relative cursor-pointer touch-none select-none [--slider-track-background:var(--color-border)] [--slider-range-background:var(--color-primary)] [--slider-disabled-range-background:var(--color-muted-foreground)] [--slider-thumb-background:var(--color-background)] [--slider-thumb-border-color:var(--color-primary)] [--slider-mark-color:var(--color-muted-foreground)] data-[disabled]:cursor-not-allowed data-[disabled]:[&_*]:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: '[--slider-track-height:4px] [--slider-thumb-size:14px]',
        md: '[--slider-track-height:6px] [--slider-thumb-size:16px]',
        lg: '[--slider-track-height:8px] [--slider-thumb-size:20px]',
      },
      orientation: {
        horizontal: 'h-[var(--slider-thumb-size)] w-full min-w-0',
        vertical: 'h-40 w-[var(--slider-thumb-size)]',
      },
    },
    defaultVariants: {
      size: 'md',
      orientation: 'horizontal',
    },
  },
)

export const sliderInputClassName = [
  'h-[var(--slider-thumb-size)] w-full min-w-0 cursor-pointer appearance-none bg-transparent outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50',
  '[&::-webkit-slider-runnable-track]:h-[var(--slider-track-height)] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-border',
  '[&::-webkit-slider-thumb]:mt-[calc((var(--slider-track-height)-var(--slider-thumb-size))/2)] [&::-webkit-slider-thumb]:size-[var(--slider-thumb-size)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm',
  '[&::-moz-range-track]:h-[var(--slider-track-height)] [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-border',
  '[&::-moz-range-progress]:h-[var(--slider-track-height)] [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-primary',
  '[&::-moz-range-thumb]:size-[var(--slider-thumb-size)] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:shadow-sm',
  'focus-visible:[&::-webkit-slider-thumb]:ring-3 focus-visible:[&::-webkit-slider-thumb]:ring-focus/50',
  'focus-visible:[&::-moz-range-thumb]:ring-3 focus-visible:[&::-moz-range-thumb]:ring-focus/50',
].join(' ')

export const sliderValueClassName = 'text-sm text-muted-foreground'

export const sliderTrackClassName = [
  'absolute block cursor-pointer rounded-full bg-[var(--slider-track-background)]',
  'data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:h-[var(--slider-track-height)] data-[orientation=horizontal]:w-full data-[orientation=horizontal]:-translate-y-1/2',
  'data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[var(--slider-track-height)] data-[orientation=vertical]:-translate-x-1/2',
  'data-[disabled]:cursor-not-allowed data-[disabled]:bg-border',
].join(' ')

export const sliderRangeClassName = [
  'absolute cursor-pointer rounded-full bg-[var(--slider-range-background)] transition-none data-[disabled]:cursor-not-allowed data-[disabled]:bg-[var(--slider-disabled-range-background)]',
  'data-[orientation=horizontal]:inset-y-0',
  'data-[orientation=vertical]:inset-x-0',
].join(' ')

export const sliderThumbClassName = [
  'z-10 block size-[var(--slider-thumb-size)] cursor-pointer rounded-full border border-[var(--slider-thumb-border-color)] bg-[var(--slider-thumb-background)] shadow-md outline-none transition-shadow hover:shadow-lg',
  'focus-visible:ring-3 focus-visible:ring-focus/50',
  'data-[disabled]:cursor-not-allowed data-[disabled]:border-muted-foreground data-[disabled]:bg-background data-[disabled]:opacity-100 data-[disabled]:shadow-none data-[disabled]:hover:shadow-none',
].join(' ')

export const sliderMarkClassName = [
  'absolute z-0 size-2 -translate-x-1/2 cursor-pointer rounded-full border border-[var(--slider-mark-color)] bg-[var(--slider-thumb-background)] text-xs text-muted-foreground',
  '[&>span]:absolute [&>span]:left-1/2 [&>span]:top-full [&>span]:mt-2 [&>span]:-translate-x-1/2 [&>span]:whitespace-nowrap',
  'data-[edge=start]:[&>span]:translate-x-0 data-[edge=end]:[&>span]:-translate-x-full',
  'data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:-translate-y-1/2',
  'data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:translate-x-[-50%]',
  'data-[active=true]:border-[var(--slider-range-background)]',
].join(' ')

export type SliderStyleProps = VariantProps<typeof sliderRootClassName>
