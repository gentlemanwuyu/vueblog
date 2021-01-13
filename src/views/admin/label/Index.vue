<template>
  <div>
    <div class="page-title">标签管理</div>
    <div class="page-actions">
      <v-btn class="float-right" color="primary" @click="handleAdd">
        <v-icon dark left>mdi-plus</v-icon>
        新增
      </v-btn>
    </div>
    <v-data-table
      :headers="columns"
      :items="dataList"
      :page.sync="page"
      :items-per-page="pageSize"
      hide-default-footer
      :sort-by="['calories', 'fat']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    >
    <template v-slot:item.actions="{ item }">
      <v-btn class="mr-2" color="primary" dark small @click="handleEdit(item)">
        <v-icon dark left>mdi-pencil</v-icon>
        编辑
      </v-btn>
      <v-btn color="red" dark small @click="handleDelete(item.id)">
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
    <add-edit-label-dialog ref="addEditLabelDialogRef" @success="handleSuccess"></add-edit-label-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddEditLabelDialog from './components/AddEditLabelDialog.vue';

@Component({
  components: {AddEditLabelDialog},
})
export default class AdminLabel extends Vue {
  protected columns: TypeBase.DataTableColumn[] = [];
  protected dataList: TypeLabel.LabelItem[] = [];
  protected page: number = 1;
  protected pageSize: number = 15;
  protected total: number = 0;
  protected created(): void {
    this.columns = [
      {text: 'ID', value: 'id'},
      {text: '标签名', value: 'name'},
      {text: '创建时间', value: 'created_at'},
      {text: '更新时间', value: 'updated_at'},
      {text: '操作', value: 'actions', sortable: false },
    ];
    this.getLabelList();
  }
  protected async getLabelList(): Promise<void> {
    const params: TypeBase.PaginationParam = {
      page: this.page,
      page_size: this.pageSize,
    };
    const { data: {list, page, page_size, total} } = await this.$api.admin.labelList
    <TypeBase.PaginationResult<TypeLabel.LabelItem[]>>(params);
    this.dataList = list;
    this.total = total;
  }
  protected handlePaginationChange(page: number, pageSize: number): void {
    this.page = page;
    this.pageSize = pageSize;
    this.getLabelList();
  }
  protected handleEdit(item: TypeLabel.LabelItem): void {
    const addEditLabelDialogRef = this.$refs.addEditLabelDialogRef as AddEditLabelDialog;
    addEditLabelDialogRef.type = 'edit';
    addEditLabelDialogRef.detail = this.$util.deepCopy(item);
    addEditLabelDialogRef.visiable = true;
  }
  protected handleDelete(id: number): void {
    this.$confirm({
      onConfirm: async () => {
        await this.$api.admin.deleteLabel({id});
        this.initPage();
        this.getLabelList();
      },
    });
  }
  protected handleAdd(): void {
    const addEditLabelDialogRef = this.$refs.addEditLabelDialogRef as AddEditLabelDialog;
    addEditLabelDialogRef.type = 'add';
    addEditLabelDialogRef.visiable = true;
  }
  protected handleSuccess(): void {
    this.initPage();
    this.getLabelList();
  }
  protected initPage(): void {
    this.page = 1;
  }
}
</script>

<style lang="scss" scoped>
  
</style>
