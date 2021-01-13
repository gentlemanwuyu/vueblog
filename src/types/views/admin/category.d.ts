import { InputValidationRules } from 'vuetify';

declare global {
  namespace TypeCategory {
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
      image_id: number;
      image: CategoryImage;
      children?: CategoryTreeItem[];
    }
    /**
     * 分类表单数据
     * 
     * @exports
     * @interface FormData
     */
    export interface FormData {
      id?: number;
      name?: string;
      parent_id?: number;
      image_id?: number;
    }
    export interface Info {
      id: number;
      name: string;
      parent_id: number;
      parent?: Info;
      image?: CategoryImage;
    }
    export interface CategoryImage {
      id?: number;
      key?: string;
      size?: number;
      mime_type?: string;
      preview_url?: string;
    }
    export interface ValidateRule {
      name: InputValidationRules,
    }
  }
}
