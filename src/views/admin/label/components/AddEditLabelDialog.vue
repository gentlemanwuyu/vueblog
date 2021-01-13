<template>
  <v-dialog v-model="visiable" persistent max-width="600">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field v-model="formData.name" clearable label="标签名" :counter="255" :rules="rules.name"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary darken-1" text @click="handleSubmit">提交</v-btn>
        <v-btn color="red darken-1" text @click="handleCancel">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class AddEditLabelDialog extends Vue {
  public visiable: boolean = false;
  public type: TypeBase.AddEditType = 'add';
  public detail?: TypeLabel.LabelItem;
  protected title: string = '';
  protected formData: TypeLabel.FormData = {
    id: undefined,
    name: '',
  };
  // 表单校验规则
  protected rules: TypeLabel.ValidateRule = {
    name: [
      (v: string) => !!v || '请输入标签名',
      (v: string) => v && v.length < 255 || '标签名不能超过255个字符',
    ],
  };
  @Watch('type', {immediate: true})
  protected onTypeChange(type: TypeBase.AddEditType): void {
    if ('add' === type) {
      this.title = '新增标签';
    } else if ('edit' === type) {
      this.title = '编辑标签';
    }
  }
  @Watch('visiable')
  protected onVisiableChange(visiable: boolean) {
    if (!visiable) {
      this.initDialog();
    } else if (this.detail) {
      this.formData.id = this.detail.id;
      this.formData.name = this.detail.name;
    }
  }
  protected async handleSubmit(): Promise<void> {
    const formRef = this.$refs.formRef as any;
    if (formRef.validate()) {
      try {
        if ('add' === this.type) {
          await this.$api.admin.addLabel(this.formData);
        } else {
          await this.$api.admin.editLabel(this.formData);
        }
        this.visiable = false;
        this.initDialog();
        this.$emit('success');
      } catch (e) {
        console.log(e);
      }
    }
  }
  protected handleCancel(): void {
    this.visiable = false;
  }
  protected initDialog(): void {
    this.formData = {};
    this.detail = undefined;
    // @ts-ignore
    this.$refs.formRef.reset();
  }
}
</script>

<style lang="scss" scoped>
  
</style>
