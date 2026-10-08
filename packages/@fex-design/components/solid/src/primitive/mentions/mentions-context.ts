import { createContext, useContext, type Accessor } from 'solid-js'
import { createMentionsController } from '@fex-design/core/mentions/create-mentions-controller'

export interface MentionsContextValue {
  controller: ReturnType<typeof createMentionsController>
  snapshot: Accessor<ReturnType<ReturnType<typeof createMentionsController>['getSnapshot']>>
  listId: string
  disabled: Accessor<boolean>
  readOnly: Accessor<boolean>
  invalid: Accessor<boolean>
  required: Accessor<boolean>
}

export const MentionsContext = createContext<MentionsContextValue>()

export function useMentionsContext(component: string) {
  const context = useContext(MentionsContext)
  if (!context) throw new Error(component + ' must be used inside MentionsRoot.')
  return context
}
