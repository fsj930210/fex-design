<script lang="ts">
  import { Dropdown } from "@fex-design/svelte/ui/dropdown";
  import { Button } from "@fex-design/svelte/ui/button";
  let open = $state(false);
  let uncontrolledOpen = $state(false);
  const items = [
    { value: "rename", label: "重命名" },
    { value: "duplicate", label: "复制" },
  ];
</script>

<div class="flex min-h-48 flex-col items-start gap-4 p-6">
  <Button onclick={() => (open = !open)}>外部切换</Button><Dropdown
    {items}
    {open}
    onOpenChange={(value) => (open = value)}>受控菜单</Dropdown
  ><output>菜单状态：{open ? "打开" : "关闭"}</output><Dropdown
    {items}
    onOpenChange={(value) => (uncontrolledOpen = value)}>非受控菜单</Dropdown
  ><output>非受控菜单状态：{uncontrolledOpen ? "打开" : "关闭"}</output>
</div>
