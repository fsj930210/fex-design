# Select

Select Primitive exposes `SelectRoot`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, and `SelectSeparator`.

`SelectRoot` receives dynamic `items`; items never register during mount. Search state stays internal. Set `showSearch` to make the shared Input trigger editable, pass `filterOption` for local filtering, or update `items` from `onSearch` for remote data. `virtual` performs real windowed rendering inside Content.

Select supports single and multiple selection only. Free-form tag creation belongs to TagsInput.
