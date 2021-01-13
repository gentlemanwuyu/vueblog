<template>  
  <v-navigation-drawer permanent expand-on-hover app style="z-index: 1001;">
    <v-list>
      <v-list-item class="px-2" :to="{name: 'AdminHome'}">
        <v-list-item-avatar>
          <v-img src="/favicon.ico"></v-img>
        </v-list-item-avatar>            
        <v-list-item-title>Blog Admin</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list nav dense>
      <template v-for="(menu, index) in menuList">
        <v-list-item v-if="!menu.children || !menu.children.length" link :key="index" :to="menu.route">
          <v-list-item-icon>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{menu.title}}</v-list-item-title>
        </v-list-item>
        <v-list-group v-else :key="index" :prepend-icon="menu.icon" no-action>
          <template v-slot:activator>
            <v-list-item-title>{{menu.title}}</v-list-item-title>
          </template>
          <v-list-item v-for="(subMenu, subIndex) in menu.children" :key="subIndex" :to="subMenu.route" link>
            <v-list-item-title v-text="subMenu.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class LayoutNavDrawer extends Vue {
  // 菜单
  protected menuList: TypeCommon.MenuItem[] = [];
  protected async getMenuList(): Promise<void> {
    const { data: { list } } = await this.$api.menu.list<TypeBase.ListResult<TypeCommon.MenuItem[]>>();
    this.menuList = list;
  }
  protected created(): void {
    this.getMenuList();
  }
}
</script>

<style scoped lang="scss">

</style>
