<script lang="ts">
import { calendarDefaultLocale } from '@fex-design/core/calendar'
import { usePickerAppearance } from './appearance-context'
  import { isPickerActionBlocked } from '@fex-design/core/date-picker/view';

  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '@fex-design/utils';
  import { datePickerTodayClassName } from '@fex-design/components-styles/date-picker';
      import { Button } from '../button';
  import { useFooterOwner } from './date-picker-footer-owner';
  let { class: className, children, onclick, ...rest }: Omit<HTMLButtonAttributes,'children'> & { children?: Snippet } = $props();
  const owner = useFooterOwner();
  const appearance = usePickerAppearance();
</script>
<Button {...rest} type="button" data-slot="date-picker-today" class={cn(datePickerTodayClassName, className)}  onclick={event => { onclick?.(event); if (!isPickerActionBlocked(event)) { owner.today(); } }}>
  {#if children}{@render children()}{:else}{appearance().calendarProps?.locale?.today ?? calendarDefaultLocale.today}{/if}
</Button>
