<template>
  <div>
    <div class="page-title">{{title}}</div>
    <v-form ref="formRef">
      <v-row>
        <v-col cols="6">
          <v-text-field outlined v-model="formData.name" label="博客名" :rules="rules.name" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field outlined v-model="formData.address" label="博客地址" :rules="rules.address" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field outlined v-model="formData.email" label="博主邮箱" :rules="rules.email" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field outlined v-model="formData.title" label="博客标题" :rules="rules.title" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <tag-input outlined label="关键词" v-model="formData.keyword_list" :rules="rules.keyword_list"></tag-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea outlined label="描述" v-model="formData.desc" :rules="rules.desc"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field outlined v-model="formData.icp" label="ICP备案号" :rules="rules.icp" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <mavon-editor
            ref="mavonEditor"
            v-model="formData.about"
            placeholder="关于"
            :rules="rules.about"
            @imgAdd="handleImgAdd"
            style="min-height: 600px; z-index: 999;"
          >
          </mavon-editor>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" class="mr-3" @click="handleSubmit">提交</v-btn>
        <v-btn @click="handleReset">重置</v-btn>
      </v-col>
    </v-row>    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import TagInput from '@/components/tagInput/TagInput.vue';

@Component({
  components: {
    TagInput,
  },
})
export default class AdminSystemConfig extends Vue {
  protected title: string = this.$route.meta.title;
  protected formData: TypeSystem.ConfigFormData = {
    name: '',
    address: '',
    email: '',
    title: '',
    keyword_list: [],
    desc: '',
    about: '',
    icp: '',
  };
  // 表单校验规则
  protected rules: TypeSystem.ValidateRule = {
    name: [(v: string) => !!v || '请输入博客名'],
    address: [(v: string) => !!v || '请输入博客地址'],
    email: [(v: string) => !!v || '请输入博主邮箱'],
    title: [(v: string) => !!v || '请输入博客标题'],
    keyword_list: [(v: string) => !!v || '请输入关键词'],
    desc: [(v: string) => !!v || '请输入描述'],
    about: [(v: string) => !!v || '请输入关于'],
    icp: [(v: string) => !!v || '请输入ICP备案号'],
  };
  protected mounted() {
    this.getSystemConfig();
  }
  protected async getSystemConfig(): Promise<void> {
    const { data } = await this.$api.admin.systemConfig<TypeSystem.ConfigData>();
    this.$set(this.formData, 'name', data.name);
    this.$set(this.formData, 'address', data.address);
    this.$set(this.formData, 'email', data.email);
    this.$set(this.formData, 'title', data.title);
    this.$set(this.formData, 'keyword_list', data.keyword_list);
    this.$set(this.formData, 'desc', data.desc);
    this.$set(this.formData, 'about', data.about);
    this.$set(this.formData, 'icp', data.icp);
  }
  protected initFormData(): TypeSystem.ConfigFormData {
    return {
      name: '',
      address: '',
      email: '',
      title: '',
      keyword_list: [],
      desc: '',
      about: '',
      icp: '',
    };
  }
  protected async handleSubmit(): Promise<void> {
    const formRef = this.$refs.formRef as any;
    if (formRef.validate()) {
      await this.$api.admin.saveSystemConfig(this.formData);
    }
  }
  protected handleReset(): void {
    this.formData = this.initFormData();
  }
  protected async handleImgAdd(filename: string, imgFile: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', imgFile);
    const {data} = await this.$api.admin.uploadAboutImage<TypeQiniu.QiniuUploadResp>(formData);
    const mavonEditor = this.$refs.mavonEditor;
    // @ts-ignore
    mavonEditor.$img2Url(filename, data.preview_url);
  }
}
</script>

<style lang="scss" scoped>
  
</style>
