import type { ComponentProps } from 'svelte'
import Card from './card.svelte'

export { Card }
export type { CardClassNames, CardStyles } from './card.svelte'
export type CardProps = ComponentProps<typeof Card>
