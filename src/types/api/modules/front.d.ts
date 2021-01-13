declare interface ApiFront {
  /**
   * 标签云
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  labelCloud<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 热门文章
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  hotArticle<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 最新文章
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  newArticle<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 文章列表
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  articleList<T>(data: TypeFrontArticle.ArticleListParams): Promise<TypeBase.JsonResult<T>>;
  /**
   * 友情链接
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  friendlinkList<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 关于
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  about<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 关于
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  addComment<T>(data: TypeFrontComment.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 评论列表
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  commentList<T>(data: TypeFrontComment.CommentListParams): Promise<TypeBase.JsonResult<T>>;
  /**
   * 分类树
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  categoryTree<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 文章详情
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  articleDetail<T>(data: {id: number}): Promise<TypeBase.JsonResult<T>>;
  /**
   * 系统配置
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  systemConfig<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 上报访客数据
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiFront
   */
  track<T>(data: TypeCommon.TrackFormData): Promise<TypeBase.JsonResult<T>>;
}
