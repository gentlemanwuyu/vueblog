<template>
  <v-row>
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 content">
      <md-display
        :content="about"
        title="关于"
        class="mt-3 mb-3"
        style="height: auto; min-height: auto;"
      />
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
import { Component, Vue} from 'vue-property-decorator';
import FrontBlogSidebarHot from '@/layout/front/blogSidebar/hot.vue';
import FrontBlogSidebarLabel from '@/layout/front/blogSidebar/label.vue';
import FrontBlogSidebarLink from '@/layout/front/blogSidebar/link.vue';
import Comment from '@/components/comment/Comment.vue';
import CommentList from '@/components/commentList/CommentList.vue';
import $localStorage from '@/utils/localStorage';

@Component({
  components: {
    FrontBlogSidebarHot,
    FrontBlogSidebarLabel,
    FrontBlogSidebarLink,
    Comment,
    CommentList,
  },
})
export default class About extends Vue {
  protected about: string = '';
  protected commentList: TypeFrontComment.CommentTreeItem[] = [];
  protected commentTotal: number = 0;
  protected page: number = 1;
  protected pageSize: number = 10;
  protected paginationLength: number = 0;
  protected key: number = new Date().getTime();
  protected created(): void {
    this.getAbout();
    this.getCommentList();
  }
  protected async getAbout(): Promise<void> {
    const { data } = await this.$api.front.about<string>();
    this.about = data;
  }
  protected async getCommentList(): Promise<void> {
    const params: TypeFrontComment.CommentListParams = {
      source: 2,
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
    const postData: TypeFrontComment.FormData = {source: 2, ...commentData};
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
}
</script>

<style lang="scss" scoped>
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
