import Vue from 'vue';
import MessageComponent from './Message.vue';

const MessageBox = Vue.extend(MessageComponent); // 创建的是一个组件构造器，不是实例
const message = new MessageBox().$mount();
document.body.appendChild(message.$el);
const $message: TypeComponentMessage.Message = {
  info: (content: string, duration: number) => {
    // @ts-ignore
    message.addMessage(content, 'info', duration);
  },
  success: (content: string, duration: number) => {
    // @ts-ignore
    message.addMessage(content, 'success', duration);
  },
  error: (content: string, duration: number) => {
    // @ts-ignore
    message.addMessage(content, 'error', duration);
  },
  warning: (content: string, duration: number) => {
    // @ts-ignore
    message.addMessage(content, 'warning', duration);
  },
};

export default $message;
