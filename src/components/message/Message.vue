<template>
  <div class="message">
    <span>
      <transition name="slide" :key="key" v-for="(message, key) in messageList">
        <div class="message-item" :class="message.type">
          <div :class="`message-item-content ${message.type}`">
            <v-icon v-if="message.type === 'success'" style="color: #4caf50;">mdi-checkbox-marked-circle</v-icon>
            <v-icon v-else-if="message.type === 'error'" style="color: red;">mdi-close-circle</v-icon>
            <v-icon v-else-if="message.type === 'warning'" style="color: #fb8c00;">mdi-alert-circle</v-icon>
            <span class="message-content">{{message.content}}</span>
          </div>
        </div>
      </transition>
    </span>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Message extends Vue {
  protected messageList: TypeComponentMessage.MessageItem[] = [];
  public addMessage(content: string, type: TypeComponentMessage.MessageType, duration: number = 3000): void {
    const message: TypeComponentMessage.MessageItem = { content, type };
    this.messageList.push(message);
    window.setTimeout(() => {
      for (const index in this.messageList) {
        if (message === this.messageList[index]) {
          this.messageList.splice(Number(index), 1);
        }
      }
    }, duration);
  }
}
</script>
<style scoped lang="scss">
  .message {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.65);
    font-size: 16px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum";
    position: fixed;
    top: 16px;
    left: 0;
    z-index: 999999999;
    width: 100%;
    pointer-events: none;
  }
  .message-item {
    padding: 8px;
    text-align: center;
  }
  .message-item-content {
    display: inline-block;
    padding: 10px 16px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
    pointer-events: all;
    .v-icon {
      color: red;
      margin-right: 8px;
    }
  }
  .message-content {
    display: inline-block;
    vertical-align: middle;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-enter,
  .slide-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>