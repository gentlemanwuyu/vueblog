<template>
  <div class="tag-input">
    <div class="tag-input-control">
      <fieldset ref="fieldsetRef">
        <legend :style="`width: ${legendWidth}px;`"><span>&#8203;</span></legend>
      </fieldset>
      <div class="tag-input-input-container">
        <label ref="labelRef" class="tag-input-label">{{label}}</label>
        <div class="tag-input-tags" ref="tagsContainer">
          <v-chip v-for="(item, index) in value" :key="index" close small class="mr-1" @click:close="handleClose(index)">{{item}}</v-chip>
        </div>
        <input
          ref="inputRef"
          v-model="input"
          type="text"
          autocomplete="off"
          class="tag-input-input"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          @keyup.enter="handleInputEnter"
          @keydown.delete="handleDeleteKeydown"
          @input="handleInputChange"
        >
      </div>
    </div>
    <div class="tag-input-detail">
      <span v-if="validationMsg" class="tag-input-detail-msg">{{validationMsg}}</span>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop, Model } from 'vue-property-decorator';
import { InputValidationRules } from 'vuetify';

@Component
export default class TagInput extends Vue {
  @Model('change', {type: Array, default: () => []})
  protected value!: string[];
  @Prop({type: String})
  protected label!: string;
  protected title: string = '';
  @Prop({type: String})
  protected outlined!: boolean;
  @Prop({type: String, default: ''})
  protected placeholder!: string;
  @Prop({type: Array, default: () => []})
  protected rules!: InputValidationRules;
  protected legendWidth: number = 0;
  protected input: string = '';
  // 校验错误信息
  protected validationMsg: string = '';
  // 校验结果
  protected validateResult?: boolean = undefined;
  @Watch('value')
  protected onValueChange(val: string[]): void {
    if (this.validateResult === undefined) {
      if (this.value.length || this.input) {
        this.setLabelStyle('top', 'normal');
        this.setFieldsetStyle('normal', 1);
      } else {
        this.setLabelStyle('inside', 'normal');
        this.setFieldsetStyle('normal', 1);
      }
    } else {
      this.checkTags();
    }
  }
  // 监听enter键
  protected handleInputEnter(e: Event): void {
    // @ts-ignore
    let val  = e.target.value as string;
    val = val.trim();
    if (val) {
      const valueList = this.value;
      valueList.push(val);
      this.$emit('change', valueList);
      this.input = '';
      this.$nextTick(() => {
        this.scrollToRight();
      });
    }
    this.checkTags();
  }
  // 监听delete键
  protected handleDeleteKeydown(e: KeyboardEvent): void {
    if (!this.input.length && this.value.length) {
      const lastItem = this.value.pop() as string;
      this.input = lastItem;
    }
    this.checkTags();
  }
  // 滚动到最右边
  protected scrollToRight(): void {
    const dom = this.$refs.tagsContainer as HTMLElement;
    dom.scrollTo({left: Number(dom.offsetWidth)});
  }
  // 关闭chip
  protected handleClose(index: number): void {
    this.value.splice(index, 1);
    this.$emit('change', this.value);
    this.$nextTick(() => {
      this.checkTags();
    });
  }
  protected handleInputFocus(): void {
    if (this.validateResult === undefined) {
      this.setLabelStyle('top', 'primary');
      this.setFieldsetStyle('primary', 2);
    } else {
      this.checkTags();
    }
  }
  protected handleInputBlur(): void {
    this.checkTags();
  }
  // 设置label样式
  protected setLabelStyle(position: 'top' | 'inside', color: 'normal' | 'primary' | 'red'): void {
    const labelRef = this.$refs.labelRef as HTMLElement;
    const tagsContainerRef = this.$refs.tagsContainer as HTMLElement;
    switch (position) {
      case 'top':
        if ('0px' !== labelRef.style.top) {
          this.legendWidth = labelRef.offsetWidth;
        }
        labelRef.style.top = '0px';
        labelRef.style.left = '0px';
        labelRef.style.fontSize = '8px';
        labelRef.style.transform = 'translateY(-50%)';
        break;
      case 'inside':
        labelRef.style.top = '18px';
        labelRef.style.left = `${tagsContainerRef.offsetWidth + 8}px`;
        labelRef.style.fontSize = '16px';
        labelRef.style.transform = 'none';
        this.legendWidth = 0;
        break;
    }
    switch (color) {
      case 'normal':
        labelRef.style.color = 'rgba(0, 0, 0, 0.6)';
        break;
      case 'primary':
        labelRef.style.color = '#1976d2';
        break;
      case 'red':
        labelRef.style.color = 'red';
        break;
    }
  }
  // 设置fieldset样式
  protected setFieldsetStyle(color: 'normal' | 'primary' | 'red', width: 1 | 2 = 1): void {
    const fieldsetRef = this.$refs.fieldsetRef as HTMLElement;
    switch (color) {
      case 'normal':
        fieldsetRef.style.borderColor = 'inherit';
        break;
      case 'primary':
        fieldsetRef.style.borderColor = '#1976d2';
        break;
      case 'red':
        fieldsetRef.style.borderColor = 'red';
        break;
    }
    fieldsetRef.style.borderWidth = width + 'px';
  }
  protected handleInputChange(e: Event): void {
    this.checkTags();
  }
  // 检查tags以决定样式
  protected checkTags(): void {
    const inputRef = this.$refs.inputRef as HTMLElement;
    this.validateResult = this.validate();
    if (this.validateResult) {
      if (inputRef === document.activeElement) {
        // 通过校验并且是活跃元素
        this.setLabelStyle('top', 'primary');
        this.setFieldsetStyle('primary', 2);
        inputRef.style.caretColor = '#1976d2';
      } else {
        // 通过校验规则但不是活跃元素
        if (this.value.length || this.input) {
          this.setLabelStyle('top', 'normal');
          this.setFieldsetStyle('normal', 1);
        } else {
          this.setLabelStyle('inside', 'normal');
          this.setFieldsetStyle('normal', 1);
        }
        inputRef.style.caretColor = 'inherit';
      }
      this.validationMsg = '';
    } else {
      // 如果没有没有通过校验，判断是否当前活跃的元素
      if (inputRef === document.activeElement) {
        this.setLabelStyle('top', 'red');
        this.setFieldsetStyle('red', 2);
        inputRef.style.caretColor = 'red';
      } else {
        // 没有通过校验规则也不是活跃元素
        if (this.value.length || this.input) {
          this.setLabelStyle('top', 'red');
          this.setFieldsetStyle('red', 1);
        } else {
          this.setLabelStyle('inside', 'red');
          this.setFieldsetStyle('red', 1);
        }
        inputRef.style.caretColor = 'inherit';
      }
    }
  }

