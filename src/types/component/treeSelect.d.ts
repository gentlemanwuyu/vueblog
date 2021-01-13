declare namespace TypeComponentTreeSelect {
  /**
   * @exports
   * @interface TreeItem
   */
  export interface TreeItem {
    id?: number;
    name?: string;
    children?: TreeItem[];
  }
}