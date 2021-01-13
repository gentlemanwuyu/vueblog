<template>
  <add-edit-article type="edit" />
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import AddEditArticle from './components/AddEditArticle.vue';

@Component({
  components: {
    AddEditArticle,
  },
})
export default class AdminEditArticle extends Vue {
}

</script>
<style lang='scss' scoped>
</style>
