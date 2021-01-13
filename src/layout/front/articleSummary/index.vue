<template>
  <v-card :to="{name: 'ArticleDetail', params: {id: summary.id}}">
    <v-card-text>
      <v-row class="summary-body">
        <div class="summary-item summary-img col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
          <div class="summary-img-container" :style="`background-image: url('${summary.image_url}')`"></div>
        </div>
        <div class="summary-item article-summary col-xs-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
          <div class="article-summary-title">{{summary.title}}</div>
          <div class="article-summary-content">{{summary.summary}}</div>
          <div class="article-summary-tips">
            <div class="article-summary-tips-item">
              <v-icon :size="18">mdi-bullseye-arrow</v-icon>
              <span class="article-summary-tips-item-content">{{summary.category_name}}</span>
            </div>
            <div class="article-summary-tips-item">
              <v-icon :size="18">mdi-clock-outline</v-icon>
              <span class="article-summary-tips-item-content">{{summary.created_at}}</span>
            </div>
            <div class="article-summary-tips-item">
              <v-icon :size="18">mdi-eye</v-icon>
              <span class="article-summary-tips-item-content">{{summary.views}}</span>
            </div>
            <div class="article-summary-tips-item">
              <v-icon :size="18">mdi-message-outline</v-icon>
              <span class="article-summary-tips-item-content">{{summary.comment_number}}条</span>
            </div>
          </div>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FrontArticleSummary extends Vue {
  @Prop({type: Object, default: () => {
    return {
      id: 0,
      title: '',
      summary: '',
      category_name: '',
      created_at: '',
      image_url: '',
      comment_number: 0,
      views: 0,
    };
  }})
  protected summary!: TypeFrontArticle.ArticleSummaryItem;
}
</script>

<style lang="scss" scoped>
  .summary-img-container {
    width: 100%;
    padding: 50%;
    background-position: center center;
    background-size: contain;
  }
  .article-summary {
    width: 100%;
    position: relative;
    &-title {
      width: 100%;
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 8px;
    }
    &-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4; //需要控制的文本行数
      overflow: hidden;
      font-size: 14px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-tips {
      position: absolute;
      bottom: 12px;
      font-size: 14px;
      line-height: 22px;
      overflow: hidden;
      &-item {
        display: inline-block;
        &-content {
          margin-left: 5px;
        }
      }
      &-item+&-item {
        margin-left: 30px;
      }
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
    .summary-item {
      padding-top: 0;
      padding-bottom: 0;
    }
    .article-summary {
      &-content {
        -webkit-line-clamp: 2;
        margin-bottom: 8px;
      }
      &-tips {
        bottom: 0;
      }
    }
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    .article-summary {
      &-content {
        -webkit-line-clamp: 3;
        margin-bottom: 8px;
      }
    }
  }
  // 超小屏幕
  @media (max-width: $xs) {
    .summary-img {
      display: none;
    }
    .article-summary {
      &-content {
        -webkit-line-clamp: 4;
        margin-bottom: 8px;
      }
      &-tips {
        position: relative;
        bottom: 0;
        &-item {
          display: block;
          margin-left: 0!important;
          padding-top: 4px;
          padding-bottom: 4px;
        }
      }
    }
  }
</style>
