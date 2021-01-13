declare interface ApiUser {
  /**
   * 用户详情
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiUser
   */
  detail<T>(): Promise<TypeBase.JsonResult<T>>;
}
