<script lang="ts">
  import { createForm, type AnyFieldApi } from "@tanstack/svelte-form";
  import {
    FormRoot,
    FormField,
    FormLabel,
    FormControl,
    FormError,
    FormSubscribe,
  } from "@fex-design/svelte/primitive/form";
  import { InputRoot, InputControl } from "@fex-design/svelte/primitive/input";
  import { RadioGroup, Radio } from "@fex-design/svelte/primitive/radio";
  import {
    SelectRoot,
    SelectTrigger,
    SelectContent,
  } from "@fex-design/svelte/primitive/select";
  import { Button } from "@fex-design/svelte/primitive/button";

  const accountKinds = [
    { value: "personal", label: "个人账号" },
    { value: "business", label: "企业账号" },
  ];
  const regions = [
    { value: "east", label: "华东" },
    { value: "south", label: "华南" },
  ];
  const cities = {
    east: [
      { value: "shanghai", label: "上海" },
      { value: "hangzhou", label: "杭州" },
    ],
    south: [
      { value: "guangzhou", label: "广州" },
      { value: "shenzhen", label: "深圳" },
    ],
  };
  const requiredText = ({ value }: { value: unknown }) =>
    String(value ?? "").trim() ? undefined : "请填写此项";
  const confirmationRule = ({
    value,
    fieldApi,
  }: {
    value: unknown;
    fieldApi: AnyFieldApi;
  }) =>
    value === fieldApi.form.getFieldValue("password") &&
    String(value).length >= 8
      ? undefined
      : "两次密码需一致且至少 8 个字符";
  const companyRule = ({
    value,
    fieldApi,
  }: {
    value: unknown;
    fieldApi: AnyFieldApi;
  }) =>
    fieldApi.form.getFieldValue("kind") !== "business" ||
    String(value ?? "").trim()
      ? undefined
      : "企业账号请填写公司名称";
  const passwordRule = ({ value }: { value: unknown }) =>
    String(value).length >= 8 ? undefined : "密码至少需要 8 个字符";
  const confirmationValidators = {
    onChangeListenTo: ["password"] as ["password"],
    onChange: confirmationRule,
  };
  const companyValidators = {
    onChangeListenTo: ["kind"] as ["kind"],
    onChange: companyRule,
  };
  let result = $state("");
  const form = createForm(() => ({
    defaultValues: {
      kind: "personal",
      company: "",
      region: "east",
      city: "",
      password: "",
      confirmation: "",
    },
    onSubmit: ({ value }) => {
      result =
        "已保存" +
        (value.kind === "business" ? "企业" : "个人") +
        "账号，城市：" +
        value.city;
    },
  }));
  function changeKind(value: string) {
    form.setFieldValue("kind", value);
    if (value === "personal") form.setFieldValue("company", "");
  }
  function changeRegion(value: unknown) {
    form.setFieldValue("region", typeof value === "string" ? value : "east");
    form.setFieldValue("city", "");
  }
</script>

<section class="mx-auto grid w-full max-w-xl gap-5 p-5">
  <header class="grid gap-1">
    <h3 class="text-base font-semibold">账号类型、地区与密码依赖</h3>
    <p class="text-sm text-muted-foreground">
      企业账号显示公司名称并要求填写；切换地区清空城市。确认密码通过 TanStack
      onChangeListenTo 依赖密码，修改密码会重新校验确认字段。
    </p>
  </header>
  <FormRoot {form}>
    <FormField name="kind"
      >{#snippet children(field)}<FormLabel>账号类型</FormLabel><FormControl
          ><RadioGroup
            value={field.state.value}
            onChange={(value) => changeKind(String(value))}
            orientation="horizontal"
            >{#each accountKinds as option (option.value)}<label
                class="inline-flex items-center gap-2"
                ><Radio value={option.value} />{option.label}</label
              >{/each}</RadioGroup
          ></FormControl
        ><FormError />{/snippet}</FormField
    >
    <FormSubscribe selector={(state) => state.values.kind}
      >{#snippet children(kind)}{#if kind === "business"}<FormField
            name="company"
            validators={companyValidators}
            >{#snippet children(field)}<FormLabel required>公司名称</FormLabel
              ><FormControl
                ><InputRoot
                  value={field.state.value}
                  onChange={(value) => field.handleChange(value)}
                  ><InputControl
                    type="text"
                    onblur={() => field.handleBlur()}
                  /></InputRoot
                ></FormControl
              ><FormError />{/snippet}</FormField
          >{/if}{/snippet}</FormSubscribe
    >
    <FormField name="region"
      >{#snippet children(field)}<FormLabel required>地区</FormLabel
        ><FormControl
          ><SelectRoot
            value={field.state.value || []}
            options={regions}
            onChange={(value) => changeRegion(value)}
            ><SelectTrigger placeholder="请选择" /><SelectContent /></SelectRoot
          ></FormControl
        ><FormError />{/snippet}</FormField
    >
    <FormSubscribe selector={(state) => state.values.region}
      >{#snippet children(region)}<FormField
          name="city"
          validators={{ onChange: requiredText }}
          >{#snippet children(field)}<FormLabel required>城市</FormLabel
            ><FormControl
              ><SelectRoot
                value={field.state.value || []}
                options={cities[region as keyof typeof cities]}
                onChange={(value) =>
                  field.handleChange(typeof value === "string" ? value : "")}
                ><SelectTrigger placeholder="请选择" /><SelectContent
                /></SelectRoot
              ></FormControl
            ><FormError />{/snippet}</FormField
        >{/snippet}</FormSubscribe
    >
    <FormField name="password" validators={{ onChange: passwordRule }}
      >{#snippet children(field)}<FormLabel required>密码</FormLabel
        ><FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl
              type="password"
              onblur={() => field.handleBlur()}
            /></InputRoot
          ></FormControl
        ><FormError />{/snippet}</FormField
    >
    <FormField name="confirmation" validators={confirmationValidators}
      >{#snippet children(field)}<FormLabel required>确认密码</FormLabel
        ><FormControl
          ><InputRoot
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            ><InputControl
              type="password"
              onblur={() => field.handleBlur()}
            /></InputRoot
          ></FormControl
        ><FormError />{/snippet}</FormField
    >
    <Button type="submit" variant="solid" color="primary">保存账号</Button>
    <FormSubscribe selector={(state) => state.values}
      >{#snippet children(values)}<pre
          class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{JSON.stringify(
            values,
            null,
            2,
          )}</pre>{/snippet}</FormSubscribe
    >
  </FormRoot>
  <p role="status" class="text-sm text-muted-foreground">{result}</p>
</section>
