import type { InjectionKey } from 'vue'
import type { UseInputNumberReturn } from './use-input-number'

export const inputNumberContextKey: InjectionKey<UseInputNumberReturn> = Symbol('InputNumber')
