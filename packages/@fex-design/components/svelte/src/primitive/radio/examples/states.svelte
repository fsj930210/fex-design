<script lang="ts">
  import {
    Radio,
    RadioButton,
    RadioGroup,
  } from "@fex-design/svelte/primitive/radio";
</script>

<RadioGroup defaultValue="checked" orientation="horizontal"
  ><label class="inline-flex items-center gap-2"
    ><Radio value="empty" />未选中</label
  ><label class="inline-flex items-center gap-2"
    ><Radio value="checked" />已选中</label
  ><label class="inline-flex items-center gap-2"
    ><Radio value="disabled" disabled />禁用</label
  ></RadioGroup
>
<RadioGroup defaultValue="checked" orientation="horizontal" class="gap-0"
  ><RadioButton value="empty">未选中</RadioButton><RadioButton value="checked"
    >已选中</RadioButton
  ><RadioButton value="disabled" disabled>禁用</RadioButton></RadioGroup
>
