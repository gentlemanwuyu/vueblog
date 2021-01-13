<template>
  <div class="content-container">
    <front-article-summary
      v-for="article in articleList"
      :key="article.id"
      :summary="article"
      class="mb-4 mt-4"
    />
    <v-pagination
      v-if="paginationLength"
      v-model="page"
      :length="paginationLength"
      :total-visible="7"
      @input="handlePageChange"
    ></v-pagination>
    <empty-content v-else />
</div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import FrontArticleSummary from '@/layout/front/articleSummary/index.vue';
import EmptyContent from '@/components/emptyContent/EmptyContent.vue';

@Component({
  components: {
    FrontArticleSummary,
    EmptyContent,
  },
})
export default class ITContent extends Vue {
  protected articleList: TypeFrontArticle.ArticleSummaryItem[] = [];
  protected page: number = 1;
  protected pageSize: number = 10;
  protected paginationLength: number = 0;
  protected async getArticleList(): Promise<void> {
    const params: TypeFrontArticle.ArticleListParams = {
      page: this.page,
      page_size: this.pageSize,
    };
    const {data: {list, total}} = await this.$api.front.articleList<
      TypeBase.PaginationResult<TypeFrontArticle.ArticleSummaryItem[]>
    >(params);
    this.articleList = list;
    this.paginationLength = Math.ceil(total / this.pageSize);
  }
  protected handlePageChange(val: number): void {
    this.page = val;
    this.getArticleList();
  }
  protected created(): void {
    this.getArticleList();
  }
}
</script>

<style lang="scss" scoped>

</style>
