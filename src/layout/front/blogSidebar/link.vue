<template>
  <v-card>
    <v-card-title>
      <v-icon>mdi-link</v-icon>
      <span class="ml-2">友情链接</span>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-row>
        <a v-for="(friendlink, index) in friendlinkList"
          :key="index"
          :href="friendlink.link"
          target="_blank"
          rel="external nofollow"
          class="col-xs-6 col-sm-4 col-md-6 col-lg-6 col-xl-6 link-item-container"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <div v-on="on" class="link-item">{{friendlink.name}}</div>
            </template>
            <span>{{friendlink.desc}}</span>
          </v-tooltip>          
        </a>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class FrontBlogSidebarLink extends Vue {
  protected friendlinkList: TypeFrontFriendlink.FriendlinkItem[] = [];
  protected async getFriendlinkList(): Promise<void> {
    const {data: {list}} = await this.$api.front.friendlinkList<
      TypeBase.ListResult<TypeFrontFriendlink.FriendlinkItem[]>
    >();
    this.friendlinkList = list;
  }
  protected created() {
    this.getFriendlinkList();
  }
}
</script>

<style lang="scss" scoped>
  .link-item-container {
    padding: 0;
    display: block;
    color: inherit;
  }
  .link-item {
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    height: 46px;
    font-size: 14px;
    line-height: 22px;
    transition: all .5s ease 0s;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      right: 50%;
      height: 0;
      background: $primary;
      transition: all .5s ease 0s;
    }
    &:hover {
      color: $primary;
      &::after {
        left: 12px;
        right: 12px;
        height: 2px;
      }
    }
  }
  // 特大屏幕
  @media (min-width: $lg) {
    .link-item {
      text-align: center;
      padding: 12px;
    }
  }
  // 大屏幕
  @media (min-width: $md) and (max-width: $lg) {
    .link-item {
      text-align: center;
      padding: 12px;
    }
  }
  // 中等屏幕
  @media (min-width: $sm) and (max-width: $md) {
    .link-item {
      text-align: center;
      padding: 12px;
    }
    .sidebar-card {
      &-title, &-text {
        padding: 12px;
      }
    }
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    .link-item {
      text-align: center;
      padding: 12px;
    }
  }
  // 超小屏幕
  @media (max-width: $xs) {
    .link-item {
      text-align: center;
      padding: 12px;
    }
  }
</style>
