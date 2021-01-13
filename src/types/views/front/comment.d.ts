declare namespace TypeFrontComment {
  /**
   * 友情链接Item
   * 
   * @exports
   * @interface FriendlinkItem
   */
  export interface FormData extends TypeComponentComment.FormData {
    source?: 1 | 2;
    article_id?: number;
    parent_id?: number;
  }
  /**
   * 评论分页请求参数
   * 
   * @exports
   * @interface CommentListParams
   * @extends TypeBase.PaginationParam
   */
  export interface CommentListParams extends TypeBase.PaginationParam {
    source: 1 | 2;
    article_id?: number;
  }
  export interface PaginationResult<T> {
    list: T;
    page: number;
    page_size: number;
    total: number;
    comment_total: number;
  }
  export interface CommentTreeItem {
    id: number;
    article_id: number;
    content: string;
    username: string;
    email: string;
    link: string;
    awatar: string;
    parent_id: number;
    parent?: CommentParentInfo;
    is_master: number;
    level: number;
    created_at: string;
    children: CommentTreeItem[];
  }
  export interface CommentParentInfo {
    id: number;
    username: string;
  }
}
