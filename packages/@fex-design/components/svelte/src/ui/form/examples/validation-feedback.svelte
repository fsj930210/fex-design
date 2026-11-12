<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import { DatePicker } from "@fex-design/svelte/ui/date-picker";
  import { TimePicker } from "@fex-design/svelte/ui/time-picker";
  import { Slider } from "@fex-design/svelte/ui/slider";
  import { RadioGroup } from "@fex-design/svelte/ui/radio";
  import type { DatePickerSelectionValue } from "@fex-design/svelte/primitive/date-picker";
  import type { TimeValue } from "@fex-design/svelte/primitive/time-picker";
  import { Form, FormField, FormSubscribe } from "@fex-design/svelte/ui/form";
  import { Input } from "@fex-design/svelte/ui/input";
  import { InputNumber } from "@fex-design/svelte/ui/input-number";
  import { Select } from "@fex-design/svelte/ui/select";
  import { Checkbox } from "@fex-design/svelte/ui/checkbox";
  import { Switch } from "@fex-design/svelte/ui/switch";
  import { Button } from "@fex-design/svelte/ui/button";
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
  <Form {form}>
    <FormField
      name="title"
      label="活动名称 · Input"
      description="输入和提交均校验必填；失焦标记字段已交互。"
      required
      validators={{
        onblur: requiredText,
        onChange: requiredText,
        onSubmit: requiredText,
      }}
    >
      {#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          onblur={() => field.handleBlur()}
          placeholder="输入活动名称"
        />{/snippet}
    </FormField>
    <FormField
      name="email"
      label="联系邮箱 · Input"
      description="格式错误展示在当前字段下方。"
      required
      validators={{
        onblur: emailRule,
        onChange: emailRule,
        onSubmit: emailRule,
      }}
    >
      {#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          onblur={() => field.handleBlur()}
          placeholder="organizer@example.com"
        />{/snippet}
    </FormField>
    <FormField
      name="capacity"
      label="活动人数 · InputNumber"
      description="必须填写 1 到 50 的整数；输入 0 或 51 观察范围错误。"
      required
      validators={{
        onblur: capacityRule,
        onChange: capacityRule,
        onSubmit: capacityRule,
      }}
    >
      {#snippet children(field)}<InputNumber
          value={field.state.value}
          onChange={(value) => field.handleChange(value)}
          onblur={() => field.handleBlur()}
        />{/snippet}
    </FormField>
    <FormField
      name="venue"
      label="活动场地 · Select"
      description="选择后清空，观察选择类控件的错误反馈。"
      required
      validators={{
        onblur: requiredText,
        onChange: requiredText,
        onSubmit: requiredText,
      }}
    >
      {#snippet children(field)}<Select
          value={field.state.value || []}
          onChange={(value) =>
            field.handleChange(typeof value === "string" ? value : "")}
          options={venues}
          clearable
        />{/snippet}
    </FormField>
    <FormField
      name="published"
      label="开放报名 · Switch"
      description="布尔值规则要求开启报名。"
      required
      validators={{
        onblur: enabledRule,
        onChange: enabledRule,
        onSubmit: enabledRule,
      }}
    >
      {#snippet children(field)}<Switch
          checked={field.state.value}
          onChange={(checked) => field.handleChange(checked)}
          onblur={() => field.handleBlur()}
          aria-label="开放报名"
        />{/snippet}
    </FormField>
    <FormField
      name="agreement"
      label="活动条款 · Checkbox"
      description="勾选同意后清除当前错误。"
      required
      validators={{
        onblur: agreementRule,
        onChange: agreementRule,
        onSubmit: agreementRule,
      }}
    >
      {#snippet children(field)}<Checkbox
          checked={field.state.value}
          onchange={(event) => field.handleChange(event.currentTarget.checked)}
          onblur={() => field.handleBlur()}>同意活动条款</Checkbox
        >{/snippet}
    </FormField>
    <FormField
      name="session"
      label="活动形式 · Radio"
      description="请选择一种活动形式，观察单选组的统一错误反馈。"
      required
      validators={{
        onblur: requiredText,
        onChange: requiredText,
        onSubmit: requiredText,
      }}
    >
      {#snippet children(field)}<RadioGroup
          value={field.state.value}
          onChange={(value) => field.handleChange(String(value))}
          options={sessionOptions}
          orientation="horizontal"
        />{/snippet}
    </FormField>
    <FormField
      name="date"
      label="活动日期 · DatePicker"
      description="空值校验必填；选择日期后清除当前错误。"
      required
      validators={{ onblur: dateRule, onChange: dateRule, onSubmit: dateRule }}
    >
      {#snippet children(field)}<DatePicker
          value={field.state.value}
          onChange={(value) => field.handleChange(value)}
          clearable
          placeholder="请选择活动日期"
          inputProps={{ onblur: () => field.handleBlur() }}
        />{/snippet}
    </FormField>
    <FormField
      name="time"
      label="开始时间 · TimePicker"
      description="选择时间后写入字段；清空后再次校验。"
      required
      validators={{ onblur: timeRule, onChange: timeRule, onSubmit: timeRule }}
    >
      {#snippet children(field)}<TimePicker
          value={field.state.value}
          onchange={(value) => field.handleChange(value)}
          allowClear
          placeholder="请选择开始时间"
          inputProps={{ onblur: () => field.handleBlur() }}
        />{/snippet}
    </FormField>
    <FormField
      name="progress"
      label="准备进度 · Slider"
      description="初始为 0%，至少达到 30%；支持拖动和方向键。"
      required
      validators={{
        onblur: progressRule,
        onChange: progressRule,
        onSubmit: progressRule,
      }}
    >
      {#snippet children(field)}<Slider
          value={field.state.value}
          min={0}
          max={100}
          step={10}
          onChange={(value) =>
            field.handleChange(
              typeof value === "number" ? value : (value[0] ?? 0),
            )}
          onblur={() => field.handleBlur()}
          aria-label="准备进度"
        />{/snippet}
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
  </Form>
  {#if result}<p role="status" class="text-sm text-muted-foreground">
      {result}
    </p>{/if}
</section>
