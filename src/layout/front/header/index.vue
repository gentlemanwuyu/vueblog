<template>
  <header class="header">
    <v-container class="header-container">
      <router-link class="header-title" :to="{name: 'Home'}">{{blogName}}</router-link>
      <front-header-nav class="header-nav">
        <router-link :to="{name: 'Home'}"><front-header-nav-item :active="$route.name === 'Home'" class="header-nav-item">首页</front-header-nav-item></router-link>
        <router-link :to="{name: 'IT'}"><front-header-nav-item :active="$route.name === 'IT'" class="header-nav-item">IT技术</front-header-nav-item></router-link>
        <router-link :to="{name: 'About'}"><front-header-nav-item :active="$route.name === 'About'" class="header-nav-item">关于</front-header-nav-item></router-link>
      </front-header-nav>
      <v-app-bar-nav-icon class="header-nav-icon" color="primary" @click="handleNavIconClick"></v-app-bar-nav-icon>
    </v-container>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FrontHeaderNav from '@/layout/front/header/components/nav/Nav.vue';
import FrontHeaderNavItem from '@/layout/front/header/components/nav/NavItem.vue';

@Component({
  components: {
    FrontHeaderNav,
    FrontHeaderNavItem,
  },
})
export default class FrontHeader extends Vue {
  @Prop({type: String, default: '吴宇博客'})
  protected blogName!: string;
  protected handleNavIconClick(): void {
    const drawer = this.$store.state.drawer;
    this.$store.dispatch('setDrawer', !drawer);
  }
}
</script>

<style lang="scss" scoped>
  $height: 60px;
  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: $height;
    background: #fff;
    z-index: 1001;
    box-shadow: 0 -2px 10px 0 rgba(32, 33, 36, 0.28);
    &-container {
      padding-top: 0;
      padding-bottom: 0;
      height: $height;
      line-height: $height;
    }
    &-title {
      font-size: 20px;
      &:hover {
        color: $primary;
      }
    }
    &-nav {
      float: right;
      height: $height;
      line-height: $height;
      &-item {
        margin-left: 12px;
      }
    }
    & a {
      color: $fontColor;
    }
    .header-nav-icon {
      position: absolute;
      right: 12px;
      height: 50%;
      transform: translateY(50%);
    }
  }
  // 特大屏幕
  @media (min-width: $lg) {
    .header-nav-icon {
      display: none;
    }
  }
  // 大屏幕
  @media (min-width: $md) and (max-width: $lg) {
    .header-nav-icon {
      display: none;
    }
  }
  // 中等屏幕
  @media (min-width: $sm) and (max-width: $md) {
    .header-nav-icon {
      display: none;
    }
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    .header-nav {
      display: none;
    }
    .header-container {
      text-align: center;
    }
  }
  // 超小屏幕
  @media (max-width: $xs) {
    .header-nav {
      display: none;
    }
    .header-container {
      text-align: center;
    }
  }
</style>
