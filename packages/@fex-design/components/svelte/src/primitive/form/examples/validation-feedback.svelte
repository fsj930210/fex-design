<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import {
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
  } from "@fex-design/svelte/primitive/date-picker";
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
  import {
    SliderRoot,
    SliderTrack,
    SliderRange,
    SliderThumb,
  } from "@fex-design/svelte/primitive/slider";
  import { RadioGroup, Radio } from "@fex-design/svelte/primitive/radio";
  import type { DatePickerSelectionValue } from "@fex-design/svelte/primitive/date-picker";
  import type { TimeValue } from "@fex-design/svelte/primitive/time-picker";
  import {
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormDescription,
    FormError,
    FormSubscribe,
  } from "@fex-design/svelte/primitive/form";
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  import {
    InputNumberRoot,
    InputNumberControl,
    InputNumberActions,
    InputNumberIncrement,
    InputNumberDecrement,
  } from "@fex-design/svelte/primitive/input-number";
  import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
  } from "@fex-design/svelte/primitive/select";
  import {
    CheckboxRoot,
    CheckboxControl,
    CheckboxIndicator,
    CheckboxLabel,
  } from "@fex-design/svelte/primitive/checkbox";
  import { SwitchRoot, SwitchThumb } from "@fex-design/svelte/primitive/switch";
  import { Button } from "@fex-design/svelte/primitive/button";
  const sessionOptions = [
    { value: "online", label: "线上活动" },
    { value: "offline", label: "线下活动" },
  ];
  const dateRule = ({ value }: { value: unknown }) =>
    value ? undefined : "请选择活动日期";
  const timeRule = ({ value }: { value: unknown }) =>
    value ? undefined : "请选择开始时间";
  const progressRule = ({ value }: { value: unknown }) =>
    typeof value === "number" && value >= 30
      ? undefined
      : "准备进度至少达到 30%";
  const venues = [
    { value: "online", label: "线上会议" },
    { value: "office", label: "公司会议室" },
  ];
  const requiredText = ({ value }: { value: unknown }) =>
    String(value ?? "").trim() ? undefined : "请填写或选择此项";
  const emailRule = ({ value }: { value: unknown }) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
      ? undefined
      : "请输入有效邮箱";
  const capacityRule = ({ value }: { value: unknown }) =>
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 50
      ? undefined
      : "人数必须为 1 到 50 的整数";
  const enabledRule = ({ value }: { value: unknown }) =>
    value === true ? undefined : "请开启报名";
  const agreementRule = ({ value }: { value: unknown }) =>
    value === true ? undefined : "请同意活动条款";

  let result = $state("");
  const form = createForm(() => ({
    defaultValues: {
      title: "",
      email: "",
      capacity: 0,
      venue: "",
      published: false,
      agreement: false,
      date: null as DatePickerSelectionValue,
      time: null as TimeValue | null,
      progress: 0,
      session: "",
    },
    onSubmit: ({ value }) => {
      result = "校验通过：" + value.title + "，人数 " + value.capacity;
    },
  }));
</script>

