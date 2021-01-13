import { InputValidationRules } from 'vuetify';

declare global {
  namespace TypeComponentComment {
    /**
     * 评论表单数据
     * 
     * @exports
     * @interface FormData
     */
    export interface FormData {
      content: string;
      username: string;
      email: string;
      link: string;
    }
    export interface ValidateRule {
      content: InputValidationRules,
      username: InputValidationRules,
      email: InputValidationRules,
      link: InputValidationRules,
    }
    export interface Comment {
      show(id: number, submitCallback: TypeComponentComment.SubmitCallback): void;
      destroy(id: number): void;
    }
    export type SubmitCallback = (params: FormData) => void;
  }
}
