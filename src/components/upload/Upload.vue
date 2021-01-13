<template>
  <div @click.stop="handleClick">
    <slot name="default">
      <v-btn color="primary">
        <v-icon dark left>mdi-cloud-upload</v-icon>上传
      </v-btn>
    </slot>
    <input type="file" ref="fileInput" :multiple="isMultiple" :accept="acceptType" @click.stop @change="handleChange">
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class Upload extends Vue {
  // mimeType映射关系
  protected extMimeTypeMapping: {[key: string]: string} = {};
  @Prop({type: Array, default: []})
  protected accept!: string[];
  protected acceptType: string = '*.*';
  @Prop({type: Boolean, default: false})
  protected multiple!: boolean;
  protected isMultiple: boolean = false;
  // 文件大小限制(MB)
  @Prop({type: Number, default: 10})
  protected maxSize!: number;
  @Watch('accept', {immediate: true})
  protected onAcceptChange(accept: string[]): void {
    if (accept && accept.length) {
      accept = accept.map((item: string) => `.${item}`);
      this.acceptType = accept.join(',');
    } else {
      this.acceptType = '*.*';
    }
  }
  @Watch('multiple', {immediate: true})
  protected onMultipleChange(multiple: boolean) {
    this.isMultiple = multiple;
  }
  protected handleClick(e: Event): void {
    // @ts-ignore
    this.$refs.fileInput.click();
  }
  protected async handleChange(e: Event): Promise<void> {
    // @ts-ignore
    if (e.target && e.target.files.length) {
      // @ts-ignore
      const fileList: File[] = e.target.files;
      if (this.validate(fileList)) {
        this.$emit('upload', fileList);
      }
    }
  }
  protected validate(fileList: File[]): boolean {
    let result: boolean = true;
    const extList: string = this.accept.join(', ');
    for (const file of fileList) {
      // 校验文件格式
      if (this.accept && this.accept.length) {
        const ext = this.extMimeTypeMapping[file.type];
        if (!this.accept.includes(ext)) {
          result = false;
          this.$message.error(`文件格式不对，只能上传${extList}格式的文件`);
        }
      }
      // 校验文件大小
      if (this.maxSize && this.maxSize * 1000 * 1000 < file.size) {
        this.$message.error(`文件大小不能超过${this.maxSize}MB`);
        result = false;
      }
    }
    return result;
  }
  protected created(): void {
    this.extMimeTypeMapping = {
      'image/jpeg': 'jpeg',
      'image/png': 'png',
      'image/gif': 'gif',
    };
  }
}
</script>
<style scoped lang="scss">
  input[type=file] {
    display: none;
  }
</style>