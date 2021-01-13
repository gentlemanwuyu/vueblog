<template>
    <tab-page
      v-model="activeKey"
      @change="handleTabChange"
      @close="handleEditChange"
      @command="handleCommand"
      style="z-index: 1000;"
    >
      <tab-page-item v-for="tab in tabList" :key="tab.key" :value="tab.key" :tab-title="tab.title" :closable="tab.path !== '/admin/home'" />
    </tab-page>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import TabPage from '@/components/tabPage/TabPage.vue';
import TabPageItem from '@/components/tabPage/TabPageItem.vue';
import { namespace } from 'vuex-class';
import cryptoJS from 'crypto-js';

const TabPageStore = namespace('tabPage');

@Component({
  components: {
    TabPage,
    TabPageItem,
  },
})
export default class LayoutTabPage extends Vue {
  @TabPageStore.State('list')
  protected tabList!: TypeStoreTabPage.TabItem[];
  @TabPageStore.Action('loadCache')
  protected loadTabpage!: TypeStoreTabPage.LoadCache;
  @TabPageStore.Action('remove')
  protected removeTabpage!: TypeStoreTabPage.Remove<string>;
  @TabPageStore.Action('splice')
  protected spliceTabpage!: TypeStoreTabPage.Splice;
  @TabPageStore.Action('push')
  protected pushTab!: TypeStoreTabPage.Push<any>;
  @TabPageStore.Action('getItemByKey')
  protected getTabpageItemByKey!: TypeStoreTabPage.GetItemByKey<string>;
  @TabPageStore.Action('getIndexByKey')
  protected getTabpageIndexByKey!: (key: string) => Promise<number>;
  @TabPageStore.Action('getPrevItemByKey')
  protected getPrevTabItemByKey!: TypeStoreTabPage.GetPrevItemByKey<string>;
  protected homePath: string = '/home';
  protected homeTab: TypeStoreTabPage.TabItem = {
    title: '首页',
    key: this.createKey('/admin/home'),
    path: '/admin/home',
    name: 'AdminHome',
    cache: true,
  };
  protected activeKey: string = this.homeTab.key;
  protected findTabItemByKey(key: string): TypeStoreTabPage.TabItem | null {
    for (const item of this.tabList) {
        if (item.key === key) {
            return item;
        }
    }
    return null;
  }
  protected async handleCommand(cmd: string, key: string): Promise<void> {
      const index = await this.getTabpageIndexByKey(key);
      const len = this.tabList.length;
      switch (cmd) {
          case 'closeLeft':
              this.spliceTabpage({
                  index: 1,
                  num: index - 1,
              });
              break;
          case 'closeRight':
              this.spliceTabpage({
                  index: index + 1,
                  num: len - index - 1,
              });
              break;
          case 'closeOther':
              this.spliceTabpage({
                  index: index + 1,
                  num: len - index - 1,
              });
              this.spliceTabpage({
                  index: 1,
                  num: index - 1,
              });
              break;
      }
  }
  protected handleTabChange(key: string) {
      const item = this.findTabItemByKey(key);
      const path = item ? item.path : this.homePath;
      this.activeKey = this.createKey(path);
      this.$router.push(path);
  }
  protected async handleEditChange(key: string) {
      const index = await this.removeTabpage(key);
      this.$router.push(this.tabList[index - 1].path);
  }
  @Watch('$route', {immediate: true})
  protected async onRouteChange(route: Route, oldRoute: Route) {
      if (route.meta && route.meta.title) {
          const key = this.getCurrentKey(route);
          const fullPath = route.fullPath.replace(/\/$/, '');
          let useCache: boolean = true;
          this.activeKey = key;
          const title = route.meta.title;
          const name = route.name;
          const oldKey = this.getCurrentKey(oldRoute);
          if (route.params.closeCurrent) {
              this.removeTabpage(oldKey);
          }
          if (route.params.noCache) {
              useCache = false;
          } else {
              // 未设置cache参数时，默认缓存组件
              useCache = undefined === route.meta.cache ? true : route.meta.cache;
          }
          if (!(this.tabList && this.tabList.length)) {
              this.pushTab(this.homeTab);
          }
          this.pushTab({
              key,
              title,
              path: fullPath,
              name,
              cache: useCache,
          });
          if (!useCache) {
              const timer = setTimeout(() => {
                  this.pushTab({
                      key,
                      title,
                      path: fullPath,
                      name,
                      cache: true,
                  });
                  clearTimeout(timer);
              }, 100);
          }
      }
  }
  protected getCurrentKey(route: Route): string {
      if (!route) {
          return '';
      }
      let path = route.query.useFullPath ? route.fullPath : route.path;
      path = path.replace(/\/$/, '');
      return this.createKey(path);
  }
  protected createKey(path: string): string {
      return cryptoJS.MD5(path).toString();
  }
  protected created(): void {
      this.loadTabpage();
  }
}
</script>
<style scoped lang="scss">
  
</style>
