<template>
  <footer class="footer">
    <v-row>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 copyright">Copyright © {{this.startYear}}~{{this.nowYear}} <a href="/admin" target="_blank"  rel="external nofollow">Woozee</a></div>
      <div v-if="icp" class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 icp">
        <a href="http://beian.miit.gov.cn" rel="external nofollow" target="_blank">备案号：{{icp}}</a>
      </div>
    </v-row>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FrontFooter extends Vue {
  @Prop({type: String, default: ''})
  protected icp!: string;
  protected startYear: number = 2019;
  protected nowYear: number = 0;
  protected created(): void {
    this.nowYear = new Date().getFullYear();
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    background: #fff;
    text-align: center;
    box-shadow: 0 3px 10px 0 rgba(32, 33, 36, 0.28);
  }
  .icp a {
    color: $fontColor;
    &:hover {
      color: $primary;
    }
  }
  .copyright a {
    color: $fontColor;
  }
  // 特大屏幕
  @media (min-width: $lg) {
    .icp {
      text-align: left;
    }
    .copyright {
      text-align: right;
    }
  }
  // 大屏幕
  @media (min-width: $md) and (max-width: $lg) {
    .icp {
      text-align: left;
    }
    .copyright {
      text-align: right;
    }
  }
  // 中等屏幕
  @media (min-width: $sm) and (max-width: $md) {
    .icp {
      text-align: left;
    }
    .copyright {
      text-align: right;
    }
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    .icp {
      display: none;
    }
  }
  // 超小屏幕
  @media (max-width: $xs) {
    .icp {
      display: none;
    }
  }
</style>
