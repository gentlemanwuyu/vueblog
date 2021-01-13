import { InputValidationRules } from 'vuetify';

declare global {
  namespace TypeArticle {
    /**
     * 文章表单数据
     * 
     * @exports
     * @interface FormData
     */
    export interface FormData {
      id?: number;
      title?: string;
      label_list?: number[];
      keyword_list?: string[];
      category_id?: number;
      content?: string;
      summary?: string;
    }
    export interface ListItem {
      id: number;
      title: string;
      keyword_list: string[];
      label_list: TypeLabel.LabelItem[];
      category: TypeCategory.Info;
      created_at: string;
      updated_at: string;
    }
    export interface Detail {
      id: number;
      title: string;
      content: string;
      summary: string;
      category_id: number;
      keyword_list: string[];
      label_list: TypeLabel.LabelItem[];
      category: TypeCategory.Info;
      created_at: string;
      updated_at: string;
    }
    /**
     * 文章表单校验规则
     * 
     * @exports
     * @interface ValidateRule
     */
    export interface ValidateRule {
      title: InputValidationRules,
      label_list: InputValidationRules,
      keyword_list: InputValidationRules,
      category_id: InputValidationRules,
      content: InputValidationRules,
      summary: InputValidationRules,
    }
  }
}
