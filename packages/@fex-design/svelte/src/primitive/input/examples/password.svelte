<script lang="ts">
  import { inputActionClassName } from '@fex-design/styles/input'
  import EyeIcon from '@fex-design/svelte/icon/eye'
  import EyeOffIcon from '@fex-design/svelte/icon/eye-off'
  import { InputClear,InputControl,InputRoot,InputSuffix } from '@fex-design/svelte/primitive/input'
  let firstVisible=$state(false); let invalidVisible=$state(false)
</script>
<div class="grid w-full gap-3"><InputRoot defaultValue="secret"><InputControl type={firstVisible?'text':'password'}/><InputSuffix><button type="button" class={inputActionClassName} aria-label="Toggle password" aria-pressed={firstVisible} onclick={()=>firstVisible=!firstVisible}>{#if firstVisible}<EyeOffIcon/>{:else}<EyeIcon/>{/if}</button></InputSuffix></InputRoot><InputRoot><InputControl type="password" placeholder="无切换按钮"/></InputRoot><InputRoot defaultValue="wrong-password"><InputControl type={invalidVisible?'text':'password'} aria-invalid="true"/><InputClear/><InputSuffix><button type="button" class={inputActionClassName} aria-label="Toggle password" aria-pressed={invalidVisible} onclick={()=>invalidVisible=!invalidVisible}>{#if invalidVisible}<EyeOffIcon/>{:else}<EyeIcon/>{/if}</button></InputSuffix></InputRoot></div>
