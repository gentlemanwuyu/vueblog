<template>
  <v-card>
    <v-card-title class="sidebar-card-title">
      <v-icon>mdi-label-outline</v-icon>
      <span class="ml-2">标签云</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="sidebar-card-text">
      <router-link v-for="label in labelCloud" :key="label.id" :to="{name: 'Label', params: {id: label.id}}">
        <v-chip label outlined :class="{'sidebar-label-item': true, 'active-label-item': activeLabelId === label.id}">{{label.name}}</v-chip>
      </router-link>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class FrontBlogSidebarLabel extends Vue {
  protected activeLabelId?: number = undefined;
  protected labelCloud: TypeFrontLabel.LabelCloudItem[] = [];
  @Watch('$route', {immediate: true, deep: true})
  protected onRouteChange(route: Route) {
    if (route.name !== 'Label') {
      this.activeLabelId = undefined;
    } else {
      this.activeLabelId = Number(route.params.id);
    }
    this.$forceUpdate();
  }
  protected async getLabelCloud(): Promise<void> {
    const { data: {list} } = await this.$api.front.labelCloud<TypeBase.ListResult<TypeFrontLabel.LabelCloudItem[]>>();
    this.labelCloud = list;
  }
  protected created(): void {
    this.getLabelCloud();
  }
}
</script>

<style lang="scss" scoped>
  .sidebar-label-item {
    cursor: pointer;
    &:hover {
      color: $primary;
      border-color: $primary;
    }
  }
  .active-label-item {
    color: $primary;
    border-color: $primary;
  }
  // 特大屏幕
  @media (min-width: $lg) {
    .sidebar-label-item {
      margin: 8px;
    }
  }
  // 大屏幕
  @media (min-width: $md) and (max-width: $lg) {
    .sidebar-label-item {
      margin: 6px;
    }
  }
  // 中等屏幕
  @media (min-width: $sm) and (max-width: $md) {
    .sidebar-label-item {
      margin: 6px;
    }
    .sidebar-card {
      &-title, &-text {
        padding: 12px;
      }
    }
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    .sidebar-label-item {
      margin: 6px;
    }
  }
  // 超小屏幕
  @media (max-width: $xs) {
    .sidebar-label-item {
      margin: 6px;
    }
  }
</style>
