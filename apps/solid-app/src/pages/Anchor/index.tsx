import { A } from '@solidjs/router'
import { AnchorDemo } from './anchor-demo'
import { HorizontalDemo } from './horizontal-demo'
export function AnchorPage() { return <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4"><div class="mx-auto w-full max-w-5xl space-y-4"><header class="space-y-2"><A class="text-sm text-muted-foreground hover:text-foreground" href="/">Back home</A><h1 class="text-2xl font-semibold">Anchor</h1><p class="text-sm text-muted-foreground">Navigate and track sections in a scroll container.</p></header><div class="grid gap-4"><AnchorDemo /><HorizontalDemo /></div></div></main> }

