declare namespace TypeComponentConfirm {
  /**
   * @exports
   * @interface Config
   */
  export interface Config {
    title?: string;
    content?: string;
    width?: number;
    onConfirm?: () => void;
  }
}