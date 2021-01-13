import { InputValidationRules } from 'vuetify';

declare global {
  namespace TypeLogin {
    /**
     * @exports
     * @interface FormData
     */
    export interface FormData {
      username?: string,
      password?: string,
      captcha?: string,
    }
    /**
     * 登录校验规则
     * 
     * @exports
     * @interface
     */
    export interface ValidateRule {
      username: InputValidationRules,
      password: InputValidationRules,
      captcha: InputValidationRules,
    }
  }
}
