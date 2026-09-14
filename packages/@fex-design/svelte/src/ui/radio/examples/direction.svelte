<script lang="ts">
  import { Radio, RadioButton, RadioGroup } from '@fex-design/svelte/ui/radio';
</script>

<div class="grid gap-3"><RadioGroup defaultValue="cn" orientation="horizontal" dir="ltr"><Radio value="cn">中文</Radio></RadioGroup><RadioGroup defaultValue="ar" orientation="horizontal" dir="rtl"><Radio value="ar">العربية</Radio></RadioGroup></div>
<div class="grid gap-2"><RadioGroup defaultValue="cn" class="gap-0" dir="ltr"><RadioButton value="cn">中文按钮</RadioButton></RadioGroup><RadioGroup defaultValue="ar" class="gap-0" dir="rtl"><RadioButton value="ar">زر عربي</RadioButton></RadioGroup></div>
