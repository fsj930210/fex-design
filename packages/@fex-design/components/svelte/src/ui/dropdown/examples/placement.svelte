<script lang="ts">
  import { Dropdown } from "@fex-design/svelte/ui/dropdown";
  let value = $state("尚未选择");
  const items = [
    { value: "rename", label: "重命名" },
    { value: "duplicate", label: "复制" },
  ];
  const placements = [
    "topLeft",
    "top",
    "topRight",
    "leftTop",
    "rightTop",
    "left",
    "right",
    "leftBottom",
    "rightBottom",
    "bottomLeft",
    "bottom",
    "bottomRight",
  ];
  const positions = [
    "col-start-2 row-start-1",
    "col-start-3 row-start-1",
    "col-start-4 row-start-1",
    "col-start-1 row-start-2",
    "col-start-5 row-start-2",
    "col-start-1 row-start-3",
    "col-start-5 row-start-3",
    "col-start-1 row-start-4",
    "col-start-5 row-start-4",
    "col-start-2 row-start-5",
    "col-start-3 row-start-5",
    "col-start-4 row-start-5",
  ];
</script>

<div class="grid w-full gap-4 p-6">
  <p>四个方向、三种对齐；关闭自动避让以展示所选位置。</p>
  <div
    class="grid grid-cols-[repeat(5,max-content)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 py-28"
  >
    {#each placements as placement, index}<div class={positions[index]}>
        <Dropdown {items} popoverProps={{ placement, avoidCollisions: false }}
          >{placement}</Dropdown
        >
      </div>{/each}
  </div>
</div>
