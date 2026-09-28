import { cn } from '@demo/utils'
import { type ComponentProps } from 'react'

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card" className={cn("group/card block overflow-hidden rounded-[var(--card-radius,var(--radius-md))] [border:var(--card-border,1px_solid_var(--border))] shadow-[var(--card-shadow,none)]", className)} {...props} />
}
export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cn("group/card-header grid grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto] gap-x-4 gap-y-1 bg-[var(--card-header-background,var(--card-background,var(--elevated-background)))] p-[var(--card-header-padding,1rem)] [border-bottom:var(--card-header-divider,1px_solid_var(--border))]", className)} {...props} />
}
export function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cn("col-start-1 row-start-1 min-w-0 text-base font-medium leading-snug text-foreground", className)} {...props} />
}
export function CardDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn("col-start-1 row-start-2 min-w-0 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
export function CardExtra({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-extra" className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)} {...props} />
}
export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn("bg-[var(--card-content-background,var(--card-background,var(--elevated-background)))] p-[var(--card-content-padding,1rem)]", className)} {...props} />
}
export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn("flex items-center bg-[var(--card-footer-background,var(--card-background,var(--elevated-background)))] [border-top:var(--card-footer-divider,1px_solid_var(--border))] p-[var(--card-footer-padding,1rem)]", className)} {...props} />
}
