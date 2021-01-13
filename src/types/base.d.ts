declare namespace TypeBase {
  export interface RequestParams<T>{
    url: string;
    params?:  T;
    data?: T;
    headers?: {},
    cache?: boolean;
    autoRetry?: boolean;
    responseType?: 'blob';
  }
  export interface JsonResult<T> {
    code: number;
    data: T;
    message: string;
    debug?: string;
  }
  /**
   * @exports
   * @interface ListResult
   */
  export interface ListResult<T> {
    list: T;
  }
  /**
   * 分页结果
   * 
   * @exports
   * @interface PaginationResult
   */
  export interface PaginationResult<T> {
    list: T;
    page: number;
    page_size: number;
    total: number;
  }
  export type Result<D> = JsonResult<D> | Blob;
  /**
   * 分页查询参数
   * 
   * @exports
   * @interface PaginationParam
   */
  export interface PaginationParam {
    page: number;
    page_size: number;
  }
  export interface DataTableColumn {
    text: string,
    value: string,
    align?: 'start' | 'center' | 'end',
    sortable?: boolean,
    filterable?: boolean,
    groupable?: boolean,
    divider?: boolean,
    class?: string | string[],
    width?: string | number,
    filter?: (value: any, search: string, item: any) => boolean,
    sort?: (a: any, b: any) => number
  }
  export type AddEditType = 'add' | 'edit';
}