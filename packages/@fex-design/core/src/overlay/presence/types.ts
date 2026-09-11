/** Shared mounting lifecycle for floating content. */
export interface FloatingMountOptions {
  /**
   * 首次打开时才挂载内容。Only mount content when first opened.
   * @default true
   */
  lazyMount?: boolean | undefined
  /**
   * 关闭过渡结束后卸载内容。Unmount after the closing transition.
   * 外部受控数据不受影响，内容组件的局部状态会重置。
   * @default false
   */
  destroyOnHidden?: boolean | undefined
}
