<template>
  <v-card>
    <v-card-title class="sidebar-card-title">
      <v-icon>mdi-file-outline</v-icon>
      <span class="ml-2">热门文章</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="sidebar-card-text">
      <router-link
        v-for="(article, index) in articleList"
        :key="index" :to="{name: 'ArticleDetail', params: {id: article.id}}"
      >
        <div class="mb-2 hot-item" :to="{name: 'ArticleDetail', params: {id: article.id}}">
          <div class="hot-item-title">{{article.title}}</div>
          <v-chip v-if="0 === index" small class="ml-3 hot-item-chip" color="red" text-color="white">{{article.views || 0}}</v-chip>
          <v-chip v-else-if="1 === index" small class="ml-3 hot-item-chip" color="green" text-color="white">{{article.views || 0}}</v-chip>
          <v-chip v-else-if="2 === index" small class="ml-3 hot-item-chip" color="primary" text-color="white">{{article.views || 0}}</v-chip>
          <v-chip v-else small class="ml-3 hot-item-chip">{{article.views || 0}}</v-chip>
        </div>
      </router-link>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class FrontBlogSidebarHot extends Vue {
  protected articleList: TypeFrontArticle.ArticleHotItem[] = [];
  protected async getHotArticle(): Promise<void> {
    const { data: {list} } = await this.$api.front.hotArticle<TypeBase.ListResult<TypeFrontArticle.ArticleHotItem[]>>();
    this.articleList = list;
  }
  protected created(): void {
    this.getHotArticle();
  }
}
</script>

<style lang="scss" scoped>
  .hot-item {
    width: 100%;
    display: flex;
    color: $fontColor;
    &:hover {
      color: $primary;
    }
    &-title {
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-chip {
      overflow: visible;
    }
  }
  // 特大屏幕
  @media (min-width: $lg) {
    
  }
  // 大屏幕
  @media (min-width: $md) and (max-width: $lg) {
    
  }
  // 中等屏幕
  @media (min-width: $sm) and (max-width: $md) {
    .sidebar-card {
      &-title, &-text {
        padding: 12px;
      }
    }
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    
  }
  // 超小屏幕
  @media (max-width: $xs) {
    
  }
</style>
