<template>
  <div>
    <div class="page-title">友情链接</div>
    <v-data-table
      :headers="columns"
      :items="dataList"
      :page.sync="page"
      :items-per-page="pageSize"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.content="{ item }">
        <short-display :width="150" :content="item.content" />
      </template>
      <template v-slot:item.article_link="{ item }">
        <a
          v-if="item.article_id"
          :href="$router.resolve({name: 'ArticleDetail', params: {id: item.article_id}}).href"
          target="_blank"
        >
          <short-display :width="150" :content="item.article.title" />
        </a>
        <a v-else class="one-line" :href="$router.resolve({name: 'About'}).href" target="_blank">关于</a>
      </template>
      <template v-slot:item.link="{ item }">
        <a :href="item.link" target="_blank"><short-display :width="150" :content="item.link" /></a>
      </template>
      <template v-slot:item.created_at="{ item }">
        <short-display :width="100" :content="item.created_at" />
      </template>
      <template v-slot:item.updated_at="{ item }">
        <short-display :width="100" :content="item.updated_at" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn v-if="!item.children_count" color="red" dark small @click="handleDelete(item.id)">
          <v-icon dark left>mdi-delete</v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>
    <pagination
      :page="page"
      :page-size="pageSize"
      :total="total"
      @change="handlePaginationChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AdminComment extends Vue {
  protected columns: TypeBase.DataTableColumn[] = [];
  protected dataList: TypeComment.CommentItem[] = [];
  protected page: number = 1;
  protected pageSize: number = 15;
  protected total: number = 0;
  protected created(): void {
    this.columns = [
      {text: 'ID', value: 'id', width: 60},
      {text: '内容', value: 'content', sortable: false, width: 100},
      {text: '来源', value: 'source_text', sortable: false, width: 60},
      {text: '文章', value: 'article_link'},
      {text: '用户', value: 'username'},
      {text: '邮箱', value: 'email'},
      {text: '链接', value: 'link'},
      {text: '主评论', value: 'parent_content'},
      {text: '创建时间', value: 'created_at'},
      {text: '更新时间', value: 'updated_at'},
      {text: '操作', value: 'actions', sortable: false },
    ];
    this.getCommentList();
  }
  protected async getCommentList(): Promise<void> {
    const params: TypeBase.PaginationParam = {
      page: this.page,
      page_size: this.pageSize,
    };
    const { data: {list, total} } = await this.$api.admin.commentList
    <TypeBase.PaginationResult<TypeComment.CommentItem[]>>(params);
    this.dataList = list;
    this.total = total;
  }
  protected handlePaginationChange(page: number, pageSize: number): void {
    this.page = page;
    this.pageSize = pageSize;
    this.getCommentList();
  }
  protected handleDelete(id: number): void {
    this.$confirm({
      onConfirm: async () => {
        await this.$api.admin.deleteComment({id});
        this.initPage();
        this.getCommentList();
      },
    });
  }
  protected initPage(): void {
    this.page = 1;
  }
}
</script>

<style lang="scss" scoped>
  
</style>
