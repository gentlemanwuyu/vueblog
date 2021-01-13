<template>
  <v-dialog v-model="visiable" persistent max-width="600">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field v-model="formData.name" clearable label="标签名" :counter="255" :rules="rules.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <upload class="upload-btn" :accept="['jpg', 'jpeg', 'png', 'gif']" @upload="handleUpload" />
                <span class="uploaded-file" v-if="uploadedFile.id" @click="$preview(`${uploadedFile.preview_url}`)" style="cursor: pointer;">
                  {{uploadedFile.key}}
                </span>
                <span class="uploaded-file" v-else>暂无上传文件</span>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary darken-1" text @click="handleSubmit">提交</v-btn>
        <v-btn color="red darken-1" text @click="handleCancel">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Upload from '@/components/upload/Upload.vue';

@Component({
  components: {
    Upload,
  },
})
export default class AddEditLabelDialog extends Vue {
  public visiable: boolean = false;
  public type: TypeBase.AddEditType = 'add';
  public parentId?: number;
  public detail?: TypeCategory.CategoryTreeItem;
  protected title: string = '';
  protected formData: TypeCategory.FormData = {
    id: undefined,
    name: '',
    parent_id: undefined,
    image_id: undefined,
  };
  protected uploadedFile: TypeCategory.CategoryImage = this.initUploadedFile();
  // 表单校验规则
  protected rules: TypeLabel.ValidateRule = {
    name: [
      (v: string) => !!v || '请输入分类名称',
      (v: string) => v && v.length < 255 || '分类名称不能超过255个字符',
    ],
  };
  @Watch('type', {immediate: true})
  protected onTypeChange(type: TypeBase.AddEditType): void {
    if ('add' === type) {
      this.title = '新增分类';
    } else if ('edit' === type) {
      this.title = '编辑分类';
    }
  }
  @Watch('visiable')
  protected onVisiableChange(visiable: boolean) {
    if (!visiable) {
      this.initDialog();
    } else {
      if (this.detail) {
        this.formData.id = this.detail.id;
        this.formData.name = this.detail.name;
        this.formData.image_id = this.detail.image_id;
        this.uploadedFile = this.detail.image;
      } else if (this.parentId) {
        this.formData.parent_id = this.parentId;
      }
    }
  }
  protected async handleSubmit(): Promise<void> {
    const formRef = this.$refs.formRef as any;
    if (formRef.validate()) {
      try {
        const postData = this.$util.deepCopy(this.formData);
        if (this.uploadedFile.id) {
          postData.image_id = this.uploadedFile.id;
        }
        if ('add' === this.type) {
          await this.$api.admin.addCategory(postData);
        } else {
          await this.$api.admin.editCategory(postData);
        }
        this.visiable = false;
        this.initDialog();
        this.$emit('success');
      } catch (e) {
        console.log(e);
      }
    }
  }
  protected async handleUpload(fileList: File[]): Promise<void> {
    const formData = new FormData();
    formData.append('file', fileList[0]);
    const {data} = await this.$api.admin.uploadCategoryImage<TypeQiniu.QiniuUploadResp>(formData);
    this.$set(this.uploadedFile, 'id', data.id);
    this.$set(this.uploadedFile, 'key', data.key);
    this.$set(this.uploadedFile, 'size', data.size);
    this.$set(this.uploadedFile, 'mime_type', data.mime_type);
    this.$set(this.uploadedFile, 'preview_url', data.preview_url);
  }
  protected handleCancel(): void {
    this.visiable = false;
  }
  protected initDialog(): void {
    this.formData = {};
    this.detail = undefined;
    this.uploadedFile = this.initUploadedFile();
    // @ts-ignore
    this.$refs.formRef.reset();
  }
  protected initUploadedFile(): TypeCategory.CategoryImage {
    return {
      id: undefined,
      key: undefined,
      size: undefined,
      mime_type: undefined,
      preview_url: undefined,
    };
  }
}
</script>

<style lang="scss" scoped>
  .upload-btn {
    display: inline-block;
  }
  .uploaded-file {
    margin-left: 12px;
    font-size: 16px;
    color: $fontColor;
  }
</style>
