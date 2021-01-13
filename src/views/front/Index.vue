<template>
  <v-container class="front-container">    
    <front-header :blog-name="$store.state.systemConfig.name"></front-header>
    <front-drawer class="front-drawer"></front-drawer>
    <v-main class="front-main">
      <router-view></router-view>
    </v-main>
    <front-footer class="front-footer" :icp="$store.state.systemConfig.icp"></front-footer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import FrontHeader from '@/layout/front/header/index.vue';
import FrontFooter from '@/layout/front/footer/index.vue';
import FrontDrawer from '@/layout/front/drawer/index.vue';
import localStorage from '@/utils/localStorage';

@Component({
  components: {
    FrontHeader,
    FrontFooter,
    FrontDrawer,
  },
})
export default class Index extends Vue {
  protected created(): void {
    this.$store.dispatch('systemConfig/initSystemConfig');
    this.$metaInfo({
      title: this.$store.state.systemConfig.title,
      description: this.$store.state.systemConfig.desc,
      keywords: this.$store.state.systemConfig.keyword_list.join(','),
    });
  }
}
</script>

<style lang="scss" scoped>
  .front-container {
    position: relative;
  }
  .front-main {
    margin-top: 60px;
    margin-bottom: 48px;
  }
  .front-drawer {
    top: 60px!important;
    bottom: 48px!important;
    height: auto!important;
  }
  .front-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
  }
</style>
