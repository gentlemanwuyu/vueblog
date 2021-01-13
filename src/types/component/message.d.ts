declare namespace TypeComponentMessage {
  /**
   * Message类
   * 
   * @exports
   * @interface Message
   */
  export interface Message {
    info(content: string, duration?: number): void;
    success(content: string, duration?: number): void;
    error(content: string, duration?: number): void;
    warning(content: string, duration?: number): void;
  }
  export type MessageType = 'info' | 'success' | 'error' | 'warning';
  /**
   * @exports
   * @interface MessageItem
   */
  export interface MessageItem {
    content: string;
    type: MessageType;
  }
}