declare namespace TypeFrontCategory {
  /**
   * 分类树Item
   * 
   * @exports
   * @interface CategoryTreeItem
   */
  export interface CategoryTreeItem {
    id: number;
    name: string;
    parent_id: number;
    active?: boolean;
    children?: CategoryTreeItem[];
  }
}
