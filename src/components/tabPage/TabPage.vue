<template>
  <div class="tab-page-container">
    <ul class="tab-page">
      <slot />
    </ul>
    <ul class="tab-op-menu" :class="{show: showMenu}" :style="{top: positionStyle.top + 'px', left: positionStyle.left + 'px'}">
      <li v-for="(item, index) in opList" :key="index" class="tab-op-menu-item" @click="handleCommand(item.key)">{{item.title}}</li>
    </ul>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import TabPageItem from './TabPageItem.vue';

@Component({
  components: {
    TabPageItem,
  },
})
export default class TabPage extends Vue {
  public componentName: string = 'TabPage';
  @Prop({type: [String, Number], default: ''})
  protected value!: string | number;
  @Prop({type: Boolean, default: null})
  protected closable!: boolean;
  protected opItem!: TabPageItem;
  protected items: TabPageItem[] = [];
  protected showMenu: boolean = false;
  protected positionStyle: TypeComponentTabPage.PositionStyle = {top: 0, left: 0};
  protected opList: TypeComponentTabPage.OpMenuItem[] = [
    {key: 'closeLeft', title: '关闭左边标签页'},
    {key: 'closeRight', title: '关闭右边标签页'},
    {key: 'closeOther', title: '关闭其他标签页'},
  ];
  @Watch('value', {immediate: true})
  protected onValueChange(value: string | number): void {
    this.setActiveStatus(value);
  }
  @Watch('closable', {immediate: true})
  protected onClosableChange(value: boolean|null): void {
    if (value !== null) {
      this.items.forEach((item: TabPageItem) => {
        if (item.closable === null) {
          item.closable = value;
        }
      });
    }
  }
  protected setActiveStatus(value: string | number): void {
    let tabPageItem!: TabPageItem;
    this.items.forEach((item: TabPageItem) => {
      item.active = false;
      if (item.value === value) {
        tabPageItem = item;
      }
    });
    if (typeof tabPageItem !== 'undefined') {
      tabPageItem.active = true;
    }
  }
  protected closeItem(item: TabPageItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
  protected handleCommand(cmd: string): void {
    this.$emit('command', cmd, this.opItem.value);
  }
  protected created(): void {
    this.$on('TabPageItem.click' , (item: TabPageItem) => {
      this.setActiveStatus(item.value);
      // this.$emit('input', item.value);
      this.$emit('change', item.value, item);
    });
    this.$on('TabPageItem.created' , (item: TabPageItem) => {
      this.items.push(item);
      this.setActiveStatus(this.value);
    });
    this.$on('TabPageItem.beforeDestroy' , (item: TabPageItem) => {
      this.closeItem(item);
    });
    this.$on('TabPageItem.close', (item: TabPageItem) => {
      this.$emit('close', item.value);
    });
    this.$on('TabPageItem.rightClick', (item: TabPageItem, e: MouseEvent) => {
      this.opItem = item;
      this.positionStyle = {
        top: e.clientY,
        left: e.clientX,
      };
      this.showMenu = true;
    });
  }
  protected mounted(): void {
    document.addEventListener('click', () => {
      this.showMenu = false;
    });
  }
}
</script>
<style scoped lang="scss">
  .tab-page-container {
    position: relative;
  }
  .tab-page {
    padding: 0;
    position: absolute;
    bottom: 0;
    height: auto;
    width: 100%;
    padding: 12px 12px 0 12px;
    border-style: solid;
    border-color: $borderColor;
    border-width: 0 0 1px 0;
    white-space: nowrap;    
  }
  .tab-op-menu {
    padding: 8px;
    position: fixed;
    border: 1px solid $borderColor;
    border-radius: $borderRadius;
    visibility: hidden;
    background: $backgroundColor;
    z-index: 101;
    &-item {
      padding: 5px 15px;
      cursor: pointer;
      white-space: nowrap;
    }
    &-item:hover {
      background: $hoverBackgroundColor;
      border-radius: $borderRadius;
    }
  }
  .tab-op-menu.show {
    visibility: visible;
  }
</style>