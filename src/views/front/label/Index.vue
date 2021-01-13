<template>
  <v-row>
    <label-content class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 content" />
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 sidebar">
      <front-blog-sidebar-hot class="mb-4 mt-4" />
      <front-blog-sidebar-category class="mb-4 mt-4" />
      <front-blog-sidebar-label class="mb-4 mt-4" />
      <front-blog-sidebar-link class="mb-4 mt-4" />
    </div>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import FrontBlogSidebarHot from '@/layout/front/blogSidebar/hot.vue';
import FrontBlogSidebarLabel from '@/layout/front/blogSidebar/label.vue';
import FrontBlogSidebarLink from '@/layout/front/blogSidebar/link.vue';
import FrontBlogSidebarCategory from '@/layout/front/blogSidebar/category.vue';
import LabelContent from './components/content.vue';

@Component({
  components: {
    FrontBlogSidebarHot,
    FrontBlogSidebarLabel,
    FrontBlogSidebarLink,
    FrontBlogSidebarCategory,
    LabelContent,
  },
})
export default class Label extends Vue {
}
</script>

<style lang="scss" scoped>
  // 大屏幕
  @media (min-width: 960px) {
    .content {
      padding: 12px;
    }
    .sidebar {
      padding: 12px;
    }
  }
  // 中等屏幕
  @media (min-width: 600px) and (max-width: 960px) {
    .content {
      padding: 12px;
    }
    .sidebar {
      padding: 12px;
    }
  }
  // 小屏幕
  @media (max-width: 600px) {
    .content {
      padding: 12px;
    }
    .sidebar {
      padding: 12px;
    }
  }
</style>
