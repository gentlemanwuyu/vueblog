declare namespace TypeStoreTabPage {
  /**
   * @exports
   * @interface TabItem
   */
  export interface TabItem {
    title: string;
    key: string;
    path: string;
    name: string;
    cache: boolean;
  }
  /**
   * @exports
   * @interface
   */
  export interface TabpageState {
    list: TabItem[];
  }
  /**
   * @exports
   * @interface
   */
  export interface SpliceParam {
    index: number;
    num: number;
  }
  export type Push<S> = (data: S) => void;
  export type Remove<S> = (key: S) => number;
  export type UpdateCache = () => void;
  export type LoadCache = () => void;
  export type GetItemByKey<S> = (key: S) => TabItem|null;
  export type GetPrevItemByKey<S> = (key: S) => TabItem|null;
  export type Splice = (params: SpliceParam) => void;
}
