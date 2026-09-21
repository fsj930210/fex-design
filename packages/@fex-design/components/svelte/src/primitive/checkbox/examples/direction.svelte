<script lang="ts">
  import {
    CheckboxRoot,
    CheckboxControl,
    CheckboxIndicator,
    CheckboxLabel,
    CheckboxGroup,
  } from "@fex-design/svelte/primitive/checkbox";
</script>

<div class="grid gap-3">
  <CheckboxRoot
    ><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel
      >接收消息通知</CheckboxLabel
    ></CheckboxRoot
  >
  <div dir="rtl">
    <CheckboxRoot
      ><CheckboxControl defaultChecked /><CheckboxIndicator /><CheckboxLabel
        >تلقي إشعارات الرسائل</CheckboxLabel
      ></CheckboxRoot
    >
  </div>
</div>
