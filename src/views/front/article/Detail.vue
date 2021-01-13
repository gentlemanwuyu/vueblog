<template>
  <v-row>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 content">
      <md-display
        :detail="detail"
        :content="detail.content"
        :title="detail.title"
        class="mt-4 mb-4"
        style="height: auto; min-height: auto;"
      >
        <template v-slot:summary>
          <div class="content-summary mt-3 mb-3">
            <div class="content-summary-tip">
              <span class="content-summary-tip-item">
                <router-link :to="{name: 'Category', params: {id: detail.category_id}}">
                  <v-icon :size="18">mdi-bullseye-arrow</v-icon>
                  <span class="content-summary-tip-item-content">{{detail.category_name}}</span>
                </router-link>
              </span>
              <span class="content-summary-tip-item">
                <v-icon :size="18">mdi-clock-outline</v-icon>
                <span class="content-summary-tip-item-content">{{detail.created_at}}</span>
              </span>
              <span class="content-summary-tip-item">
                <v-icon :size="18">mdi-eye</v-icon>
                <span class="content-summary-tip-item-content">{{detail.views}}</span>
              </span>
              <span class="content-summary-tip-item">
                <v-icon :size="18">mdi-message-outline</v-icon>
                <span class="content-summary-tip-item-content">{{detail.comments_count}}条</span>
              </span>
            </div>
            <blockquote class="content-summary-blockquote">
              {{detail.summary}}
            </blockquote>
          </div>
        </template>
        <template v-slot:footer>
          <div class="content-footer mt-3 mb-3">
            <div class="content-footer-label">
              <span class="item-label">标签</span>
              <router-link v-for="label in detail.label_list" :key="label.id" :to="{name: 'Label', params: {id: label.id}}">
                <v-chip small label outlined class="content-footer-label-item mr-1">{{label.name}}</v-chip>
              </router-link>
            </div>
            <v-row class="content-footer-related">
              <div v-if="detail.previous" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 content-footer-related-item">
                <span class="item-label">上一篇</span>
                <router-link :to="{name: 'ArticleDetail', params: {id: detail.previous.id}}">{{detail.previous.title}}</router-link>
              </div>
              <div v-if="detail.next" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 content-footer-related-item">
                <span class="item-label">下一篇</span>
                <router-link :to="{name: 'ArticleDetail', params: {id: detail.next.id}}">{{detail.next.title}}</router-link>
              </div>
            </v-row>
          </div>
        </template>
      </md-display>
      <div class="comment">
        <div class="comment-title mb-3">
          <v-icon>mdi-emoticon-excited-outline</v-icon>
          <div class="comment-title-text">评论啦~</div>
        </div>
        <v-divider class="mb-3" />
        <comment class="mb-3" @submit="handleSubmit" :key="key" />
        <div v-if="paginationLength" class="comment-list mb-3">
          <div class="comment-list-title mb-3">共有{{commentTotal}}条评论</div>
          <v-divider class="mb-3" />
          <comment-list :key="key" :items="commentList" @submit="handleSubmit"></comment-list>
          <v-pagination
            v-model="page"
            :length="paginationLength"
            :total-visible="7"
            @input="handlePageChange"
          ></v-pagination>
        </div>
        <div v-else class="comment-list pa-3 text-center">
          暂无评论，快来抢沙发吧!
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 sidebar">
      <front-blog-sidebar-hot class="mb-4 mt-4" />
      <front-blog-sidebar-label class="mb-4 mt-4" />
      <front-blog-sidebar-link class="mb-4 mt-4" />
    </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FrontBlogSidebarHot from '@/layout/front/blogSidebar/hot.vue';
import FrontBlogSidebarLabel from '@/layout/front/blogSidebar/label.vue';
import FrontBlogSidebarLink from '@/layout/front/blogSidebar/link.vue';
import Comment from '@/components/comment/Comment.vue';
import CommentList from '@/components/commentList/CommentList.vue';
import $localStorage from '@/utils/localStorage';
import $metaInfo from '@/utils/metaInfo';

