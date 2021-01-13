<template>
  <div class="pt-3 pb-3">
    <v-form ref=formRef>
      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model.trim="formData.content"
            :rules="rules.content"
            outlined
            placeholder="嘿~ 大神，别默默的看了，快来点评一下吧"
            rows="3"
          />
        </v-col>
      </v-row>
      <v-row>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-0 pb-0">
          <v-text-field
            v-model.trim="formData.username"
            :rules="rules.username"
            outlined
            dense
            placeholder="*怎么称呼"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-0 pb-0">
          <v-text-field
            v-model.trim="formData.email"
            :rules="rules.email"
            outlined
            dense
            placeholder="*邮箱(放心~会保密^_^)"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 pt-0 pb-0">
          <v-text-field
            v-model.trim="formData.link"
            :rules="rules.link"
            outlined
            dense
            placeholder="https://您的主页"
          />
        </div>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="12" class="pt-0 pb-0 text-right"><v-btn color="primary" class="submit-btn" @click="handleSubmit">评论</v-btn></v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import $localStorage from '@/utils/localStorage';

@Component
export default class Comment extends Vue {
  protected formData: TypeComponentComment.FormData = this.initFormData();
  protected rules: TypeComponentComment.ValidateRule = {
    content: [
      (v: string) => !!v || '嘿，大神，请您点评一下吧^_^',
    ],
    username: [
      (v: string) => !!v || '大神，您怎么称呼？',
      (v: string) => v.length <= 255 || '大神，您的名字太长了，数据库只能存放255个字符',
    ],
    email: [
      (v: string) => !!v || '大神，您的邮箱是？',
      (v: string) => v.length <= 255 || '大神，您的邮箱太长了，数据库只能存放255个字符',
    ],
    link: [
      (v: string) => v.length <= 255 || '大神，您的主页地址太长了，数据库只能存放255个字符',
    ],
  };
  protected handleSubmit(): void {
    const formRef = this.$refs.formRef as any;
    if (formRef.validate()) {
      const res = this.$emit('submit', this.formData);
    }
  }
  protected mounted(): void {
    this.initFormData();
  }
  protected initFormData(): TypeComponentComment.FormData {
    const userInfo = $localStorage.get('userInfo') as TypeCommon.FrontUserInfo;
    if (userInfo) {
      return {
        username: userInfo.username,
        email: userInfo.email,
        link: userInfo.link,
        content: '',
      };
    }
    return {
      content: '',
      username: '',
      email: '',
      link: '',
    };
  }
}
</script>

<style lang="scss" scoped>
  // 特大屏幕
  @media (min-width: $lg) {
    
  }
  // 大屏幕
  @media (min-width: $md) and (max-width: $lg) {
    
  }
  // 中等屏幕
  @media (min-width: $sm) and (max-width: $md) {
    
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    .submit-btn {
      width: 100%;
    }
  }
  // 超小屏幕
  @media (max-width: $xs) {
    .submit-btn {
      width: 100%;
    }
  }
</style>
