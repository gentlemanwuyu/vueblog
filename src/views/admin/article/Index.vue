<template>
  <div>
    <div class="page-title">文章列表</div>
    <div class="page-actions">
      <v-btn class="float-right" color="primary" @click="handleAdd">
        <v-icon dark left>mdi-plus</v-icon>
        发布文章
      </v-btn>
    </div>
    <v-data-table
      :headers="columns"
      :items="dataList"
      :page.sync="page"
      :items-per-page="pageSize"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.title="{ item }">
        <a :href="getHref(item.id)" target="_blank">{{item.title}}</a>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="table-actions">
          <v-btn class="mr-2" color="primary" dark small @click="handleEdit(item.id)">
            <v-icon dark left>mdi-pencil</v-icon>
            编辑
          </v-btn>
          <v-btn color="red" dark small @click="handleDelete(item.id)">
            <v-icon dark left>mdi-delete</v-icon>
            删除
          </v-btn>
        </div>
      </template>
      <template v-slot:item.category="{ item }">
        <span v-if="item.category.parent">{{item.category.parent.name}}/</span>
        <span>{{item.category.name}}</span>
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
export default class AdminArticle extends Vue {
  protected columns: TypeBase.DataTableColumn[] = [];
  protected dataList: TypeArticle.ListItem[] = [];
  protected page: number = 1;
  protected pageSize: number = 15;
  protected total: number = 0;
  protected created(): void {
    this.columns = [
      {text: 'ID', value: 'id'},
      {text: '标题', value: 'title'},
      {text: '分类', value: 'category'},
      {text: '创建时间', value: 'created_at'},
      {text: '更新时间', value: 'updated_at'},
      {text: '操作', value: 'actions', sortable: false },
    ];
    this.getArticleList();
  }
  protected getHref(id: number): string {
    const { href } = this.$router.resolve({name: 'ArticleDetail', params: {id: String(id)}});
    return href;
  }
  protected async getArticleList(): Promise<void> {
    const params: TypeBase.PaginationParam = {
      page: this.page,
      page_size: this.pageSize,
    };
    const { data: {list, total} } = await this.$api.admin.articleList
    <TypeBase.PaginationResult<TypeArticle.ListItem[]>>(params);
    this.dataList = list;
    this.total = total;
  }
  protected handlePaginationChange(page: number, pageSize: number): void {
    this.page = page;
    this.pageSize = pageSize;
    this.getArticleList();
  }
  protected handleEdit(id: number): void {
    this.$router.push({
      name: 'AdminEditArticle',
      query: {id: String(id)},
    });
  }
  protected handleDelete(id: number): void {
    this.$confirm({
      onConfirm: async () => {
        await this.$api.admin.deleteArticle({id});
        this.initPage();
        this.getArticleList();
      },
    });
  }
  protected handleAdd(): void {
    this.$router.push({
      name: 'AdminAddArticle',
    });
  }
  protected handleSuccess(): void {
    this.initPage();
    this.getArticleList();
  }
  protected initPage(): void {
    this.page = 1;
  }
}
</script>

<style lang="scss" scoped>

</style>
