<template>
  <v-dialog
    v-model="visible"
    dark
    :persistent="persistent"
    :max-width="maxWidth"
    @click:outside="handleClickOutide"
    class="dialog"
  >
    <div class="dialog-container">
      <img :src="url" class="img">
    </div>
  </v-dialog>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Preview extends Vue {
  @Prop({type: String, default: ''})
  protected url!: string;
  @Prop({type: Boolean, default: false})
  protected persistent!: boolean;
  @Prop({type: Number, default: 600})
  protected maxWidth!: number;
  protected visible: boolean = true;
  protected handleClickOutide(e: Event) {
    for (const child of this.$children) {
      // @ts-ignore
      child.$refs.content.remove();
    }
    this.$destroy();
  }
}

</script>
<style lang='scss' scoped>
.dialog {
  box-shadow: $boxShadow;
}
.dialog-container {
  position: relative;
  width: 100%;
  background: #fff;
}
.img {
  display: block;
  width: 100%;
  max-height: 100%;
}
</style>