@Component({
  components: {
    FrontBlogSidebarHot,
    FrontBlogSidebarLabel,
    FrontBlogSidebarLink,
    Comment,
    CommentList,
  },
})
export default class ArticleDetail extends Vue {
  protected detail: TypeFrontArticle.ArticleDetail = this.initDetail();
  protected articleId: number = 0;
  protected commentList: TypeFrontComment.CommentTreeItem[] = [];
  protected commentTotal: number = 0;
  protected page: number = 1;
  protected pageSize: number = 10;
  protected paginationLength: number = 0;
  protected key: number = new Date().getTime();
  @Watch('$route.params.id', {immediate: true})
  protected onIdChange(id: string): void {
    this.articleId = Number(id);
    this.initPage();
    this.getDetail();
    this.getCommentList();
  }
  protected async getDetail(): Promise<void> {
    const { data } = await this.$api.front.articleDetail<TypeFrontArticle.ArticleDetail>({id: this.articleId});
    this.detail = data;
    const systemConfig = $localStorage.get('systemConfig') as TypeCommon.SystemConfig;
    this.$metaInfo({
      title: `${data.title} | ` + (systemConfig.title || '吴宇博客'),
      description: data.summary,
      keywords: data.keyword_list.join(','),
    });
  }
  protected async getCommentList(): Promise<void> {
    const params: TypeFrontComment.CommentListParams = {
      source: 1,
      article_id: this.articleId,
      page: this.page,
      page_size: this.pageSize,
    };
    const { data: {total, comment_total, list} } = await this.$api.front.commentList<
      TypeFrontComment.PaginationResult<TypeFrontComment.CommentTreeItem[]>
    >(params);
    this.commentList = list;
    this.commentTotal = comment_total;
    this.paginationLength = Math.ceil(total / this.pageSize);
  }
  protected handlePageChange(value: number): void {
    this.page = value;
    this.getCommentList();
  }
  protected async handleSubmit(commentData: TypeComponentComment.FormData): Promise<void> {
    const postData: TypeFrontComment.FormData = {source: 1, article_id: this.articleId, ...commentData};
    const { code, message } = await this.$api.front.addComment<void>(postData);
    this.$message.success('谢谢您的点评！');
    // 保存用户信息
    $localStorage.set('userInfo', {
      username: commentData.username,
      email: commentData.email,
      link: commentData.link,
    });
    this.key = new Date().getTime();
    this.getCommentList();
  }
  /**
   * 初始化组件数据
   */
  protected initPage(): void {
    this.detail = this.initDetail();
    this.commentList.length = 0;
    this.page = 1;
    this.pageSize = 10;
    this.paginationLength = 0;
    this.commentTotal = 0;
  }
  protected initDetail(): TypeFrontArticle.ArticleDetail {
    return {
      id: 0,
      title: '',
      content: '',
      summary: '',
      category_id: 0,
      category_name: '',
      views: 0,
      comments_count: 0,
      keyword_list: [],
      label_list: [],
      created_at: '',
      previous: undefined,
      next: undefined,
    };
  }
}
</script>

<style lang="scss" scoped>
  .content-summary {
    &-tip {
      &-item+&-item {
        margin-left: 24px;
      }
      &-item {
        &-content {
          margin-left: 4px;
        }
      }
    }
    &-blockquote {
      border-left: 5px solid $primary;
      background: #fff;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
  .content-footer {    
    &-label {
      &-item {
        cursor: pointer;
        &:hover {
          color: $primary;
          border-color: $primary;
        }
      }
    }
    &-related {
      margin-top: $padding;
      margin-bottom: $padding;
      &-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 0;
        padding-bottom: 0;
        & a {
          color: $fontColor;
          &:hover {
            color: $primary;
          }
        }
      }
    }
  }
  .comment {
    padding: $padding;
    box-shadow: $boxShadow;
    &-title {
      &-text {
        display: inline-block;
        height: $iconHeight;
        vertical-align: middle;
        line-height: $iconHeight;
        margin-left: 6px;
      }
    }
  }
  // 大屏幕
  @media (min-width: 960px) {
    .content {
      padding: 12px;
    }
    .sidebar {
      padding: 12px;
    }
  }
  // 中等屏幕
  @media (min-width: 600px) and (max-width: 960px) {
    .content {
      padding: 12px;
    }
    .sidebar {
      padding: 12px;
    }
  }
  // 小屏幕
  @media (max-width: 600px) {
    .content {
      padding: 12px;
    }
    .sidebar {
      padding: 12px;
    }
  }
</style>
