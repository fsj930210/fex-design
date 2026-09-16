export interface InputNumberFormatInfo {
  userTyping: boolean
  input: string
}

export type InputNumberParser = (text: string) => number | undefined
export type InputNumberFormatter = (
  value: number | undefined,
  info: InputNumberFormatInfo,
) => string

export interface InputNumberConstraints {
  min?: number | undefined
  max?: number | undefined
  step?: number | undefined
  precision?: number | undefined
}

export type InputNumberChangeSource = 'input' | 'blur' | 'increment' | 'decrement' | 'clear'

export interface InputNumberChangeMeta<EventType = Event> {
  event: EventType
  source: InputNumberChangeSource
}

export type InputNumberPart =
  | 'root'
  | 'control'
  | 'prefix'
  | 'suffix'
  | 'clear'
  | 'actions'
  | 'increment'
  | 'decrement'
