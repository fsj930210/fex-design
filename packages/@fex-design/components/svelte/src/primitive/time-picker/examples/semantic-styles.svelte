<script lang="ts">
  import {
    TimePickerRoot,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
  } from "@fex-design/svelte/primitive/time-picker";
  const classNames = {
    root: "rounded-xl border-purple-500",
    input: "font-semibold text-purple-950",
    popup: "rounded-xl border-purple-300",
    panel: "bg-purple-50",
    column: "border-purple-200",
    item: "rounded-md",
    selectedItem: "!bg-purple-200 !text-purple-950",
  };
  const styles = {
    root: "border-color:#7c3aed;border-radius:12px",
    input: "color:#5b21b6;font-weight:600",
    popup: "border-color:#c4b5fd;border-radius:12px",
    panel: "background-color:#f5f3ff",
    column: "border-color:#ddd6fe",
    item: "border-radius:6px",
    selectedItem: "background-color:#ddd6fe;color:#4c1d95",
  };
</script>

<div class="grid w-full gap-4">
  <section class="grid gap-2">
    <p>classNames</p>
    <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}
      ><TimePickerTrigger
        class={classNames.root}
        inputProps={{ class: classNames.input }}
      /><TimePickerPortal
        ><TimePickerContent class={classNames.popup}
          ><TimePickerPanel class={classNames.panel}
            ><TimePickerHourColumn
              class={classNames.column}
              itemClassName={classNames.item}
              selectedItemClassName={classNames.selectedItem}
            /><TimePickerMinuteColumn
              class={classNames.column}
              itemClassName={classNames.item}
              selectedItemClassName={classNames.selectedItem}
            /><TimePickerSecondColumn
              class={classNames.column}
              itemClassName={classNames.item}
              selectedItemClassName={classNames.selectedItem}
            /></TimePickerPanel
          ></TimePickerContent
        ></TimePickerPortal
      ></TimePickerRoot
    >
  </section>
  <section class="grid gap-2">
    <p>styles</p>
    <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}
      ><TimePickerTrigger
        style={styles.root}
        inputProps={{ style: styles.input }}
      /><TimePickerPortal
        ><TimePickerContent style={styles.popup}
          ><TimePickerPanel style={styles.panel}
            ><TimePickerHourColumn
              style={styles.column}
              itemStyle={styles.item}
              selectedItemStyle={styles.selectedItem}
            /><TimePickerMinuteColumn
              style={styles.column}
              itemStyle={styles.item}
              selectedItemStyle={styles.selectedItem}
            /><TimePickerSecondColumn
              style={styles.column}
              itemStyle={styles.item}
              selectedItemStyle={styles.selectedItem}
            /></TimePickerPanel
          ></TimePickerContent
        ></TimePickerPortal
      ></TimePickerRoot
    >
  </section>
</div>
