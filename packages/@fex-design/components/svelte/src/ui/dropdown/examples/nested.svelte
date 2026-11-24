<script lang="ts">
  import { Dropdown } from "@fex-design/svelte/ui/dropdown";
  let value = $state("尚未选择");
  const items = [
    { value: "rename", label: "重命名" },
    {
      value: "share",
      label: "分享",
      children: [
        { value: "link", label: "复制链接" },
        {
          value: "send",
          label: "发送到",
          children: [{ value: "email", label: "电子邮件" }],
        },
      ],
    },
  ];
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <Dropdown {items} onActivate={(info) => (value = info.value)}>操作</Dropdown
  ><output>最近操作：{value}</output>
</div>
