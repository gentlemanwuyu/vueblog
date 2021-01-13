<template>
  <div class="tree-select-container">
    <v-text-field
      v-model="selectedName"
      :outlined="outlined"
      ref="input"
      :label="label"
      :placeholder="placeholder"
      :append-icon="selectIcon"
      autocomplete="off"
      :rules="rules"
      @click="handleClick"
      @input="handleSearch"
    >
    </v-text-field>
    <div v-show="isShow" ref="treeViewRef" class="tree-view-container">
      <v-treeview
        :open="openList"
        :active="activeList"
        rounded
        hoverable
        activatable
        open-on-click
        :items="dataList"
        @update:active="handleActive"
        class="tree-view"
      ></v-treeview>
      <div class="none-data-text pa-4" v-if="!dataList || !dataList.length">No data available</div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop, Model } from 'vue-property-decorator';
import { InputValidationRules } from 'vuetify';

@Component
export default class TreeSelect extends Vue {
  @Model('change', {type: Number})
  protected value!: number;
  @Prop({type: String, default: ''})
  protected placeholder!: string;
  @Prop({type: String, default: ''})
  protected label!: string;
  @Prop({type: Boolean, default: false})
  protected outlined!: boolean;
  @Prop({type: Array})
  protected items!: TypeComponentTreeSelect.TreeItem[];
  @Prop({type: Array, default: () => []})
  protected rules!: InputValidationRules;
  // 树状菜单是否显示
  protected isShow: boolean = false;
  protected selectedName: string = '';
  protected selectIcon: string = 'mdi-menu-down';
  protected dataList: TypeComponentTreeSelect.TreeItem[] = [];
  protected activeList: number[] | string[] = [];
  protected openList: number[] = [];
  @Watch('value')
  protected onValueChange(value: number): void {
    this.flushData();
  }
  @Watch('items', {immediate: true})
  protected onItemsChange(items: any) {
    this.dataList = items;
    this.flushData();
  }
  @Watch('isShow', {immediate: true})
  protected onIsShowChange(isShow: boolean): void {
    if (isShow) {
      this.selectIcon = 'mdi-menu-up';
    } else {
      this.selectIcon = 'mdi-menu-down';
    }
  }
  protected handleClick(e: Event): void {
    this.isShow = true;
    e.stopPropagation();
  }
  protected handleActive(valueList: number[]): void {
    // 初始化的时候，如果valueList为空，可能是因为items还没请求回来
    if (this.items && this.items.length) {
      const newValue = valueList[0];
      if (newValue !== this.value) {
        this.$emit('change', newValue);
        this.isShow = false;
        // @ts-ignore
        event.stopPropagation();
        this.$forceUpdate();
      }
    }
  }
  protected handleSearch(): void {
    const lowerName = this.selectedName.toLowerCase();
    this.dataList = this.recursiveSearch(this.items, lowerName);
  }
  protected recursiveSearch(
    items: TypeComponentTreeSelect.TreeItem[], name: string,
  ): TypeComponentTreeSelect.TreeItem[] {
    const resultList: TypeComponentTreeSelect.TreeItem[] = [];
    for (const item of items) {
      // @ts-ignore
      const catLowerName = item.name.toLowerCase();
      if (item.children && item.children.length) {
        // 有子节点的
        const childrenResult = this.recursiveSearch(item.children, name);
        if (childrenResult && childrenResult.length) {
          // @ts-ignore
          this.openList.push(item.id);
          item.children = childrenResult;
          resultList.push(item);
        } else if (catLowerName.includes(name)) {
          item.children = undefined;
          resultList.push(item);
        }
      } else if (catLowerName.includes(name)) {
        item.children = undefined;
        resultList.push(item);
      }
    }
    return resultList;
  }
  // 递归得查找父级信息
  protected recursiveGetParentCategory(
    items: TypeComponentTreeSelect.TreeItem[], value: number,
  ): string[] | undefined {
    for (const cat of items) {
      if (cat.id === value) {
        this.openList.push(cat.id);
        return [cat.name as string];
      }
      if (cat.children && cat.children.length) {
        const result = this.recursiveGetParentCategory(cat.children, value);
        if (result) {
          this.openList.push(cat.id as number);
          result.unshift(cat.name as string);
          return result;
        }
      }
    }
    return undefined;
  }
  // 获取选中的item的name
  protected getSelectedName(): void {
    const catNameList = this.recursiveGetParentCategory(this.items, this.value);
    if (catNameList && catNameList.length) {
      // this.selectedName = catNameList.join('/');
      this.selectedName = catNameList.pop() as string;
    } else {
      this.selectedName = '';
    }
  }
  protected mounted(): void {
    // 绑定事件
    window.document.addEventListener('click', (e: Event) => {
      this.isShow = false;
    }, false);
    // @ts-ignore
    this.$refs.treeViewRef.addEventListener('click', (e: Event) => {
      this.isShow = true;
      e.stopPropagation();
    }, false);
    this.flushData();
  }
  // 刷新组件数据
  protected flushData(): void {
    this.activeList = this.value ? [this.value] : [];
    this.getSelectedName();
  }
}
</script>
<style scoped lang="scss">
  .tree-select-container {
    position: relative;
  }
  .tree-view, .none-data-text {
    z-index: 1002;
    background: #ffffff;
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    box-shadow: 0 4px 6px 0 rgba(32, 33, 36, 0.28);
  }
</style>