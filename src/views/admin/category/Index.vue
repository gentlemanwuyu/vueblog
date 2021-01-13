<template>
  <div>
    <div class="page-title">分类管理</div>
    <div class="page-actions">
      <v-btn class="float-right" color="primary" @click="handleAdd">
        <v-icon dark left>mdi-plus</v-icon>新增
      </v-btn>
    </div>
    <v-treeview
      open-all
      :items="treeData"
      rounded
      activatable
      color="primary"
      open-on-click
      transition
    >
      <template v-slot:append="{ item }">
        <div>
          <div v-if="item.level < 2" class="action-item" @click.stop="handleAdd(item.id)">
            <v-tooltip bottom class="mr-2">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">mdi-plus</v-icon>
              </template>
              <span>新增子分类</span>
            </v-tooltip>
          </div>
          <div v-else class="action-item"></div>
          <div class="action-item" @click.stop="handleEdit(item)">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" v-on="on" v-bind="attrs">mdi-pencil</v-icon>
              </template>
              <span>编辑</span>
            </v-tooltip>
          </div>
          <div v-if="!item.children || !item.children.length" class="action-item" @click.stop="handleDelete(item.id)">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="red" v-on="on" v-bind="attrs">mdi-delete</v-icon>
              </template>
              <span>删除</span>
            </v-tooltip>
          </div>
          <div v-else class="action-item"></div>
        </div>
      </template>
    </v-treeview>
    <add-edit-category-dialog ref="addEditCategoryDialogRef" @success="handleSuccess"></add-edit-category-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddEditCategoryDialog from './components/AddEditCategoryDialog.vue';

@Component({
  components: {AddEditCategoryDialog},
})
export default class AdminCategory extends Vue {
  protected treeData: TypeCategory.CategoryTreeItem[] = [];
  protected created(): void {
    this.getCategoryTree();
  }
  protected async getCategoryTree(): Promise<void> {
    const { data } = await this.$api.admin.categoryTree<TypeCategory.CategoryTreeItem[]>();
    this.treeData = data;
  }
  protected handleEdit(item: TypeCategory.CategoryTreeItem): void {
    const addEditCategoryDialogRef = this.$refs.addEditCategoryDialogRef as AddEditCategoryDialog;
    addEditCategoryDialogRef.type = 'edit';
    addEditCategoryDialogRef.detail = this.$util.deepCopy(item);
    addEditCategoryDialogRef.visiable = true;
  }
  protected handleDelete(id: number): void {
    this.$confirm({
      onConfirm: async () => {
        await this.$api.admin.deleteCategory({id});
        this.getCategoryTree();
      },
    });
  }
  protected handleAdd(parentId?: number): void {
    const addEditCategoryDialogRef = this.$refs.addEditCategoryDialogRef as AddEditCategoryDialog;
    addEditCategoryDialogRef.type = 'add';
    addEditCategoryDialogRef.parentId = parentId;
    addEditCategoryDialogRef.visiable = true;
  }
  protected handleSuccess(): void {
    this.getCategoryTree();
  }
}
</script>

<style lang="scss" scoped>
  .action-item {
    &+& {
      margin-left: 8px;
    }
    display: inline-block;
    min-width: 24px;
  }
</style>
