declare namespace TypeQiniu {
  /**
   * 七牛云资源Item
   * 
   * @exports
   * @interface QiniuItem
   */
  export interface QiniuItem {
    id: number;
    key: string;
    size: number;
    mime_type: string;
    created_at: string;
    updated_at?: string;
  }
  export interface QiniuUploadResp {
    id: number;
    key: string;
    size: number;
    mime_type: string;
    preview_url?: string;
    created_at: string;
    updated_at?: string;
  }
}
