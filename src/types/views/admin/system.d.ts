import { InputValidationRules } from 'vuetify';

declare global {
  namespace TypeSystem {
    /**
     * 系统设置表单数据
     * 
     * @exports
     * @interface ConfigFormData
     */
    export interface ConfigFormData {
      name: string;
      address: string;
      email: string;
      title: string;
      keyword_list: string[];
      desc: string;
      about: string;
      icp: string;
    }
    /**
     * 系统配置详情数据
     * 
     * @exports
     * @interface ConfigData
     * @extends ConfigFormData
     */
    export interface ConfigData extends ConfigFormData {

    }
    export interface ValidateRule {
      name: InputValidationRules,
      address: InputValidationRules,
      email: InputValidationRules,
      title: InputValidationRules,
      keyword_list: InputValidationRules,
      desc: InputValidationRules,
      about: InputValidationRules,
      icp: InputValidationRules,
    }
  }
}
