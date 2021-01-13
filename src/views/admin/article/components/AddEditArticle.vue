<template>
  <div>
    <div class="page-title">{{title}}</div>
    <v-form ref="formRef">
      <v-row>
        <v-col cols="6">
          <v-text-field :rules="rules.title" outlined v-model="formData.title" label="标题" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <tag-input :rules="rules.keyword_list" outlined label="关键词" v-model="formData.keyword_list"></tag-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <tree-select :rules="rules.category_id" outlined label="分类" :items="categoryTree" v-model="formData.category_id"></tree-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            outlined
            v-model="formData.label_list"
            :rules="rules.label_list"
            :items="allLabel"
            item-text="name"
            item-value="id"
            chips
            small-chips
            deletable-chips
            label="标签"
            multiple
          >
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea :rules="rules.summary" v-model="formData.summary" outlined label="摘要"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <mavon-editor
            ref="mavonEditor"
            v-model.trim="formData.content"
            @imgAdd="handleImgAdd"
            placeholder="文章内容"
            style="min-height: 600px; z-index: 999;"
          >
          </mavon-editor>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" class="mr-3" @click="handleSubmit">提交</v-btn>
          <v-btn @click="handleReset">重置</v-btn>
        </v-col>
      </v-row>
    </v-form>  
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import TagInput from '@/components/tagInput/TagInput.vue';
import TreeSelect from '@/components/treeSelect/TreeSelect.vue';

@Component({
  components: {
    TagInput,
    TreeSelect,
  },
})
export default class AdminAddEditArticle extends Vue {
  @Prop({ type: String, default: 'add' })
  protected type!: string;
  protected title: string = this.$route.meta.title;
  // 所有标签
  protected allLabel: TypeLabel.LabelAllItem[] = [];
  protected categoryTree: TypeCategory.CategoryTreeItem[] = [];
  protected formData: TypeArticle.FormData = {
    id: undefined,
    title: '',
    label_list: [],
    keyword_list: [],
    category_id: undefined,
    content: '',
    summary: '',
  };
  protected rules: TypeArticle.ValidateRule = {
    title: [
      (v: string) => !!v || '请输入标题',
      (v: string) => v.length < 255 || '标题不能超过255个字符',
    ],
    label_list: [
      (arr: number[]) => arr.length > 0 || '请选择标签',
    ],
    keyword_list: [
      (arr: string[]) => arr.length > 0 || '请输入关键词',
      (arr: string[]) => {
        for (const val of arr) {
          if (val.length > 255) {
            return '关键词长度不能超过255个字符';
          }
        }
        return true;
      },
    ],
    category_id: [
      (v: string) => !!v || '请选择分类',
    ],
    content: [
      (v: string) => !!v || '请输入内容',
    ],
    summary: [
      (v: string) => !!v || '请输入概要',
    ],
  };
  protected created(): void {
    this.getAllLabel();
    this.getCategoryTree();
  }
  protected activated() {
    if (this.$route.query.id && this.formData.id) {
      const newId = Number(this.$route.query.id);
      if (newId !== this.formData.id) {
        this.getArticleDetail(newId);
      }
    }
  }
  protected mounted() {
    if (this.type === 'edit') {
      const id = Number(this.$route.query.id);
      this.getArticleDetail(id);
    } else {
      this.formData = this.initFormData();
    }
  }
  protected async getAllLabel(): Promise<void> {
    const { data: { list } } = await this.$api.admin.allLabel<TypeBase.ListResult<TypeLabel.LabelAllItem[]>>();
    this.allLabel = list;
  }
  protected async getCategoryTree(): Promise<void> {
    const { data } = await this.$api.admin.categoryTree<TypeCategory.CategoryTreeItem[]>();
    this.categoryTree = data;
  }
  protected async getArticleDetail(id: number): Promise<void> {
    const { data } = await this.$api.admin.getArticleDetail<TypeArticle.Detail>({id});
    const labelIdList = data.label_list.map((item) => item.id);
    this.formData.id = id;
    this.formData.title = data.title;
    this.formData.label_list = labelIdList;
    this.formData.keyword_list = data.keyword_list;
    this.formData.category_id = data.category_id;
    this.formData.content = data.content;
    this.formData.summary = data.summary;
    this.$forceUpdate();
  }
  protected initFormData(): TypeArticle.FormData {
    return {
      id: undefined,
      title: '',
      label_list: [],
      keyword_list: [],
      category_id: undefined,
      content: '',
      summary: '',
    };
  }
  protected async handleSubmit(): Promise<void> {
    const formRef = this.$refs.formRef as any;
    if (formRef.validate() && this.formData.content) {
      await this.$api.admin.addArticle(this.formData);
      this.$router.push({
        name: 'AdminArticle',
        params: {
          noCache: '1',
          closeCurrent: '1',
        },
      });
    }
  }
  protected handleReset(): void {
    this.formData = this.initFormData();
  }
  protected async handleImgAdd(filename: string, imgFile: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', imgFile);
    const {data} = await this.$api.admin.uploadArticleImage<TypeQiniu.QiniuUploadResp>(formData);
    const mavonEditor = this.$refs.mavonEditor;
    // @ts-ignore
    mavonEditor.$img2Url(filename, data.preview_url);
  }
}
</script>

<style lang="scss" scoped>
  
</style>
