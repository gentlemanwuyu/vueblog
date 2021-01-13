<template>
  <div class="empty-content pa-3 text-center">
    <slot>
      暂无内容
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EmptyContent extends Vue {
}
</script>

<style lang="scss" scoped>
  
</style>
