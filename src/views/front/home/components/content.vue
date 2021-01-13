<template>
  <div class="content-container">
    <front-article-summary
      v-for="article in articleList"
      :key="article.id"
      :summary="article"
      class="mb-4 mt-4"
    />
</div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import FrontArticleSummary from '@/layout/front/articleSummary/index.vue';

@Component({
  components: {
    FrontArticleSummary,
  },
})
export default class HomeContent extends Vue {
  protected articleList: TypeFrontArticle.ArticleSummaryItem[] = [];
  protected async getNewArticleList(): Promise<void> {
    const {data: {list}} = await this.$api.front.newArticle<
      TypeBase.ListResult<TypeFrontArticle.ArticleSummaryItem[]>
    >();
    this.articleList = list;
  }
  protected created(): void {
    this.getNewArticleList();
  }
}
</script>

<style lang="scss" scoped>

</style>
