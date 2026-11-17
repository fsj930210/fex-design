<script lang="ts">
  import { Dialog } from "@fex-design/svelte/ui/dialog";
  import { createForm } from "@tanstack/svelte-form";
  import { Input } from "@fex-design/svelte/ui/input";
  import { Select } from "@fex-design/svelte/ui/select";
  import { Checkbox } from "@fex-design/svelte/ui/checkbox";
  import { Button } from "@fex-design/svelte/ui/button";
  import { Form, FormField } from "@fex-design/svelte/ui/form";
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
  let open = $state(false);
  let result = $state("");
  const form = createForm(() => ({
    defaultValues: {
      name: "",
      email: "",
      department: "product",
      notifications: true,
    },
    onSubmit: async ({ value }) => {
      result = `已保存 ${value.name} 的资料，通知将发送至 ${value.email}。`;
      open = false;
    },
  }));
</script>

<Button
  onclick={() => {
    open = true;
  }}>打开表单弹窗</Button
>
<p role="status">{result || "尚未提交"}</p>
<Dialog bind:open title="编辑团队成员"
  ><Form {form}>
    <FormField
      name="name"
      label="姓名"
      required
      validators={{
        onChange: requiredText,
        onBlur: requiredText,
        onSubmit: requiredText,
      }}
      >{#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          placeholder="请输入联系人姓名"
        />{/snippet}</FormField
    >
    <FormField
      name="email"
      label="工作邮箱"
      required
      validators={{
        onChange: emailRule,
        onBlur: emailRule,
        onSubmit: emailRule,
      }}
      >{#snippet children(field)}<Input
          value={field.state.value}
          oninput={(event) => field.handleChange(event.currentTarget.value)}
          placeholder="name@company.com"
        />{/snippet}</FormField
    >
    <FormField
      name="department"
      label="所属部门"
      required
      validators={{
        onChange: requiredText,
        onBlur: requiredText,
        onSubmit: requiredText,
      }}
      description="用于分配项目通知和审批权限。"
      >{#snippet children(field)}<Select
          value={field.state.value}
          onChange={(value) => field.handleChange(value)}
          options={departments}
          clearable
        />{/snippet}</FormField
    >
    <FormField
      name="notifications"
      validators={{
        onChange: agreementRule,
        onBlur: agreementRule,
        onSubmit: agreementRule,
      }}
      >{#snippet children(field)}<Checkbox
          checked={field.state.value}
          onchange={(event) => field.handleChange(event.currentTarget.checked)}
          onblur={() => field.handleBlur()}>接收项目进度邮件</Checkbox
        >{/snippet}</FormField
    >
  </Form>{#snippet footer()}<Button
      onclick={() => {
        open = false;
      }}>取消</Button
    ><Button
      variant="solid"
      color="primary"
      onclick={() => {
        form.handleSubmit();
      }}>保存资料</Button
    >{/snippet}</Dialog
>
