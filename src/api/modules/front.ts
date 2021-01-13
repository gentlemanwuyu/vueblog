import request from '@/utils/request';

const front = {
  // 标签云
  async labelCloud<T>() {
    return await request.post({
      url: '/front/label/cloud',
    }) as TypeBase.JsonResult<T>;
  },
  // 热门文章
  async hotArticle<T>() {
    return await request.post({
      url: '/front/article/hot',
    }) as TypeBase.JsonResult<T>;
  },
  // 最新文章
  async newArticle<T>() {
    return await request.post({
      url: '/front/article/new',
    }) as TypeBase.JsonResult<T>;
  },
  // 文章列表
  async articleList<T>(data: TypeFrontArticle.ArticleListParams) {
    return await request.post({
      url: '/front/article/list',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 友情链接
  async friendlinkList<T>() {
    return await request.post({
      url: '/front/friendlink/list',
    }) as TypeBase.JsonResult<T>;
  },
  // 关于
  async about<T>() {
    return await request.post({
      url: '/front/system/about',
    }) as TypeBase.JsonResult<T>;
  },
  // 添加评论
  async addComment<T>(data: TypeFrontComment.FormData) {
    return await request.post({
      url: '/front/comment/add',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 评论列表
  async commentList<T>(data: TypeFrontComment.CommentListParams) {
    return await request.post({
      url: '/front/comment/list',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 文章列表
  async categoryTree<T>(data: TypeFrontArticle.ArticleListParams) {
    return await request.post({
      url: '/front/category/tree',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 文章列表
  async articleDetail<T>(data: {id: number}) {
    return await request.post({
      url: '/front/article/detail',
      data,
    }) as TypeBase.JsonResult<T>;
  },
  // 系统配置
  async systemConfig<T>() {
    return await request.post({
      url: '/front/system/config',
    }) as TypeBase.JsonResult<T>;
  },
  // 上报访客数据
  async track<T>(data: TypeCommon.TrackFormData) {
    return await request.post({
      url: '/front/visitor/track',
      data,
    }) as TypeBase.JsonResult<T>;
  },
};

export default front;
