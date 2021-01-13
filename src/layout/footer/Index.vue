<template>  
  <v-footer fixed class="font-weight-medium">
    <v-col class="text-center" cols="12">
      Copyright&nbsp;&copy;&nbsp;2018~{{fullYear}}&nbsp;
      <a href="/" target="_blank"><strong>Woozee</strong></a>
    </v-col>
  </v-footer>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class LayoutFooter extends Vue {
  protected fullYear = new Date().getFullYear();
}
</script>

<style scoped lang="scss">
  a {
    text-decoration-line: none;
  }
</style>
