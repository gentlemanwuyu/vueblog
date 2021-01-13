<template>
  <add-edit-article type="add" />
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import AddEditArticle from './components/AddEditArticle.vue';

@Component({
  components: {
    AddEditArticle,
  },
})
export default class AdminAddArticle extends Vue {
}

</script>
<style lang='scss' scoped>
</style>
