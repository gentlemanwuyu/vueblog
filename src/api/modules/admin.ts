import request from '@/utils/request';

const admin = {
  // 登入
  async login<T>(data: TypeLogin.FormData) {
    return await request.post({
      url: '/admin/login',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 标签列表
  async labelList<T>(data: TypeBase.PaginationParam) {
    return await request.post({
      url: '/admin/label/list',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 新增标签
  async addLabel<T>(data: TypeLabel.FormData) {
    return await request.post({
      url: '/admin/label/add',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 编辑标签
  async editLabel<T>(data: TypeLabel.FormData) {
    return await request.post({
      url: '/admin/label/edit',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 删除标签
  async deleteLabel<T>(data: {id: number}) {
    return await request.post({
      url: '/admin/label/delete',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 所有标签
  async allLabel<T>() {
    return await request.post({
      url: '/admin/label/all',
    }) as TypeBase.JsonResult<T>;
  },
  // 友链列表
  async friendlinkList<T>(data: TypeBase.PaginationParam) {
    return await request.post({
      url: '/admin/friendlink/list',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 新增友链
  async addFriendlink<T>(data: TypeFriendlink.FormData) {
    return await request.post({
      url: '/admin/friendlink/add',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 编辑友链
  async editFriendlink<T>(data: TypeFriendlink.FormData) {
    return await request.post({
      url: '/admin/friendlink/edit',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 删除友链
  async deleteFriendlink<T>(data: {id: number}) {
    return await request.post({
      url: '/admin/friendlink/delete',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 分类树
  async categoryTree<T>() {
    return await request.post({
      url: '/admin/category/tree',
    }) as TypeBase.JsonResult<T>;
  },
  // 新增分类
  async addCategory<T>(data: TypeCategory.FormData) {
    return await request.post({
      url: '/admin/category/add',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 编辑分类
  async editCategory<T>(data: TypeCategory.FormData) {
    return await request.post({
      url: '/admin/category/edit',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 删除分类
  async deleteCategory<T>(data: {id: number}) {
    return await request.post({
      url: '/admin/category/delete',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 上传分类图片
  async uploadCategoryImage<T>(data: FormData) {
    return await request.post({
      url: '/admin/category/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 七牛云资源列表
  async qiniuList<T>(data: TypeBase.PaginationParam) {
    return await request.post({
      url: '/admin/qiniu/list',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 上传文件
  async uploadFile<T>(data: FormData) {
    return await request.post({
      url: '/admin/qiniu/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 删除文件
  async deleteFile<T>(data: {id: number}) {
    return await request.post({
      url: '/admin/qiniu/delete',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 文章列表
  async articleList<T>(data: TypeBase.PaginationParam) {
    return await request.post({
      url: '/admin/article/list',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 新增文章
  async addArticle<T>(data: TypeLabel.FormData) {
    return await request.post({
      url: '/admin/article/add',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 编辑文章
  async editArticle<T>(data: TypeArticle.FormData) {
    return await request.post({
      url: '/admin/article/edit',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 删除文章
  async deleteArticle<T>(data: {id: number}) {
    return await request.post({
      url: '/admin/article/delete',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 文章详情
  async getArticleDetail<T>(data: {id: number}) {
    return await request.post({
      url: '/admin/article/detail',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 上传文章图片
  async uploadArticleImage<T>(data: FormData) {
    return await request.post({
      url: '/admin/article/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 系统配置
  async systemConfig<T>() {
    return await request.post({
      url: '/admin/system/config',
    }) as TypeBase.JsonResult<T>;
  },
  // 保存系统配置
  async saveSystemConfig<T>(data: TypeSystem.ConfigFormData) {
    return await request.post({
      url: '/admin/system/save_config',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 评论列表
  async commentList<T>(data: TypeBase.PaginationParam) {
    return await request.post({
      url: '/admin/comment/list',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 删除评论
  async deleteComment<T>(data: {id: number}) {
    return await request.post({
      url: '/admin/comment/delete',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 上传关于图片
  async uploadAboutImage<T>(data: FormData) {
    return await request.post({
      url: '/admin/system/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 首页统计
  async homeStatistics<T>() {
    return await request.post({
      url: '/admin/statistics/home',
    }) as TypeBase.JsonResult<T>;
  },
};

export default admin;
