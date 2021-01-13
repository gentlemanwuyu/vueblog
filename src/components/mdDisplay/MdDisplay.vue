<template>
  <div class="markdown content">
    <h1 class="content-title">{{title}}</h1>
    <slot name="summary" />
    <div class="content-markdown" v-html="toHtml(content)"></div>
    <slot name="footer" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import marked from '@/plugins/marked';
import '@/assets/style/markdown.scss';

@Component
export default class MdDisplay extends Vue {
  @Prop({type: String, default: ''})
  protected content!: string;
  @Prop({type: String, default: ''})
  protected title!: string;
  protected toHtml(content: string): string {
    return marked(content);
  }
  protected updated(): void {
    // 添加图片点击事件
    const imgList = window.document.getElementsByTagName('img');
    for (const image of imgList) {
      image.addEventListener('click', (e: Event) => {
        // @ts-ignore
        this.$preview(e.target.src);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    box-shadow: $boxShadow;
    padding: $padding;
    font-size: 14px;
    background: #fff;
  }
</style>
