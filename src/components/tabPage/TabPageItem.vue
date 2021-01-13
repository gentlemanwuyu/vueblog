<template>
  <li class="tab-page-item pl-3 pr-3" 
    :class="{active: this.active}"
    @click="handleClick"
    @contextmenu.prevent="handleRightClick"
  >
    <span>{{tabTitle}}</span>
    <v-icon class="tab-page-item-close ml-1" v-if="closable" @click.stop="handleClose">mdi-close</v-icon>
  </li>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class TabPageItem extends Vue {
  public componentName: string = 'TabPageItem';
  @Prop({type: String, required: true, default: ''})
  public value!: string;
  @Prop({type: Boolean, default: true})
  public closable!: boolean;
  public active: boolean = true;
  @Prop({type: String, default: ''})
  protected tabTitle!: string;
  protected showClose: boolean = false;
  protected handleClick(): void {
    this.$util.dispatch(this, 'TabPage', 'TabPageItem.click', [this]);
    this.$emit('click', this.value);
  }
  protected handleClose(): void {
    this.$util.dispatch(this, 'TabPage', 'TabPageItem.close', [this]);
    this.$destroy();
  }
  protected handleRightClick(e: Event): void {
    this.$util.dispatch(this, 'TabPage', 'TabPageItem.rightClick', [this, e]);
  }
  protected created(): void {
    this.$util.dispatch(this, 'TabPage', 'TabPageItem.created', [this]);
  }
  protected beforeDestroy(): void {
    this.$util.dispatch(this, 'TabPage', 'TabPageItem.beforeDestroy', [this]);
  }
}
</script>
<style scoped lang="scss">
  .tab-page {
  &-item {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    line-height: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.2s;
    &-close {
      font-size: inherit;
    }
    &-close:hover {
      background: #ff5252;
      border-radius: 100%;
    }
  }
  &-item.active:after {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    width: 100%;
    height: 41px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.12);
    border-bottom-color: #fff;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
    pointer-events: none;
  }
}
</style>