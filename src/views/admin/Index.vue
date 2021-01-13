<template>
  <v-app>
    <layout-nav-drawer />
    <v-main>
      <v-container fluid>
        <layout-tab-page />
        <keep-alive :include="cacheRouteViewList">          
          <router-view class="pa-3 mb-15" style="margin-top: 73px;" />
        </keep-alive>
        <layout-footer />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import LayoutNavDrawer from '@/layout/navDrawer/index.vue';
import LayoutTabPage from '@/layout/tabPage/index.vue';
import LayoutFooter from '@/layout/footer/Index.vue';

@Component({
  components: {
    LayoutNavDrawer,
    LayoutTabPage,
    LayoutFooter,
  },
})
export default class AdminIndex extends Vue {
  protected get cacheRouteViewList() {
    let tabList = this.$store.state.tabPage.list;
    tabList = tabList.filter((item: TypeStoreTabPage.TabItem) => {
      return item.cache;
    });
    return tabList instanceof Array ? tabList.map((item: TypeStoreTabPage.TabItem) => {
      return item.name;
    }) : [];
  }
}
</script>

<style lang="scss" scoped>
  .tab-page-container {
    height: 73px;
    position: fixed;
    top: 0;
    left: 56px;
    right: 0;
    background: #fff;
  }
</style>
