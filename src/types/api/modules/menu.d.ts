declare interface ApiMenu {
  /**
   * 菜单列表
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   * @memberOf ApiMenu
   */
  list<T>(): Promise<TypeBase.JsonResult<T>>;
}
