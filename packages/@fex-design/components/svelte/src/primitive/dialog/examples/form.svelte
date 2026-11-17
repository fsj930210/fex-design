<script lang="ts">
  import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogActions,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogClose,
  } from "@fex-design/svelte/primitive/dialog";
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
  let open = $state(false);
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
<DialogRoot {open} onOpenChange={(value) => (open = value)}
  ><DialogPortal
    ><DialogOverlay /><DialogContent
      ><DialogHeader><DialogTitle>编辑团队成员</DialogTitle></DialogHeader
      ><DialogActions><DialogClose /></DialogActions><DialogBody
        ><FormRoot {form}>
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
        </FormRoot></DialogBody
      ><DialogFooter
        ><Button
          onclick={() => {
            open = false;
          }}>取消</Button
        ><Button
          variant="solid"
          color="primary"
          onclick={() => {
            form.handleSubmit();
          }}>保存资料</Button
        ></DialogFooter
      ></DialogContent
    ></DialogPortal
  ></DialogRoot
>
