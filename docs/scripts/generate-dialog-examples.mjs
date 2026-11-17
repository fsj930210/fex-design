import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const ids = [
  'basic',
  'custom-header',
  'overlay',
  'custom-footer',
  'fullscreen',
  'position',
  'size',
  'advanced',
  'direction',
  'css-variables',
  'semantic-styles',
]
const root = 'packages/@fex-design/components'

for (const id of ids) {
  const title = id
  const pascal = id.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())
  await mkdir(join(root, 'vue/src/ui/dialog/examples'), { recursive: true })
  await writeFile(
    join(root, `vue/src/ui/dialog/examples/${id}.vue`),
    `<script setup lang="ts">
import { ref } from 'vue'
import { Dialog } from '@fex-design/vue/ui/dialog'
import { Button } from '@fex-design/vue/primitive/button'
const open = ref(false)
</script>
<template><Button @click="open = true">打开 Dialog</Button><Dialog v-model:open="open" title="${title}"><p>Dialog ${title} 场景。</p></Dialog></template>
`,
  )
  await mkdir(join(root, 'solid/src/ui/dialog/examples'), { recursive: true })
  await writeFile(
    join(root, `solid/src/ui/dialog/examples/${id}.tsx`),
    `import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/primitive/button'
export function Dialog${pascal}Example(){const [open,setOpen]=createSignal(false);return <><Button onClick={() => setOpen(true)}>打开 Dialog</Button><Dialog open={open()} onOpenChange={setOpen} title="${title}"><p>Dialog ${title} 场景。</p></Dialog></>}
`,
  )
  await mkdir(join(root, 'svelte/src/ui/dialog/examples'), { recursive: true })
  await writeFile(
    join(root, `svelte/src/ui/dialog/examples/${id}.svelte`),
    `<script lang="ts">
  import Dialog from '@fex-design/svelte/ui/dialog'
  import Button from '@fex-design/svelte/primitive/button'
  let open = $state(false)
</script>
<Button onclick={() => open = true}>打开 Dialog</Button>
<Dialog bind:open title="${title}"><p>Dialog ${title} 场景。</p></Dialog>
`,
  )
  await mkdir(join(root, 'angular/src/ui/dialog/examples'), { recursive: true })
  await writeFile(
    join(root, `angular/src/ui/dialog/examples/${id}.ts`),
    `import { Component } from '@angular/core'
import { Dialog } from '@fex-design/angular/ui/dialog'
@Component({selector: 'dialog-${id}-example', standalone: true, imports: [Dialog], templateUrl: './${id}.html'})
export class Dialog${pascal}Example {}
`,
  )
  await writeFile(
    join(root, `angular/src/ui/dialog/examples/${id}.html`),
    `<div dialogUi [title]="'${title}'"><button dialogTrigger>打开 Dialog</button><p>Dialog ${title} 场景。</p></div>
`,
  )
}
