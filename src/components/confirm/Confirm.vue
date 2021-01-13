<template>
  <v-dialog v-model="dialog" :max-width="maxWidth">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text style="font-size: 16px; padding: 16px 24px;">{{content}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="handleConfirm">确认</v-btn>
        <v-btn color="darken-1" text @click="dialog = false">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Confirm extends Vue {
  protected dialog: boolean = true;
  @Prop({type: Number})
  protected maxWidth: number = 300;
  @Prop({type: String})
  protected title: string = '请确认';
  @Prop({type: String})
  protected content: string = '确定要删除这条记录吗?';
  // 从外面传进来的方法
  protected onConfirm?: () => void;
  protected handleConfirm(): void {
    this.dialog = false;
    if (typeof this.onConfirm === 'function') {
      this.onConfirm();
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
