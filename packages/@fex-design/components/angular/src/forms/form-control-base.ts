import { computed, signal } from '@angular/core'
import type { ControlValueAccessor } from '@angular/forms'

export abstract class FormControlBase<TValue> implements ControlValueAccessor {
  protected readonly formValue = signal<TValue | undefined>(undefined)
  protected readonly hasFormValue = signal(false)
  private formChange: (value: TValue) => void = () => {}
  private onTouched: () => void = () => {}

  writeValue(value: TValue): void {
    console.debug('[angular-form][cva] writeValue', { value })
    this.hasFormValue.set(true)
    this.formValue.set(value)
  }

  protected resolveFormValue<TExternal>(
    external: () => TExternal | undefined,
    fallback: () => TValue | undefined,
  ) {
    return computed(() => {
      const value = external()
      return value !== undefined ? value : this.hasFormValue() ? this.formValue() : fallback()
    })
  }

  registerOnChange(fn: (value: TValue) => void): void {
    this.formChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(_disabled: boolean): void {}

  protected emitFormValue(value: TValue): void {
    console.debug('[angular-form][cva] emitFormValue', { value })
    this.formValue.set(value)
    this.formChange(value)
  }

  protected markFormTouched(): void {
    this.onTouched()
  }

  protected get formChangeHandler() {
    return this.formChange
  }
}

export type FormChangeHandler<TValue> = (value: TValue) => void

export function createFormValueState<TValue>() {
  const value = signal<TValue | undefined>(undefined)
  const hasValue = signal(false)
  return {
    value,
    hasValue,
    write(next: TValue | undefined) {
      hasValue.set(true)
      value.set(next)
    },
    resolve(external: TValue | undefined, fallback?: TValue) {
      return external !== undefined ? external : hasValue() ? value() : fallback
    },
  }
}
