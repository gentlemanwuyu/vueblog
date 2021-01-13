declare namespace TypeFrontArticle {
  /**
   * 热门文章Item
   * 
   * @exports
   * @interface ArticleHotItem
   */
  export interface ArticleHotItem {
    id: number;
    title: string;
    views: number;
  }
  /**
   * 文章概要Item
   * 
   * @exports
   * @interface ArticleSummaryItem
   */
  export interface ArticleSummaryItem {
    id: number;
    title: string;
    summary: string;
    category_name: string;
    created_at: string;
    image_url: string;
    comment_number: number;
    views: number;
  }
  export interface ArticleListParams extends TypeBase.PaginationParam {
    category_id?: number;
    label_id?: number;
  }
  export interface ArticleDetail {
    id: number;
    title: string;
    content: string;
    summary: string;
    category_id: number;
    category_name: string;
    keyword_list: string[];
    label_list: TypeFrontLabel.LabelCloudItem[];
    created_at: string;
    views: number;
    comments_count: number;
    previous?: ArticleHotItem;
    next?: ArticleHotItem;
  }
}