  // 校验输入
  protected validate(): boolean {
    for (const rule of this.rules) {
      if (typeof rule === 'function') {
        const result = rule(this.value);
        if (typeof result === 'string' && result) {
          this.validationMsg = result;
          return false;
        }
      }
    }
    return true;
  }
}
</script>
<style scoped lang="scss">
  .tag-input {
    height: 86px;
    &-control {
      padding: 0 12px;
      background: transparent;
      align-items: stretch;
      min-height: 56px;
      cursor: text;
      transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      color: inherit;
      display: flex;
      margin-bottom: 8px;
      position: relative;
      width: 100%;
      & fieldset {
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.38);
        padding-left: 8px;
        border-radius: 4px;
        border-collapse: collapse;
        border-color: currentColor;
        border-style: solid;
        border-width: 1px;
        bottom: 0;
        left: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: -5px;
        transition-duration: 0.3s;
        transition-property: color, border-width;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        & legend {
          text-align: left;
          line-height: 11px;
          padding: 0;
          transition: width 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
          border: 0;
          color: inherit;
          display: table;
          white-space: normal;
          max-width: 100%;
        }
      }
    }
    &-input-container {
      display: flex;
      flex: 1 1 auto;
      position: relative;
      align-items: center;
      width: 100%;
      & label {
        transform-origin: top left;
        color: rgba(0, 0, 0, 0.6);
        height: 20px;
        line-height: 20px;
        top: 18px;
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        pointer-events: none;
        font-size: 16px;
        min-height: 8px;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      }
    }
    &-input {
      flex: 1 1 auto;
      line-height: 20px;
      padding: 8px 0 8px;
      max-width: 100%;
      min-width: 0px;
      width: 100%;
      max-height: 32px;
      color: $fontColor;
      &:focus {
        outline: none;
        outline-color: initial;
        outline-style: none;
        outline-width: initial;
        caret-color: $primary;
      }
    }
    &-detail {
      padding-left: $padding;
      padding-right: $padding;
      margin-bottom: 8px;
      margin-top: -8px;
      &-msg {
        color: red;
        line-height: 12px;
        font-size: 8px;
        word-break: break-word;
        overflow-wrap: break-word;
        word-wrap: break-word;
      }
    }
    &-label {
      position: absolute;
      left: 0px;
      right: auto;
    }
    &-tags {
      display: inline-block;
      margin-right: 8px;
      white-space: nowrap;
      width: auto;
      max-width: 70%;
      overflow-x: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>