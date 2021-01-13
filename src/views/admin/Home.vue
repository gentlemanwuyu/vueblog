<template>
  <v-row>
    <v-col cols="3">
      <div class="card">
        <div class="card-title">PV</div>
        <div class="card-content">
          <span class="card-content-number">{{pv}}</span>
        </div>
      </div>
    </v-col>
    <v-col cols="3">      
      <div class="card">
        <div class="card-title">UV</div>
        <div class="card-content">
          <span class="card-content-number">{{uv}}</span>
        </div>
      </div>
    </v-col>
    <v-col cols="3">
      <div class="card">
        <div class="card-title">新增评论</div>
        <div class="card-content">
          <span class="card-content-number">{{newComment}}</span>
        </div>
      </div>
    </v-col>
    <v-col cols="3">
      <div class="card">
        <div class="card-title">待回复评论</div>
        <div class="card-content">
          <span class="card-content-number">{{pendingReplyComment}}</span>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { InputValidationRules, InputValidationRule } from 'vuetify';
import { VForm } from 'vuetify/lib';
import { namespace } from 'vuex-class';

@Component({})
export default class AdminHome extends Vue {
  protected pv: number = 0;
  protected uv: number = 0;
  protected newComment: number = 0;
  protected pendingReplyComment: number = 0;
  protected mounted(): void {
    this.getHomeStatistics();
  }
  protected async getHomeStatistics(): Promise<void> {
    const { data: { pv, uv, new_comment, pending_reply_comment } } =
      await this.$api.admin.homeStatistics<TypeStatistics.HomeData>();
    this.pv = pv;
    this.uv = uv;
    this.newComment = new_comment;
    this.pendingReplyComment = pending_reply_comment;
  }
}
</script>

<style lang="scss" scoped>
  .card {
    box-shadow: $boxShadow;
    border-radius: 5px;
    &-title {
      border-bottom: 1px solid $borderColor;
      padding: $padding;
      font-size: 20px;
      font-weight: 500;
    }
    &-content {
      text-align: center;
      padding: 12px;
      &-number {
        font-size:40px;
        color: $primary;
      }
    }
  }
</style>
