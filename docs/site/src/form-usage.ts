import type { Framework } from './types'
import type { UsageItem } from './usage-snippets-part1'

export function getFormUsage(framework: Framework, layer: 'primitive' | 'ui'): UsageItem {
  const ui = layer === 'ui'
  const family = `@fex-design/${framework}/${layer}`
  const formNames = ui
    ? 'Form, FormField'
    : 'FormRoot, FormField, FormControl, FormLabel, FormError'
  const inputNames = ui ? 'Input' : 'InputRoot, InputControl'
  const formImport = `import { ${formNames} } from '${family}/form'`
  const inputImport = `import { ${inputNames} } from '${family}/input'`
  if (framework === 'react' || framework === 'solid') {
    const solid = framework === 'solid'
    const creator = solid ? 'createForm' : 'useForm'
    const field = solid ? 'field()' : 'field'
    const input = ui
      ? `<Input value={${field}.state.value} onChange={(event) => ${field}.handleChange(event.currentTarget.value)} onBlur={() => ${field}.handleBlur()} />`
      : `<InputRoot value={${field}.state.value} onChange={(value) => ${field}.handleChange(value)}>
              <InputControl onBlur={() => ${field}.handleBlur()} />
            </InputRoot>`
    const root = ui ? 'Form' : 'FormRoot'
    return {
      import: `import { ${creator} } from '@tanstack/${framework}-form'\n${formImport}\n${inputImport}`,
      code: `export function EmailForm() {
  const form = ${creator}(${solid ? '() => (' : ''}{ defaultValues: { email: '' } }${solid ? ')' : ''})
  return (
    <${root} form={form}>
      <FormField name="email"${ui ? ' label="工作邮箱"' : ''}>
        {(field) => (${ui ? '\n          ' + input : '\n          <>\n            <FormLabel>工作邮箱</FormLabel>\n            <FormControl>\n              ' + input + '\n            </FormControl>\n            <FormError />\n          </>'}
        )}
      </FormField>
    </${root}>
  )
}`,
    }
  }
  if (framework === 'vue') {
    const root = ui ? 'Form' : 'FormRoot'
    const input = ui
      ? '<Input :value="field.state.value" @input="(event) => field.handleChange((event.target as HTMLInputElement).value)" @blur="field.handleBlur()" />'
      : '<InputRoot :value="field.state.value" @change="field.handleChange"><InputControl @blur="field.handleBlur()" /></InputRoot>'
    return {
      import: `import { useForm } from '@tanstack/vue-form'\n${formImport}\n${inputImport}`,
      code: `<script setup lang="ts">
const form = useForm({ defaultValues: { email: '' } })
</script>

<template>
  <${root} :form="form">
    <FormField name="email"${ui ? ' label="工作邮箱"' : ''} v-slot="{ field }">
      ${ui ? input : '<FormLabel>工作邮箱</FormLabel>\n      <FormControl>' + input + '</FormControl>\n      <FormError />'}
    </FormField>
  </${root}>
</template>`,
    }
  }
  if (framework === 'svelte') {
    const root = ui ? 'Form' : 'FormRoot'
    const input = ui
      ? '<Input value={field.state.value} oninput={(event) => field.handleChange(event.currentTarget.value)} onblur={() => field.handleBlur()} />'
      : '<InputRoot value={field.state.value} onChange={(value) => field.handleChange(value)}><InputControl onblur={() => field.handleBlur()} /></InputRoot>'
    return {
      import: `import { createForm } from '@tanstack/svelte-form'\n${formImport}\n${inputImport}`,
      code: `<script lang="ts">
const form = createForm(() => ({ defaultValues: { email: '' } }))
</script>

<${root} {form}>
  <FormField name="email"${ui ? ' label="工作邮箱"' : ''}>
    {#snippet children(field)}
      ${ui ? input : '<FormLabel>工作邮箱</FormLabel>\n      <FormControl>' + input + '</FormControl>\n      <FormError />'}
    {/snippet}
  </FormField>
</${root}>`,
    }
  }
  return {
    import: `import { Component } from '@angular/core'
import { injectForm${ui ? '' : ', TanStackField'} } from '@tanstack/angular-form'
${formImport}
${inputImport}`,
    code: `@Component({
  selector: 'section[emailForm]',
  standalone: true,
  imports: [${formNames}, ${inputNames}${ui ? '' : ', TanStackField'}],
  template: \`
    <form ${ui ? 'uiForm' : 'formRoot'} [form]="form">
      ${ui ? '<ng-template #emailLabel>工作邮箱</ng-template>' : ''}
      <div formField [tanstackField]="form" name="email" #email="field"${ui ? ' [label]="emailLabel"' : ''}>
        ${ui ? '<div input [value]="email.api.state.value" (onChange)="email.api.handleChange($any($event).target.value)" (focusout)="email.api.handleBlur()"></div>' : '<label formLabel>工作邮箱</label>\n        <ng-container formControl>\n          <div inputRoot [value]="email.api.state.value">\n            <input inputControl (input)="email.api.handleChange($any($event).target.value)" (blur)="email.api.handleBlur()" />\n          </div>\n        </ng-container>\n        <div formError></div>'}
      </div>
    </form>
  \`,
})
export class EmailForm {
  readonly form = injectForm({ defaultValues: { email: '' } })
}`,
  }
}
