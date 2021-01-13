<template>
  <div v-if="loading" class="loading">
    <div class="loading-box">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({type: Boolean, default: false})
  protected loading!: boolean;
}
</script>
<style scoped lang="scss">
 .loading {
   text-align: center;
   position: fixed;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   z-index: 9999;
   display: flex;
   justify-content: center;
   &-box {
     align-self: center;
   }
 }
</style>