<section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">不同控件的校验反馈</h3>
    <p class="text-sm text-muted-foreground">
      直接提交查看各字段错误，再逐项修正。控件通过显式绑定读写字段值，Form
      负责反馈和字段关联。
    </p>
  </header>
  <FormRoot {form}>
    <FormField
      name="title"
      validators={{
        onblur: requiredText,
        onChange: requiredText,
        onSubmit: requiredText,
      }}
    >
      {#snippet children(field)}
        <FormLabel required>活动名称 · Input</FormLabel>
        <FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl
              onblur={() => field.handleBlur()}
              placeholder="输入活动名称"
            /></InputRoot
          ></FormControl
        >
        <FormDescription
          >输入和提交均校验必填；失焦标记字段已交互。</FormDescription
        >
        <FormError />
      {/snippet}
    </FormField>
    <FormField
      name="email"
      validators={{
        onblur: emailRule,
        onChange: emailRule,
        onSubmit: emailRule,
      }}
    >
      {#snippet children(field)}
        <FormLabel required>联系邮箱 · Input</FormLabel>
        <FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl
              onblur={() => field.handleBlur()}
              placeholder="organizer@example.com"
            /></InputRoot
          ></FormControl
        >
        <FormDescription>格式错误展示在当前字段下方。</FormDescription>
        <FormError />
      {/snippet}
    </FormField>
    <FormField
      name="capacity"
      validators={{
        onblur: capacityRule,
        onChange: capacityRule,
        onSubmit: capacityRule,
      }}
    >
      {#snippet children(field)}
        <FormLabel required>活动人数 · InputNumber</FormLabel>
        <FormControl
          ><InputNumberRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputNumberControl
              onblur={() => field.handleBlur()}
            /><InputNumberActions
              ><InputNumberIncrement /><InputNumberDecrement
              /></InputNumberActions
            ></InputNumberRoot
          ></FormControl
        >
        <FormDescription
          >必须填写 1 到 50 的整数；输入 0 或 51 观察范围错误。</FormDescription
        >
        <FormError />
      {/snippet}
    </FormField>
    <FormField
      name="venue"
      validators={{
        onblur: requiredText,
        onChange: requiredText,
        onSubmit: requiredText,
      }}
    >
      {#snippet children(field)}
        <FormLabel required>活动场地 · Select</FormLabel>
        <FormControl
          ><SelectRoot
            value={field.state.value || []}
            onChange={(value) =>
              field.handleChange(typeof value === "string" ? value : "")}
            options={venues}
            clearable
            ><SelectTrigger
              inputProps={{ "aria-label": "活动场地" }}
            /><SelectContent /></SelectRoot
          ></FormControl
        >
        <FormDescription>选择后清空，观察选择类控件的错误反馈。</FormDescription
        >
        <FormError />
      {/snippet}
    </FormField>
    <FormField
      name="published"
      validators={{
        onblur: enabledRule,
        onChange: enabledRule,
        onSubmit: enabledRule,
      }}
    >
      {#snippet children(field)}
        <FormLabel required>开放报名 · Switch</FormLabel>
        <FormControl
          ><SwitchRoot
            checked={field.state.value}
            onChange={(checked) => field.handleChange(checked)}
            onblur={() => field.handleBlur()}
            aria-label="开放报名"><SwitchThumb /></SwitchRoot
          ></FormControl
        >
        <FormDescription>布尔值规则要求开启报名。</FormDescription>
        <FormError />
      {/snippet}
    </FormField>
    <FormField
      name="agreement"
      validators={{
        onblur: agreementRule,
        onChange: agreementRule,
        onSubmit: agreementRule,
      }}
    >
      {#snippet children(field)}
        <FormLabel required>活动条款 · Checkbox</FormLabel>
        <FormControl
          ><CheckboxRoot
            ><CheckboxControl
              checked={field.state.value}
              onchange={(event) =>
                field.handleChange(event.currentTarget.checked)}
              onblur={() => field.handleBlur()}
              aria-label="同意活动条款"
            /><CheckboxIndicator /><CheckboxLabel>同意活动条款</CheckboxLabel
            ></CheckboxRoot
          ></FormControl
        >
        <FormDescription>勾选同意后清除当前错误。</FormDescription>
        <FormError />
      {/snippet}
    </FormField>
    <FormField
      name="session"
      validators={{
        onblur: requiredText,
        onChange: requiredText,
        onSubmit: requiredText,
      }}
    >
      {#snippet children(field)}<FormLabel required>活动形式 · Radio</FormLabel
        ><FormControl
          ><RadioGroup
            value={field.state.value}
            onChange={(value) => field.handleChange(String(value))}
            orientation="horizontal"
            >{#each sessionOptions as option (option.value)}<label
                class="inline-flex items-center gap-2"
                ><Radio value={option.value} />{option.label}</label
              >{/each}</RadioGroup
          ></FormControl
        ><FormDescription
          >请选择一种活动形式，观察单选组的统一错误反馈。</FormDescription
        ><FormError />{/snippet}
    </FormField>
    <FormField
      name="date"
      validators={{ onblur: dateRule, onChange: dateRule, onSubmit: dateRule }}
    >
      {#snippet children(field)}<FormLabel required
          >活动日期 · DatePicker</FormLabel
        ><FormControl
          ><DatePickerRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            clearable
            ><DatePickerTrigger
              placeholder="请选择活动日期"
              inputProps={{ onblur: () => field.handleBlur() }}
            /><DatePickerContent
              ><DatePickerPanel /><DatePickerFooter /></DatePickerContent
            ></DatePickerRoot
          ></FormControl
        ><FormDescription
          >空值校验必填；选择日期后清除当前错误。</FormDescription
        ><FormError />{/snippet}
    </FormField>
    <FormField
      name="time"
      validators={{ onblur: timeRule, onChange: timeRule, onSubmit: timeRule }}
    >
      {#snippet children(field)}<FormLabel required
          >开始时间 · TimePicker</FormLabel
        ><FormControl
          ><TimePickerRoot
            value={field.state.value}
            onchange={(value) => field.handleChange(value)}
            ><TimePickerTrigger
              allowClear
              placeholder="请选择开始时间"
              inputProps={{ onblur: () => field.handleBlur() }}
            /><TimePickerPortal
              ><TimePickerContent
                ><TimePickerPanel
                  ><TimePickerHourColumn /><TimePickerMinuteColumn
                  /><TimePickerSecondColumn /></TimePickerPanel
                ></TimePickerContent
              ></TimePickerPortal
            ></TimePickerRoot
          ></FormControl
        ><FormDescription>选择时间后写入字段；清空后再次校验。</FormDescription
        ><FormError />{/snippet}
    </FormField>
    <FormField
      name="progress"
      validators={{
        onblur: progressRule,
        onChange: progressRule,
        onSubmit: progressRule,
      }}
    >
      {#snippet children(field)}<FormLabel required>准备进度 · Slider</FormLabel
        ><FormControl
          ><SliderRoot
            value={[field.state.value]}
            min={0}
            max={100}
            step={10}
            onChange={(value) => field.handleChange(value[0] ?? 0)}
            ><SliderTrack><SliderRange /></SliderTrack><SliderThumb
              onblur={() => field.handleBlur()}
              aria-label="准备进度"
            /></SliderRoot
          ></FormControl
        ><FormDescription
          >初始为 0%，至少达到 30%；支持拖动和方向键。</FormDescription
        ><FormError />{/snippet}
    </FormField>
    <div class="flex flex-wrap gap-3 border-t border-border pt-4">
      <Button type="submit" variant="solid" color="primary">校验全部字段</Button
      >
      <Button
        type="button"
        onclick={() => {
          form.setFieldMeta("email", (meta) => ({
            ...meta,
            isTouched: true,
            errorMap: { ...meta.errorMap, onChange: "该邮箱已被占用，请更换" },
          }));
          result = "已向邮箱字段写入业务错误，修改邮箱后重新校验";
        }}>设置邮箱错误</Button
      >
      <Button type="reset" onclick={() => (result = "")}>清空重试</Button>
    </div>
    <FormSubscribe selector={(state) => state.values}
      >{#snippet children(values)}<pre
          class="overflow-auto rounded-md bg-muted-background p-3 text-xs">{JSON.stringify(
            values,
            null,
            2,
          )}</pre>{/snippet}</FormSubscribe
    >
  </FormRoot>
  {#if result}<p role="status" class="text-sm text-muted-foreground">
      {result}
    </p>{/if}
</section>
