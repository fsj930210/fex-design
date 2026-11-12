<script lang="ts">
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
  } from "@fex-design/svelte/primitive/select";
  import {
    CheckboxRoot,
    CheckboxControl,
    CheckboxIndicator,
  } from "@fex-design/svelte/primitive/checkbox";
  import {
    FormRoot,
    FormField,
    FormControl,
    FormLabel,
    FormDescription,
    FormError,
    FormSubscribe,
  } from "@fex-design/svelte/primitive/form";
  import { Button } from "@fex-design/svelte/primitive/button";
  import { createForm } from "@tanstack/svelte-form";

  const departments = [
    { value: "product", label: "产品与设计" },
    { value: "engineering", label: "研发团队" },
    { value: "operations", label: "客户运营" },
  ];
  const requiredText = ({ value }: { value: unknown }) =>
    String(value ?? "").trim() ? undefined : "请填写此项";
  const emailRule = ({ value }: { value: unknown }) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
      ? undefined
      : "请输入有效邮箱";
  const agreementRule = ({ value }: { value: unknown }) =>
    value === true ? undefined : "请确认接收项目进度邮件";
  let result = $state<string>("");
  const form = createForm(() => ({
    defaultValues: {
      name: "",
      email: "",
      department: "product",
      notifications: true,
    },

    onSubmit: async ({ value }) => {
      result = `已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`;
    },
  }));
</script>

<section class="mx-auto grid w-full max-w-2xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">团队成员资料</h3>
    <p class="text-sm text-muted-foreground">
      填写团队成员资料，使用输入框、部门选择和通知偏好完成保存。
    </p>
  </header>
  <FormRoot {form}>
    <FormField
      name="name"
      validators={{
        onChange: requiredText,
        onBlur: requiredText,
        onSubmit: requiredText,
      }}
    >
      {#snippet children(field)}<div
          class="grid gap-[var(--form-item-gap,var(--space-sm,0.375rem))] min-w-0"
        >
          <FormLabel required>姓名</FormLabel>
          <FormControl>
            <InputRoot
              >{#snippet children(inputContext)}<InputControl
                  {inputContext}
                  value={field.state.value}
                  oninput={(event) =>
                    field.handleChange(event.currentTarget.value)}
                  placeholder={"请输入联系人姓名"}
                />{/snippet}</InputRoot
            >
          </FormControl>
          <FormError />
        </div>{/snippet}
    </FormField>
    <FormField
      name="email"
      validators={{
        onChange: emailRule,
        onBlur: emailRule,
        onSubmit: emailRule,
      }}
    >
      {#snippet children(field)}<div
          class="grid gap-[var(--form-item-gap,var(--space-sm,0.375rem))] min-w-0"
        >
          <FormLabel required>工作邮箱</FormLabel>
          <FormControl>
            <InputRoot
              >{#snippet children(inputContext)}<InputControl
                  {inputContext}
                  value={field.state.value}
                  oninput={(event) =>
                    field.handleChange(event.currentTarget.value)}
                  placeholder={"name@company.com"}
                />{/snippet}</InputRoot
            >
          </FormControl>
          <FormError />
        </div>{/snippet}
    </FormField>
    <FormField
      name="department"
      validators={{
        onChange: requiredText,
        onBlur: requiredText,
        onSubmit: requiredText,
      }}
    >
      {#snippet children(field)}<div
          class="grid gap-[var(--form-item-gap,var(--space-sm,0.375rem))] min-w-0"
        >
          <FormLabel required>所属部门</FormLabel>
          <FormControl>
            <SelectRoot
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              options={departments}
              clearable><SelectTrigger /><SelectContent /></SelectRoot
            >
          </FormControl>
          <FormDescription>用于分配项目通知和审批权限。</FormDescription>
          <FormError />
        </div>{/snippet}
    </FormField>
    <FormField
      name="notifications"
      validators={{
        onChange: agreementRule,
        onBlur: agreementRule,
        onSubmit: agreementRule,
      }}
    >
      {#snippet children(field)}<CheckboxRoot>
          <FormControl>
            <CheckboxControl
              checked={field.state.value}
              onchange={(event) =>
                field.handleChange(event.currentTarget.checked)}
            />
          </FormControl>
          <CheckboxIndicator />
          <FormLabel>接收项目进度邮件</FormLabel>
        </CheckboxRoot><FormError />{/snippet}
    </FormField>
    <FormSubscribe selector={(state) => state.isSubmitting}
      >{#snippet children(busy)}<div
          class="flex flex-wrap gap-3 border-t border-border pt-4"
        >
          <Button type="submit" variant="solid" color="primary" loading={busy}
            >保存资料</Button
          >
          <Button type="reset" disabled={busy}>重置</Button>
        </div>{/snippet}</FormSubscribe
    >
  </FormRoot>{#if result}<p
      role="status"
      class="rounded-md bg-muted-background p-3 text-sm"
    >
      {result}
    </p>{/if}
</section>
