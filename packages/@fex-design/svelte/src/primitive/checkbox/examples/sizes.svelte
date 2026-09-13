<script lang="ts">
  import { CheckboxRoot, CheckboxControl, CheckboxIndicator, CheckboxLabel, CheckboxGroup } from '@fex-design/svelte/primitive/checkbox';
</script>

<div class="grid gap-3"><CheckboxRoot size="sm"><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel>小尺寸</CheckboxLabel></CheckboxRoot><CheckboxRoot size="md"><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel>中尺寸</CheckboxLabel></CheckboxRoot><CheckboxRoot size="lg"><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel>大尺寸</CheckboxLabel></CheckboxRoot></div>
