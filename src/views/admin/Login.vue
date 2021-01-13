<template>
  <v-container fluid>
    <div class="ml-auto mr-auto blog-login-box">
      <v-card class="pa-5" :elevation="10">
        <p class="text-h5 text-center">博客后台登录</p>
        <v-form v-model="valid" ref="formRef">
          <v-text-field
            v-model="formData.username"
            :rules="rules.username"
            label="用户名"
            class="mb-5"
            @keyup.enter="handleSubmit"
          ></v-text-field>
          <v-text-field
            :type="isShowedPassword ? 'text' : 'password'"
            v-model="formData.password"
            :append-icon="isShowedPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
            label="密码"
            class="mb-5"
            @click:append="isShowedPassword = !isShowedPassword"
            @keyup.enter="handleSubmit"
          ></v-text-field>
          <v-text-field v-model="formData.captcha" :rules="rules.captcha" label="验证码" class="mb-5" @keyup.enter="handleSubmit">
            <div slot="append">
              <img
                :src="captchaUrl"
                class="pb-2"
                alt="验证码"
                style="width: 100%; height: 100%; cursor: pointer;"
                @click="handleRefreshCaptcha"
              />
            </div>
          </v-text-field>
          <v-btn depressed color="primary" @click="handleSubmit" style="width: 100%;">登入</v-btn>
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { InputValidationRules, InputValidationRule } from 'vuetify';
import { VForm } from 'vuetify/lib';
import { namespace } from 'vuex-class';

const User = namespace('user');

@Component({})
export default class AdminLogin extends Vue {
  protected valid: boolean = false;
  // 验证码链接
  protected captchaUrl: string = '';
  // 是否显示密码
  protected isShowedPassword: boolean = false;
  // 表单数据
  protected formData: TypeLogin.FormData = {};
  // 表单校验规则
  protected rules: TypeLogin.ValidateRule = {
    username: [(v: string) => !!v || '请输入用户名'],
    password: [(v: string) => !!v || '请输入密码'],
    captcha: [(v: string) => !!v || '请输入验证码'],
  };
  @User.Action('initUserMsg') protected initUserMsg!: (successCallback?: () => void) => Promise<void>;
  protected created(): void {
    this.captchaUrl = this.$config.captchaUrl;
    this.formData = this.getInitFormData();
  }
  protected getInitFormData(): TypeLogin.FormData {
    return {
      username: '',
      password: '',
      captcha: '',
    };
  }
  // 刷新验证码
  protected handleRefreshCaptcha(): void {
    this.captchaUrl = this.getCaptchaUrl();
  }
  // 获取验证码
  protected getCaptchaUrl(): string {
    return `${this.$config.captchaUrl}?t=${new Date().getTime()}`;
  }
  // 提交
  protected async handleSubmit(): Promise<void> {
    const formRef = this.$refs.formRef as any;
    if (formRef.validate()) {
      const loginSuccess = await this.login();
      if (loginSuccess) {
        this.$message.success('登录成功');
        this.initUserMsg(() => {
          this.$router.push('/admin');
        });
      }
    }
  }
  // 登入
  protected async login(): Promise<boolean> {
    try {
      const res = await this.$api.admin.login<null>(this.formData);
      return true;
    } catch (e) {
      this.handleRefreshCaptcha();
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-login-box {
  width: 400px;
  margin-top: 150px;
}
</style>
