<template>
  <v-card>
    <v-card-title class="sidebar-card-title">
      <v-icon>mdi-bullseye-arrow</v-icon>
      <span class="ml-2">文章分类</span>
    </v-card-title>
    <v-divider />
    <v-card-text class="sidebar-card-text">
      <v-list nav>
        <template v-for="(item, index) in tree">
          <v-list-item
            v-if="!item.children || !item.children.length"
            :key="index"
            :to="{name: 'Category', params: {id: item.id}}"
            link
          >
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item>
          <v-list-group v-else :key="index" :value="item.active" no-action>
            <template v-slot:activator>
              <v-list-item-title>{{item.name}}</v-list-item-title>
            </template>
            <v-list-item
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex" link :to="{name: 'Category', params: {id: subItem.id}}"
            >
              <v-list-item-title v-text="subItem.name"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';

@Component
export default class FrontBlogSidebarCategory extends Vue {
  protected tree: TypeFrontCategory.CategoryTreeItem[] = [];
  protected created(): void {
    this.getCategoryTree();
  }
  protected async getCategoryTree(): Promise<void> {
    const { data } = await this.$api.front.categoryTree<TypeFrontCategory.CategoryTreeItem[]>();
    if ('Category' === this.$route.name) {
      const activeId = Number(this.$route.params.id);
      for (const cat1 of data) {
        if (cat1.id === activeId) {
          cat1.active = true;
        } else if (cat1.children && cat1.children.length) {
          for (const cat2 of cat1.children) {
            if (cat2.id === activeId) {
              cat2.active = true;
              cat1.active = true;
              continue;
            }
          }
        }
      }
    }
    this.tree = data;
  }
}
</script>

<style lang="scss" scoped>
  .v-list .v-list-item--active {
    color: $primary;
  }
  // 特大屏幕
  @media (min-width: $lg) {
    
  }
  // 大屏幕
  @media (min-width: $md) and (max-width: $lg) {
    
  }
  // 中等屏幕
  @media (min-width: $sm) and (max-width: $md) {
    .sidebar-card {
      &-title, &-text {
        padding: 12px;
      }
    }
  }
  // 小屏幕
  @media (min-width: $xs) and (max-width: $sm) {
    
  }
  // 超小屏幕
  @media (max-width: $xs) {
    
  }
</style>
