import { A } from '@solidjs/router'
import { BasicDemo } from './basic-demo'
import { ConstraintsDemo } from './constraints-demo'
import { CustomLogicDemo } from './custom-logic-demo'
import { FormatterDemo } from './formatter-demo'
import { KeyboardDemo } from './keyboard-demo'
import { MinMaxDemo } from './min-max-demo'
import { StatesDemo } from './states-demo'
import { SuffixDemo } from './suffix-demo'
import { ValidationDemo } from './validation-demo'
export function InputNumberPage() {
  return (
    <main class="min-h-screen bg-secondary-background px-2 md:px-6 py-4">
      <div class="mx-auto w-full max-w-5xl space-y-4">
        <header>
          <A href="/">Back home</A>
          <h1 class="text-2xl font-semibold">InputNumber primitive</h1>
        </header>
        <div class="grid gap-4">
          <BasicDemo />
          <ConstraintsDemo />
          <MinMaxDemo />
          <FormatterDemo />
          <SuffixDemo />
          <KeyboardDemo />
          <StatesDemo />
          <ValidationDemo />
          <CustomLogicDemo />
        </div>
      </div>
    </main>
  )
}
