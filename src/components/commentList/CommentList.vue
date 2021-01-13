<template>
  <ol :class="{'comment-list': true, 'level-2-plus': level > 1}">
    <li
      v-for="(item, index) in items"
      :key="index"
      :id="`comment-item-${item.id}`"
      :class="{'comment-item': true, 'tree-line': (level > 0 && item.children.length) || (level > 1 && index < items.length -1)}"
    >
      <div class="comment-item-avatar">
        <img class="comment-item-avatar-img" :src="item.avatar">
      </div>
      <div class="comment-item-content">
        <a class="comment-item-content-username" :href="item.link || 'javascript:;'"><strong>{{item.username}}</strong><span v-if="item.is_master" class="blog-master ml-1">博主</span></a>
        <div v-if="item.parent" class="mt-1">
          <a :href="`#comment-item-${item.parent.id}`">@{{item.parent.username}}</a>
        </div>
        <div class="comment-item-content-text">
          {{item.content}}
        </div>
        <div class="comment-item-content-bar" :id="`comment-reply-${item.id}`">
          <v-btn class="mr-3 pa-3" :outlined="!statusList[item.id]" x-small color="primary" @click="handleReply(item.id)">回复</v-btn>
          <span>{{item.created_at}}</span>
        </div>
      </div>
      <comment-list
        v-if="item.children && item.children.length"
        :items="item.children"
        @submit="handleSubmit"
        :level="item.level"
      />
    </li>
  </ol>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import $comment from '@/components/comment';

@Component
export default class CommentList extends Vue {
  @Prop({type: Array, default: () => []})
  protected items!: TypeFrontComment.CommentTreeItem[];
  @Prop({type: Number, default: 0})
  protected level!: number;
  // 评论状态
  protected statusList: {[key: number]: boolean} = {};
  protected handleReply(id: number): void {
    if (this.statusList[id]) {
      $comment.destroy(id);
      this.$set(this.statusList, id, false);
    } else {
      $comment.show(id, (params: TypeComponentComment.FormData) => {
        const formData: TypeFrontComment.FormData = {
          parent_id: id,
          ...params,
        };
        this.handleSubmit(formData);
      });
      this.$set(this.statusList, id, true);
    }
  }
  protected handleSubmit(data: TypeFrontComment.FormData): void {
    this.$emit('submit', data);
  }
}
</script>

<style lang="scss" scoped>
  ol, li {
    list-style: none;
    padding: 0;
  }
  .level-2-plus {
    margin-left: -70px;
  }
  .blog-master {
    background: $warning;
    color: $darkFontColor;
    font-size: 0.8em;
    padding: 0.1em 0.5em;
    border-radius: 0.3em;
  }
  .comment-item {
    position: relative;
    padding-left: 70px;
    padding-right: 12px;
    min-height: 60px;
    &-avatar {
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      width: 60px;
      height: 60px;
      padding: 1px;
      border-radius: 100%;
      box-shadow: $boxShadow;
      &-img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    &-content {
      position: relative;
      padding-top: 12px;
      padding-bottom: 12px;
      &-username {
        color: $fontColor;
      }
      &-text {
        margin-top: 8px;
        margin-bottom: 8px;
        line-height: 26px;
      }
    }
  }
  .tree-line>.comment-item-content::before {
    content: '';
    display: block;
    position: absolute;
    left: -40px;
    top: 60px;
    bottom: 0;
    border-left: 1px dashed $borderColor;
  }
  
  // 特大屏幕
  @media (min-width: $lg) {
    
  }
  // 大屏幕
  @media (min-width: $md) and (max-width: $lg) {
    
  }
  // 中等屏幕
  @media (min-width: $sm) and (max-width: $md) {
    
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    
  }
  // 超小屏幕
  @media (max-width: $xs) {
    .level-2-plus {
      margin-left: -48px;
    }
    .comment-item {
      font-size: 14px;
      padding-left: 48px;
      &-avatar {
        width: 40px;
        height: 40px;
      }
      &-content {
        position: relative;
        padding-top: 8px;
        padding-bottom: 8px;
        &-username {
          color: $fontColor;
        }
        &-text {
          line-height: 22px;
        }
      }
    }
    .tree-line>.comment-item-content::before {
      left: -28px;
      top: 40px;
    }
  }
</style>
