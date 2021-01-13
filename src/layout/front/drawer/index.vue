<template>
  <v-navigation-drawer v-model="drawer" absolute temporary @input="handleInput">
    <v-list nav dense>
      <v-list-item :to="{name: 'Home'}">
        <v-list-item-title>首页</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{name: 'IT'}">
        <v-list-item-title>IT技术</v-list-item-title>
      </v-list-item>
      <v-list-item :to="{name: 'About'}">
        <v-list-item-title>关于</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';

@Component
export default class FrontDrawer extends Vue {
  protected drawer: boolean = false;
  protected created() {
    this.drawer = this.$store.state.drawer;
  }
  @Watch('$store.state.drawer', {immediate: true})
  protected onDrawerChange(drawer: boolean): void {
    this.drawer = drawer;
  }
  protected handleInput(drawer: boolean): void {
    this.$store.dispatch('setDrawer', drawer);
  }
}
</script>

<style lang="scss" scoped>

</style>
