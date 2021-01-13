declare interface ApiAdmin {
  /**
   * 登入
   *
   * @template T
   * @param {TypeLogin.FormData} data
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  login<T>(data: TypeLogin.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 标签列表
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  labelList<T>(data: TypeBase.PaginationParam): Promise<TypeBase.JsonResult<T>>;
  /**
   * 新增标签
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  addLabel<T>(data: TypeLabel.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 编辑标签
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  editLabel<T>(data: TypeLabel.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 删除标签
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  deleteLabel<T>(data: {id: number}): Promise<TypeBase.JsonResult<T>>;
  /**
   * 所有标签
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  allLabel<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 友链列表
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  friendlinkList<T>(data: TypeBase.PaginationParam): Promise<TypeBase.JsonResult<T>>;
  /**
   * 新增友链
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  addFriendlink<T>(data: TypeFriendlink.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 编辑友链
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  editFriendlink<T>(data: TypeFriendlink.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 删除友链
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  deleteFriendlink<T>(data: {id: number}): Promise<TypeBase.JsonResult<T>>;
  /**
   * 分类树
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  categoryTree<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 新增分类
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  addCategory<T>(data: TypeCategory.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 编辑分类
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  editCategory<T>(data: TypeCategory.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 删除分类
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  deleteCategory<T>(data: {id: number}): Promise<TypeBase.JsonResult<T>>;
  /**
   * 上传分类文件
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  uploadCategoryImage<T>(data: FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 七牛云资源列表
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  qiniuList<T>(data: TypeBase.PaginationParam): Promise<TypeBase.JsonResult<T>>;
  /**
   * 上传文件
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  uploadFile<T>(data: FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 删除文件
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  deleteFile<T>(data: {id: number}): Promise<TypeBase.JsonResult<T>>;
  /**
   * 文章列表
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  articleList<T>(data: TypeBase.PaginationParam): Promise<TypeBase.JsonResult<T>>;
  /**
   * 新增文章
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  addArticle<T>(data: TypeArticle.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 编辑文章
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  editArticle<T>(data: TypeArticle.FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 删除文章
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  deleteArticle<T>(data: {id: number}): Promise<TypeBase.JsonResult<T>>;
  /**
   * 文章详情
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  getArticleDetail<T>(data: {id: number}): Promise<TypeBase.JsonResult<T>>;
  /**
   * 上传文章文件
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  uploadArticleImage<T>(data: FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 系统配置
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  systemConfig<T>(): Promise<TypeBase.JsonResult<T>>;
  /**
   * 保存系统配置
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  saveSystemConfig<T>(data: TypeSystem.ConfigFormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 评论列表
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  commentList<T>(data: TypeBase.PaginationParam): Promise<TypeBase.JsonResult<T>>;
  /**
   * 删除评论
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  deleteComment<T>(data: {id: number}): Promise<TypeBase.JsonResult<T>>;
  /**
   * 上传关于图片
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  uploadAboutImage<T>(data: FormData): Promise<TypeBase.JsonResult<T>>;
  /**
   * 首页统计
   *
   * @template T
   * @returns {Promise<TypeBase.JsonResult<T>>}
   *
   * @memberOf ApiAdmin
   */
  homeStatistics<T>(): Promise<TypeBase.JsonResult<T>>;
}
