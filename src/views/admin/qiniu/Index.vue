<template>
  <div>
    <div class="page-title">七牛云资源列表</div>
    <div class="page-actions">
      <upload
        class="float-right"
        multiple
        :accept="['jpg', 'jpeg', 'png', 'gif']"
        @upload="handleUpload"
      >
      </upload>
    </div>
    <v-data-table
      :headers="columns"
      :items="dataList"
      :page.sync="page"
      :items-per-page="pageSize"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.image="{ item }">
        <div v-if="isImage(item.mime_type)" class="img-container">
          <img :src="item.preview_url" @click="$preview(item.preview_url)">
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Upload from '@/components/upload/Upload.vue';

@Component({
  components: {Upload},
})
export default class AdminQiniu extends Vue {
  protected columns: TypeBase.DataTableColumn[] = [];
  protected dataList: TypeQiniu.QiniuItem[] = [];
  protected page: number = 1;
  protected pageSize: number = 15;
  protected total: number = 0;
  protected created(): void {
    this.columns = [
      {text: 'ID', value: 'id'},
      {text: '资源名', value: 'key'},
      {text: '图片', value: 'image'},
      {text: '类型', value: 'mime_type'},
      {text: '大小(KB)', value: 'size'},
      {text: '创建时间', value: 'created_at'},
      {text: '更新时间', value: 'updated_at'},
      {text: '操作', value: 'actions', sortable: false },
    ];
    this.getQiniuList();
  }
  protected async getQiniuList(): Promise<void> {
    const params: TypeBase.PaginationParam = {
      page: this.page,
      page_size: this.pageSize,
    };
    const { data: {list, page, page_size, total} } = await this.$api.admin.qiniuList
    <TypeBase.PaginationResult<TypeQiniu.QiniuItem[]>>(params);
    this.dataList = list;
    this.total = total;
  }
  protected isImage(mimeType: string): boolean {
    const imageMimeTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];
    return imageMimeTypes.includes(mimeType);
  }
  protected handlePaginationChange(page: number, pageSize: number): void {
    this.page = page;
    this.pageSize = pageSize;
    this.getQiniuList();
  }
  protected async handleUpload(fileList: File[]): Promise<void> {
    this.uploadFiles(fileList).then(() => {
      this.initPage();
      this.getQiniuList();
    });
  }
  protected async uploadFiles(fileList: File[]): Promise<void> {
    for (const file of fileList) {
      const formData = new FormData();
      formData.append('file', file);
      this.$api.admin.uploadFile(formData);
    }
  }
  protected handleDelete(id: number): void {
    this.$confirm({
      onConfirm: async () => {
        await this.$api.admin.deleteFile({id});
        this.initPage();
        this.getQiniuList();
      },
    });
  }
  protected initPage(): void {
    this.page = 1;
  }
}
</script>

<style lang="scss" scoped>
  .img-container {
    max-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      max-width: 100%;
      height: auto;
      cursor: pointer;
    }
  }
</style>
