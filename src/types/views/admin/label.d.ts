import { InputValidationRules } from 'vuetify';

declare global {
  namespace TypeLabel {
    /**
     * 标签Item
     * 
     * @exports
     * @interface LabelItem
     */
    export interface LabelItem {
      id: number;
      name: string;
      created_at: string;
      updated_at?: string;
    }
    /**
     * 所有标签Item
     * 
     * @exports
     * @interface LabelAllItem
     */
    export interface LabelAllItem {
      id: number;
      name: string;
    }
    /**
     * 标签表单数据
     * 
     * @exports
     * @interface FormData
     */
    export interface FormData {
      id?: number;
      name?: string;
    }
    export interface ValidateRule {
      name: InputValidationRules,
    }
  }
}
