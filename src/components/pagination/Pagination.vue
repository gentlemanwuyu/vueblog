<template>
  <div class="pagination mt-3">
    <v-pagination
      v-model="currentPage"
      :length="paginationLength"
      :total-visible="7"
      style="display: inline-block;"
    ></v-pagination>
    <span class="pagination-text">共{{total}}条记录，每页</span>
    <v-select
        v-model="selectedPageSize"
        :items="pageSizeList"
        height="34"
        dense
        solo
        @change="onSelectedPageSizeChange"
        class="ml-1 mr-1"
        style="flex: 0 0 80px;"
      ></v-select>
    <span class="pagination-text">条，跳到</span>
    <v-text-field
      v-model="jumpToPage"
      @blur="onJumpToPageChange"
      class="ml-1 mr-1"
      height="34"
      dense
      solo
      style="flex: 0 0 80px;"
    ></v-text-field>
    <span class="pagination-text">页</span>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  // 父组件传进来的page
  @Prop({type: Number, default: 1})
  protected page!: number;
  // 父组件传进来的pageSize
  @Prop({type: Number, default: 15})
  protected pageSize!: number;
  // 父组件传进来的total
  @Prop({type: Number, default: 0})
  protected total!: number;
  // 每页条数选择列表
  protected pageSizeList: number[] = [15, 30, 50, 100, 200];
  // 当前page
  protected currentPage: number = 1;
  // 当前pageSize
  protected selectedPageSize!: number;
  // 跳到第几页
  protected jumpToPage: string = '';
  // 页码长度
  protected paginationLength: number = 0;
  @Watch('total')
  protected onTotalChange(value: number): void {
    this.calcPaginationLength();
  }
  @Watch('page', {immediate: true})
  protected onPageChange(value: number): void {
    this.currentPage = value;
  }
  @Watch('pageSize', {immediate: true})
  protected onPageSizeChange(value: number): void {
    this.selectedPageSize = value;
    this.calcPaginationLength();
  }
  @Watch('currentPage')
  protected onCurrentPageChange(): void {
    this.$emit('change', this.currentPage, this.selectedPageSize);
  }
  protected onSelectedPageSizeChange(value: number): void {
    this.currentPage = 1;
    this.$emit('change', this.currentPage, this.selectedPageSize);
  }
  protected onJumpToPageChange(): void {
    if (this.jumpToPage) {
      this.currentPage = Number(this.jumpToPage);
      this.$emit('change', this.currentPage, this.selectedPageSize);
    }
  }
  protected calcPaginationLength(): void {
    this.paginationLength = Math.ceil(this.total / this.selectedPageSize);
  }
}
</script>
<style scoped lang="scss">
  .pagination {
    display: flex;
    white-space: nowrap;
    &-text {
      line-height: 43.58px;
    }
  }
</style>