<template>
  <div>
    <div class="page-title">友情链接</div>
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
      class="elevation-1"
    >
    <template v-slot:item.link="{ item }">
      <a :href="item.link" target="_blank">{{item.link}}</a>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="table-actions">
        <v-btn class="mr-2" color="primary" dark small @click="handleEdit(item)">
          <v-icon dark left>mdi-pencil</v-icon>
          编辑
        </v-btn>
        <v-btn color="red" dark small @click="handleDelete(item.id)">
          <v-icon dark left>mdi-delete</v-icon>
          删除
        </v-btn>
      </div>
    </template>
    </v-data-table>
    <pagination
      :page="page"
      :page-size="pageSize"
      :total="total"
      @change="handlePaginationChange"
    />
    <add-edit-friendlink-dialog ref="addEditFriendlinkDialogRef" @success="handleSuccess"></add-edit-friendlink-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddEditFriendlinkDialog from './components/AddEditFriendlinkDialog.vue';

@Component({
  components: {AddEditFriendlinkDialog},
})
export default class AdminFriendlink extends Vue {
  protected columns: TypeBase.DataTableColumn[] = [];
  protected dataList: TypeFriendlink.FriendlinkItem[] = [];
  protected page: number = 1;
  protected pageSize: number = 15;
  protected total: number = 0;
  protected created(): void {
    this.columns = [
      {text: 'ID', value: 'id'},
      {text: '名称', value: 'name'},
      {text: '链接', value: 'link'},
      {text: '描述', value: 'desc'},
      {text: '创建时间', value: 'created_at'},
      {text: '更新时间', value: 'updated_at'},
      {text: '操作', value: 'actions', sortable: false },
    ];
    this.getFriendlinkList();
  }
  protected async getFriendlinkList(): Promise<void> {
    const params: TypeBase.PaginationParam = {
      page: this.page,
      page_size: this.pageSize,
    };
    const { data: {list, total} } = await this.$api.admin.friendlinkList
    <TypeBase.PaginationResult<TypeFriendlink.FriendlinkItem[]>>(params);
    this.dataList = list;
    this.total = total;
  }
  protected handlePaginationChange(page: number, pageSize: number): void {
    this.page = page;
    this.pageSize = pageSize;
    this.getFriendlinkList();
  }
  protected handleEdit(item: TypeFriendlink.FriendlinkItem): void {
    const addEditFriendlinkDialogRef = this.$refs.addEditFriendlinkDialogRef as AddEditFriendlinkDialog;
    addEditFriendlinkDialogRef.type = 'edit';
    addEditFriendlinkDialogRef.detail = this.$util.deepCopy(item);
    addEditFriendlinkDialogRef.visiable = true;
  }
  protected handleDelete(id: number): void {
    this.$confirm({
      onConfirm: async () => {
        await this.$api.admin.deleteFriendlink({id});
        this.initPage();
        this.getFriendlinkList();
      },
    });
  }
  protected handleAdd(): void {
    const addEditFriendlinkDialogRef = this.$refs.addEditFriendlinkDialogRef as AddEditFriendlinkDialog;
    addEditFriendlinkDialogRef.type = 'add';
    addEditFriendlinkDialogRef.visiable = true;
  }
  protected handleSuccess(): void {
    this.initPage();
    this.getFriendlinkList();
  }
  protected initPage(): void {
    this.page = 1;
  }
}
</script>

<style lang="scss" scoped>
  
</style>
