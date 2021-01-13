import { InputValidationRules } from 'vuetify';

declare global {
  namespace TypeFriendlink {
    /**
     * 友链Item
     * 
     * @exports
     * @interface FriendlinkItem
     */
    export interface FriendlinkItem {
      id: number;
      name: string;
      link: string;
      desc: string;
      created_at: string;
      updated_at?: string;
    }
    /**
     * 友链表单数据
     * 
     * @exports
     * @interface FormData
     */
    export interface FormData {
      id?: number;
      name?: string;
      link?: string;
      desc?: string;
    }
    export interface ValidateRule {
      name: InputValidationRules,
      link: InputValidationRules,
      desc: InputValidationRules,
    }
  }
}
