<template>
  <v-tooltip v-if="content && content.length" top>
    <template v-slot:activator="{ on }">
      <div v-on="on" class="one-line" :style="`width: ${width}px;`">{{content}}</div>
    </template>
    <span>{{content}}</span>
  </v-tooltip>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ShortDisplay extends Vue {
  @Prop({type: Number, default: 100})
  protected width!: number;
  @Prop({type: String, default: ''})
  protected content!: string;
}

</script>
<style lang='scss' scoped>

</style>
