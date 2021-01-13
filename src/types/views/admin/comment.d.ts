declare namespace TypeComment {
  /**
   * 评论Item
   * 
   * @exports
   * @interface CommentItem
   */
  export interface CommentItem {
    id: number;
    article_id: number;
    article: TypeArticle.ListItem;
    content: string;
    username: string;
    email: string;
    link: string;
    parent_id: number;
    parent_content: string;
    children_count: number;
    is_master: 0 | 1;
    source: 1 | 2;
    source_text: string;
    created_at: string;
    updated_at?: string;
  }
}
